import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import fs from "fs";

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

// Middlewares
app.use(
  helmet({
    // si ves errores de CSP muy estricta, puedes desactivar CSP:
    // contentSecurityPolicy: false,
  })
);
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Rutas API
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

// Path al build del frontend (funciona en src y en dist)
const frontendPath = path.resolve(__dirname, "..", "..", "frontend", "build");

if (fs.existsSync(frontendPath)) {
  console.log("Serving frontend from:", frontendPath);

  // Archivos estáticos (JS, CSS, imágenes, etc.)
  app.use(express.static(frontendPath));

  // ⬅️ OJO: aquí está el cambio importante
  // Usar RegExp en vez de "*" para el catch-all
  app.get(/.*/, (req, res, next) => {
    if (req.path.startsWith("/api")) {
      return next();
    }

    return res.sendFile(path.join(frontendPath, "index.html"));
  });
} else {
  console.warn(
    "Frontend build directory not found. Skipping static file serving.",
    frontendPath
  );
}

// Manejo de errores
app.use(errorHandler);

export default app;
