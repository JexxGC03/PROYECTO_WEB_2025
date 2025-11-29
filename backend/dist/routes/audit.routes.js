"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const audit_controller_1 = require("../controllers/audit.controller");
const r = (0, express_1.Router)();
r.use(auth_1.requireAuth);
r.use((0, auth_1.requireRole)("ADMIN"));
r.get("/", audit_controller_1.listAudits);
exports.default = r;
//# sourceMappingURL=audit.routes.js.map