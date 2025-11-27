import { Router } from "express";
import { requireAuth, requireRole } from "../middlewares/auth";
import { createUser, deactivateUser, getUser, listUsers, updateUser } from "../controllers/users.controller";

const r = Router();
r.use(requireAuth);

r.get("/", requireRole("ADMIN"), listUsers);
r.post("/", requireRole("ADMIN"), createUser);
r.get("/:id", getUser);
r.patch("/:id", updateUser);
r.delete("/:id", requireRole("ADMIN"), deactivateUser);

export default r;
