import { Router } from "express";
import { requireAuth, requireRole } from "../middlewares/auth";
import { assignCase, updateCasePriority, updateCaseStatus } from "../controllers/caseOperations.controller";

const r = Router();
r.use(requireAuth);
r.use(requireRole("ADMIN", "AGENT"));

r.post("/:id/assign", assignCase);
r.post("/:id/status", updateCaseStatus);
r.post("/:id/priority", updateCasePriority);

export default r;
