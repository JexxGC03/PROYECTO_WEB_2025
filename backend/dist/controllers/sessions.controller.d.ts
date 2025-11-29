import { Request, Response } from "express";
import { AuthRequest } from "../middlewares/auth";
export declare const listSessions: (req: AuthRequest, res: Response) => Promise<void>;
export declare const revokeSession: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const revokeAllSessions: (req: AuthRequest, res: Response) => Promise<void>;
export declare const refreshTokens: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=sessions.controller.d.ts.map