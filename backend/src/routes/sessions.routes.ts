import { Router } from "express";
import { requireAuth } from "../middlewares/auth";
import { listSessions, refreshTokens, revokeAllSessions, revokeSession } from "../controllers/sessions.controller";

const r = Router();

r.post("/refresh", refreshTokens);
r.use(requireAuth);
r.get("/", listSessions);
r.delete("/", revokeAllSessions);
r.delete("/:id", revokeSession);

export default r;
