"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const clients_controller_1 = require("../controllers/clients.controller");
const r = (0, express_1.Router)();
r.use(auth_1.requireAuth);
r.use((0, auth_1.requireRole)("ADMIN", "AGENT"));
r.get("/", clients_controller_1.listClients);
r.get("/:id/cases", clients_controller_1.getClientCases);
r.patch("/case/:caseId", clients_controller_1.updateCaseClient);
exports.default = r;
//# sourceMappingURL=clients.routes.js.map