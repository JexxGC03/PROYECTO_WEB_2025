import { Router } from "express";
import { requireAuth, requireRole } from "../middlewares/auth";
import { createCase, listCases, getCase, updateCase, deleteCase } from "../controllers/cases.controller";

const r = Router();
r.use(requireAuth);

r.get("/", listCases);
r.post("/", requireRole("ADMIN","AGENT"), createCase);
r.get("/:id", getCase);
r.patch("/:id", requireRole("ADMIN","AGENT"), updateCase);
r.delete("/:id", requireRole("ADMIN"), deleteCase);

export default r;
