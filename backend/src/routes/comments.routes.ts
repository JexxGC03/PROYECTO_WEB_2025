import { Router } from "express";
import { requireAuth } from "../middlewares/auth";
import { addComment, listComments } from "../controllers/comments.controller";
const r = Router();
r.use(requireAuth);
r.get("/:caseId", listComments);
r.post("/", addComment);
export default r;
