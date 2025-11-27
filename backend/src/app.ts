import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes";
import caseRoutes from "./routes/cases.routes";
import commentRoutes from "./routes/comments.routes";
import userRoutes from "./routes/users.routes";
import clientRoutes from "./routes/clients.routes";
import caseOpsRoutes from "./routes/caseOperations.routes";
import attachmentRoutes from "./routes/attachments.routes";
import sessionRoutes from "./routes/sessions.routes";
import auditRoutes from "./routes/audit.routes";
import healthRoutes from "./routes/health.routes";
import { errorHandler } from "./middlewares/error";

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/cases", caseRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/users", userRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/case-ops", caseOpsRoutes);
app.use("/api/attachments", attachmentRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/audit", auditRoutes);
app.use("/api/health", healthRoutes);

app.use(errorHandler);
export default app;
