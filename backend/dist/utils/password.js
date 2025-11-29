"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPassword = exports.hashPassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const hashPassword = (p) => bcryptjs_1.default.hash(p, 12);
exports.hashPassword = hashPassword;
const verifyPassword = (p, h) => bcryptjs_1.default.compare(p, h);
exports.verifyPassword = verifyPassword;
//# sourceMappingURL=password.js.map