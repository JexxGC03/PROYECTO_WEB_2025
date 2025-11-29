"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const caseOperations_controller_1 = require("../controllers/caseOperations.controller");
const r = (0, express_1.Router)();
r.use(auth_1.requireAuth);
r.use((0, auth_1.requireRole)("ADMIN", "AGENT"));
r.post("/:id/assign", caseOperations_controller_1.assignCase);
r.post("/:id/status", caseOperations_controller_1.updateCaseStatus);
r.post("/:id/priority", caseOperations_controller_1.updateCasePriority);
exports.default = r;
//# sourceMappingURL=caseOperations.routes.js.map