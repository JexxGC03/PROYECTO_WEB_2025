"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_1 = require("../middlewares/auth");
const r = (0, express_1.Router)();
r.post("/register", auth_controller_1.register);
r.post("/login", auth_controller_1.login);
r.get("/me", auth_1.requireAuth, auth_controller_1.me);
exports.default = r;
//# sourceMappingURL=auth.routes.js.map