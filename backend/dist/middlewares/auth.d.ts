import { Request, Response, NextFunction } from "express";
export interface AuthRequest extends Request {
    user?: {
        sub: string;
        role: "ADMIN" | "AGENT" | "CLIENT";
    };
}
export declare const requireAuth: (req: AuthRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export declare const requireRole: (...roles: Array<"ADMIN" | "AGENT" | "CLIENT">) => (req: AuthRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=auth.d.ts.map