"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const attachments_controller_1 = require("../controllers/attachments.controller");
const r = (0, express_1.Router)();
r.use(auth_1.requireAuth);
r.get("/:caseId", attachments_controller_1.listAttachments);
r.post("/", attachments_controller_1.addAttachment);
r.delete("/:id", attachments_controller_1.deleteAttachment);
exports.default = r;
//# sourceMappingURL=attachments.routes.js.map