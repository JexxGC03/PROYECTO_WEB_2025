"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const cases_controller_1 = require("../controllers/cases.controller");
const r = (0, express_1.Router)();
r.use(auth_1.requireAuth);
r.get("/", cases_controller_1.listCases);
r.post("/", (0, auth_1.requireRole)("ADMIN", "AGENT"), cases_controller_1.createCase);
r.get("/:id", cases_controller_1.getCase);
r.patch("/:id", (0, auth_1.requireRole)("ADMIN", "AGENT"), cases_controller_1.updateCase);
r.delete("/:id", (0, auth_1.requireRole)("ADMIN"), cases_controller_1.deleteCase);
exports.default = r;
//# sourceMappingURL=cases.routes.js.map