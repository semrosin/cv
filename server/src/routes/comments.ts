import { Router } from "express";
import { db } from "../db";
import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import { authMiddleware } from "../middleware/auth.middleware";

function normalizeAvatarUrl(avatar: string): string {
    if (!avatar) {
        throw new Error("Avatar is empty");
    }

    if (avatar.startsWith("http://") || avatar.startsWith("https://")) {
        return avatar;
    }

    return `https://avatars.yandex.net/get-yapic/${avatar}/islands-200`;
}

export async function downloadAvatar(url: string, userId: number) {
    const res = await fetch(url, {
        redirect: "follow",
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch avatar: ${res.status}`);
    }

    const contentType = res.headers.get("content-type");

    if (!contentType || !contentType.startsWith("image/")) {
        throw new Error(`Not an image, content-type: ${contentType}`);
    }

    let ext = "jpg";

    if (contentType.includes("png")) ext = "png";
    else if (contentType.includes("jpeg")) ext = "jpg";
    else if (contentType.includes("webp")) ext = "webp";
    else if (contentType.includes("svg")) ext = "svg";

    const buffer = Buffer.from(await res.arrayBuffer());

    const fileName = `user_${userId}.${ext}`;
    const filePath = path.resolve("public/avatars", fileName);

    fs.writeFileSync(filePath, buffer);

    return `/avatars/${fileName}`;
}

const router = Router();

router.get("/", (req, res) => {
    const comments = db
        .prepare("SELECT * FROM comments ORDER BY id DESC")
        .all();

    res.json(comments);
});

router.post("/", authMiddleware, async (req, res) => {
    const { text } = req.body;

    if (!req.userId) {
        return res.sendStatus(401);
    }

    if (!text || typeof text !== "string") {
        return res.status(400).json({ message: "Text required" });
    }

    const user = db
        .prepare("SELECT id, nickname, avatar FROM users WHERE id = ?")
        .get(req.userId) as
        | {
              id: number;
              nickname: string;
              avatar: string | null;
          }
        | undefined;

    if (!user) {
        return res.sendStatus(401);
    }

    let avatarPath: string;

    if (user.avatar && typeof user.avatar === "string") {
        const avatarUrl = normalizeAvatarUrl(user.avatar);
        try {
            const avatarUrl = normalizeAvatarUrl(user.avatar);
            avatarPath = await downloadAvatar(avatarUrl, user.id);
        } catch (e) {
            console.warn("Avatar download failed:", e);
            avatarPath = "/public/avatars/default.png";
        }
    } else {
        avatarPath = "/public/avatars/default.png";
    }

    const createdAt = new Date().toISOString();

    const result = db
        .prepare(
            `
        INSERT INTO comments (author, avatar, text, createdAt)
        VALUES (?, ?, ?, ?)
    `,
        )
        .run(user.nickname, avatarPath, text, createdAt);

    res.json({
        id: result.lastInsertRowid,
        author: user.nickname,
        avatar: avatarPath,
        text,
        createdAt,
    });
});

export default router;
