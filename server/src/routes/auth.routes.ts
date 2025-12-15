import { Router } from "express";
import jwt from "jsonwebtoken";
import { db } from "../db";
import { ENV } from "../env";
import type { UserRow } from "../types/User.ts";
import type {
    YandexToken,
    GoogleToken,
    GitHubToken,
} from "../types/TokenResponses.ts";
import {
    GitHubProfile,
    GoogleProfile,
    YandexProfile,
} from "../types/ProfileResponses";

const router = Router();

function issueJWT(res: any, userId: number) {
    const token = jwt.sign({ id: userId }, ENV.JWT_SECRET, {
        expiresIn: "7d",
    });

    res.redirect(`${ENV.FRONTEND_URL}/oauth-success?token=${token}`);
}

function findOrCreateUser(
    provider: string,
    providerId: string,
    nickname: string,
    avatar: string | null,
): { id: number } {
    const user = db
        .prepare("SELECT id FROM users WHERE provider = ? AND provider_id = ?")
        .get(provider, providerId) as UserRow | undefined;

    if (!user) {
        const r = db
            .prepare(
                "INSERT INTO users (provider, provider_id, nickname, avatar) VALUES (?, ?, ?, ?)",
            )
            .run(provider, providerId, nickname, avatar);

        return { id: r.lastInsertRowid as number };
    }

    return { id: user.id };
}

router.get("/yandex", (_, res) => {
    res.redirect(
        "https://oauth.yandex.ru/authorize?" +
            new URLSearchParams({
                response_type: "code",
                client_id: ENV.YANDEX.ID,
                redirect_uri: ENV.YANDEX.REDIRECT,
            }),
    );
});

router.get("/yandex/callback", async (req, res) => {
    const code = req.query.code as string;
    if (!code) return res.sendStatus(400);

    const tokenRes = await fetch("https://oauth.yandex.ru/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            grant_type: "authorization_code",
            code,
            client_id: ENV.YANDEX.ID,
            client_secret: ENV.YANDEX.SECRET,
            redirect_uri: ENV.YANDEX.REDIRECT,
        }),
    });

    const token = (await tokenRes.json()) as YandexToken;

    if (!tokenRes.ok) {
        throw new Error("Yandex token request failed");
    }

    const profileRes = await fetch("https://login.yandex.ru/info?format=json", {
        headers: { Authorization: `OAuth ${token.access_token}` },
    });

    const p = (await profileRes.json()) as YandexProfile;

    const user = findOrCreateUser(
        "yandex",
        p.id,
        p.real_name || p.login,
        p.default_avatar_id ? `${p.default_avatar_id}.png` : null,
    );

    issueJWT(res, user.id);
});

router.get("/google", (_, res) => {
    res.redirect(
        "https://accounts.google.com/o/oauth2/v2/auth?" +
            new URLSearchParams({
                response_type: "code",
                client_id: ENV.GOOGLE.ID,
                redirect_uri: ENV.GOOGLE.REDIRECT,
                scope: "openid profile email",
            }),
    );
});

router.get("/google/callback", async (req, res) => {
    const code = req.query.code as string;

    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            code,
            client_id: ENV.GOOGLE.ID,
            client_secret: ENV.GOOGLE.SECRET,
            redirect_uri: ENV.GOOGLE.REDIRECT,
            grant_type: "authorization_code",
        }),
    });

    const token = (await tokenRes.json()) as GoogleToken;

    if (!tokenRes.ok) {
        throw new Error("Yandex token request failed");
    }

    const profileRes = await fetch(
        "https://www.googleapis.com/oauth2/v2/userinfo",
        {
            headers: {
                Authorization: `Bearer ${token.access_token}`,
            },
        },
    );

    const p = (await profileRes.json()) as GoogleProfile;

    const user = findOrCreateUser("google", p.id, p.name, p.picture || null);

    issueJWT(res, user.id);
});

router.get("/github", (_, res) => {
    res.redirect(
        "https://github.com/login/oauth/authorize?" +
            new URLSearchParams({
                client_id: ENV.GITHUB.ID,
                redirect_uri: ENV.GITHUB.REDIRECT,
                scope: "read:user",
            }),
    );
});

router.get("/github/callback", async (req, res) => {
    const code = req.query.code as string;

    const tokenRes = await fetch(
        "https://github.com/login/oauth/access_token",
        {
            method: "POST",
            headers: { Accept: "application/json" },
            body: new URLSearchParams({
                client_id: ENV.GITHUB.ID,
                client_secret: ENV.GITHUB.SECRET,
                code,
                redirect_uri: ENV.GITHUB.REDIRECT,
            }),
        },
    );

    const token = (await tokenRes.json()) as GitHubToken;

    if (!tokenRes.ok) {
        throw new Error("Yandex token request failed");
    }

    const profileRes = await fetch("https://api.github.com/user", {
        headers: {
            Authorization: `Bearer ${token.access_token}`,
        },
    });

    const p = (await profileRes.json()) as GitHubProfile;

    const user = findOrCreateUser(
        "github",
        String(p.id),
        p.login,
        p.avatar_url || null,
    );

    issueJWT(res, user.id);
});

export default router;
