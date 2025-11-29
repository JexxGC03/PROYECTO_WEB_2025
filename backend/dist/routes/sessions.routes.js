"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const sessions_controller_1 = require("../controllers/sessions.controller");
const r = (0, express_1.Router)();
r.post("/refresh", sessions_controller_1.refreshTokens);
r.use(auth_1.requireAuth);
r.get("/", sessions_controller_1.listSessions);
r.delete("/", sessions_controller_1.revokeAllSessions);
r.delete("/:id", sessions_controller_1.revokeSession);
exports.default = r;
//# sourceMappingURL=sessions.routes.js.map