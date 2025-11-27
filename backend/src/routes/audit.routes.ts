import { Router } from "express";
import { requireAuth, requireRole } from "../middlewares/auth";
import { listAudits } from "../controllers/audit.controller";

const r = Router();
r.use(requireAuth);
r.use(requireRole("ADMIN"));

r.get("/", listAudits);

export default r;
