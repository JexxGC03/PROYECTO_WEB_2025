import { Request, Response } from "express";
import { AuthRequest } from "../middlewares/auth";
export declare const listAttachments: (req: Request, res: Response) => Promise<void>;
export declare const addAttachment: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteAttachment: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=attachments.controller.d.ts.map