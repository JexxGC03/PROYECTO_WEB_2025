import { Router } from "express";
import { requireAuth, requireRole } from "../middlewares/auth";
import { getClientCases, listClients, updateCaseClient } from "../controllers/clients.controller";

const r = Router();
r.use(requireAuth);
r.use(requireRole("ADMIN", "AGENT"));

r.get("/", listClients);
r.get("/:id/cases", getClientCases);
r.patch("/case/:caseId", updateCaseClient);

export default r;
