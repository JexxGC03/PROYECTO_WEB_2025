import { z } from "zod";
const Env = z.object({
  MONGODB_URI: z.string().min(1, "Falta MONGODB_URI en .env"),
  PORT: z.string().optional()
});
export const env = Env.parse(process.env);
