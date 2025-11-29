"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.health = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const health = async (_req, res) => {
    const mongoState = mongoose_1.default.connection.readyState === 1 ? "up" : "down";
    res.json({ status: "ok", mongo: mongoState, timestamp: new Date().toISOString() });
};
exports.health = health;
//# sourceMappingURL=health.controller.js.map