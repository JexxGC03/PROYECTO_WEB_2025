"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const zod_1 = require("zod");
const Env = zod_1.z.object({
    MONGODB_URI: zod_1.z.string().min(1, "Falta MONGODB_URI en .env"),
    PORT: zod_1.z.string().optional()
});
exports.env = Env.parse(process.env);
//# sourceMappingURL=env.js.map