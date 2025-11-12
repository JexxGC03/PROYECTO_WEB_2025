import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes";
import caseRoutes from "./routes/cases.routes";
import commentRoutes from "./routes/comments.routes";
import { errorHandler } from "./middlewares/error";

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/cases", caseRoutes);
app.use("/api/comments", commentRoutes);

app.use(errorHandler);
export default app;
