import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ENV } from "../env";

export interface AuthRequest extends Request {
    userId?: number;
}

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const header = req.headers.authorization;
    if (!header) return res.sendStatus(401);

    const token = header.split(" ")[1];
    if (!token) return res.sendStatus(401);

    try {
        const payload = jwt.verify(token, ENV.JWT_SECRET) as { id: number };
        req.userId = payload.id;
        next();
    } catch {
        res.sendStatus(401);
    }
};
