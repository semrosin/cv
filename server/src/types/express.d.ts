import { UserRow } from "./User";
import { CommentRow } from "./Comment";

declare global {
    namespace Express {
        interface Request {
            userId?: number;
            comment: CommentRow;
        }
    }
}

export {};
