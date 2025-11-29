"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.me = exports.login = exports.register = void 0;
const User_1 = __importDefault(require("../models/User"));
const RefreshToken_1 = __importDefault(require("../models/RefreshToken"));
const password_1 = require("../utils/password");
const jwt_1 = require("../utils/jwt");
const duration_1 = require("../utils/duration");
const audit_1 = require("../utils/audit");
const register = async (req, res) => {
    const { fullName, email, password } = req.body;
    const exists = await User_1.default.findOne({ email });
    if (exists)
        return res.status(409).json({ message: "Email already registered" });
    const passwordHash = await (0, password_1.hashPassword)(password);
    const user = await User_1.default.create({ fullName, email, passwordHash });
    await (0, audit_1.recordAudit)({ userId: String(user._id), action: "REGISTER", entity: "User", entityId: String(user._id) });
    return res.status(201).json({ id: user._id, fullName: user.fullName, email: user.email });
};
exports.register = register;
const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User_1.default.findOne({ email });
    if (!user || !user.isActive)
        return res.status(401).json({ message: "Invalid credentials" });
    const ok = await (0, password_1.verifyPassword)(password, user.passwordHash);
    if (!ok)
        return res.status(401).json({ message: "Invalid credentials" });
    const accessToken = (0, jwt_1.signAccess)({ sub: String(user._id), role: user.role });
    const refreshToken = (0, jwt_1.signRefresh)({ sub: String(user._id) });
    const expiresAt = (0, duration_1.computeExpiryDate)(process.env.REFRESH_EXPIRES_IN, 7);
    await RefreshToken_1.default.create({ userId: user._id, token: refreshToken, expiresAt });
    await (0, audit_1.recordAudit)({ userId: String(user._id), action: "LOGIN", entity: "User", entityId: String(user._id) });
    return res.json({ accessToken, refreshToken, user: { id: user._id, fullName: user.fullName, role: user.role } });
};
exports.login = login;
const me = async (req, res) => {
    const user = await User_1.default.findById(req.user.sub).select("_id fullName email role createdAt isActive");
    return res.json(user);
};
exports.me = me;
//# sourceMappingURL=auth.controller.js.map