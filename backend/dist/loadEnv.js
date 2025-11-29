"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
// Carga el .env desde el directorio donde ejecutas `npm run dev`
const envPath = path_1.default.resolve(process.cwd(), ".env");
const result = dotenv_1.default.config({ path: envPath });
if (result.error) {
    console.warn("⚠️ No se pudo cargar .env en:", envPath);
}
//# sourceMappingURL=loadEnv.js.map