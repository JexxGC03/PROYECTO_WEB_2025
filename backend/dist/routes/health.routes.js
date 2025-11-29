"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const health_controller_1 = require("../controllers/health.controller");
const r = (0, express_1.Router)();
r.get("/", health_controller_1.health);
exports.default = r;
//# sourceMappingURL=health.routes.js.map