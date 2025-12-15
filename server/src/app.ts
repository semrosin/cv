import express from "express";
import cors from "cors";
import path from "path";
import authRoutes from "./routes/auth.routes";
import commentsRoutes from "./routes/comments";

export const app = express();

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization"],
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    }),
);
app.options("*", cors());
app.use(express.json());

app.use("/public", express.static(path.resolve("public")));

app.use("/avatars", express.static(path.resolve("public/avatars")));

app.use("/auth", authRoutes);
app.use("/comments", commentsRoutes);
