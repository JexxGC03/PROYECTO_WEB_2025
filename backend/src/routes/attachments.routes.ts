import { Router } from "express";
import { requireAuth } from "../middlewares/auth";
import { addAttachment, deleteAttachment, listAttachments } from "../controllers/attachments.controller";

const r = Router();
r.use(requireAuth);

r.get("/:caseId", listAttachments);
r.post("/", addAttachment);
r.delete("/:id", deleteAttachment);

export default r;
