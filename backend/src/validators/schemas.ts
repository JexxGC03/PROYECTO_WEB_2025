import { z } from "zod";

const Priority = z.enum(["LOW","MEDIUM","HIGH","URGENT"]);
const CaseType  = z.enum(["CIVIL","PENAL","LABORAL","FAMILIA","ADMINISTRATIVO","OTRO"]);

export const caseCreateSchema = z.object({
  plaintiffName: z.string().min(1, "Demandante requerido"),
  defendantName: z.string().min(1, "Demandado requerido"),
  client:        z.string().optional(), // nombre o email
  caseType:      CaseType,
  caseNumber:    z.string().min(3).regex(/^PROC-\d{4}-[A-Z0-9-]+$/i, "Formato PROC-YYYY-XXX"),
  priority:      Priority.default("MEDIUM"),
  description:   z.string().optional()
});

export const caseUpdateSchema = caseCreateSchema.partial().extend({
  status: z.enum(["OPEN","IN_PROGRESS","RESOLVED","CLOSED"]).optional()
});

// helper opcional para mapear etiqueta de UI (Baja/Media/Alta/Urgente) -> enum
export const mapUiPriority = (label: string): "LOW"|"MEDIUM"|"HIGH"|"URGENT" => {
  const t = label.toLowerCase();
  if (t.includes("baja")) return "LOW";
  if (t.includes("media")) return "MEDIUM";
  if (t.includes("alta")) return "HIGH";
  if (t.includes("urg")) return "URGENT";
  return "MEDIUM";
};
