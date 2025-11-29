"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const users_controller_1 = require("../controllers/users.controller");
const r = (0, express_1.Router)();
r.use(auth_1.requireAuth);
r.get("/", (0, auth_1.requireRole)("ADMIN"), users_controller_1.listUsers);
r.post("/", (0, auth_1.requireRole)("ADMIN"), users_controller_1.createUser);
r.get("/:id", users_controller_1.getUser);
r.patch("/:id", users_controller_1.updateUser);
r.delete("/:id", (0, auth_1.requireRole)("ADMIN"), users_controller_1.deactivateUser);
exports.default = r;
//# sourceMappingURL=users.routes.js.map