import path from "path";
import dotenv from "dotenv";

// Carga el .env desde el directorio donde ejecutas `npm run dev`
const envPath = path.resolve(process.cwd(), ".env");
const result = dotenv.config({ path: envPath });
if (result.error) {
  console.warn("⚠️ No se pudo cargar .env en:", envPath);
}
