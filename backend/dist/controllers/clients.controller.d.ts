import { Request, Response } from "express";
import { AuthRequest } from "../middlewares/auth";
export declare const listClients: (_req: Request, res: Response) => Promise<void>;
export declare const updateCaseClient: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getClientCases: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=clients.controller.d.ts.map