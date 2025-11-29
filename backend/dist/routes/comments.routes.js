"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const comments_controller_1 = require("../controllers/comments.controller");
const r = (0, express_1.Router)();
r.use(auth_1.requireAuth);
r.get("/:caseId", comments_controller_1.listComments);
r.post("/", comments_controller_1.addComment);
exports.default = r;
//# sourceMappingURL=comments.routes.js.map