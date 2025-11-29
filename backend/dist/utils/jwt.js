"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefresh = exports.signRefresh = exports.verifyAccess = exports.signAccess = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ensureSecret = (value, name) => {
    if (!value)
        throw new Error(`${name} is required`);
    return value;
};
const accessSecret = ensureSecret(process.env.JWT_SECRET, "JWT_SECRET");
const refreshSecret = ensureSecret(process.env.REFRESH_SECRET, "REFRESH_SECRET");
const accessOptions = { expiresIn: (process.env.JWT_EXPIRES_IN || "15m") };
const refreshOptions = { expiresIn: (process.env.REFRESH_EXPIRES_IN || "7d") };
const signAccess = (payload) => jsonwebtoken_1.default.sign(payload, accessSecret, accessOptions);
exports.signAccess = signAccess;
const verifyAccess = (token) => jsonwebtoken_1.default.verify(token, accessSecret);
exports.verifyAccess = verifyAccess;
// opcional: refresh
const signRefresh = (payload) => jsonwebtoken_1.default.sign(payload, refreshSecret, refreshOptions);
exports.signRefresh = signRefresh;
const verifyRefresh = (token) => jsonwebtoken_1.default.verify(token, refreshSecret);
exports.verifyRefresh = verifyRefresh;
//# sourceMappingURL=jwt.js.map