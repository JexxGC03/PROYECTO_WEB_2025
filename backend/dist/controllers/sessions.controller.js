"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokens = exports.revokeAllSessions = exports.revokeSession = exports.listSessions = void 0;
const RefreshToken_1 = __importDefault(require("../models/RefreshToken"));
const User_1 = __importDefault(require("../models/User"));
const jwt_1 = require("../utils/jwt");
const duration_1 = require("../utils/duration");
const audit_1 = require("../utils/audit");
const listSessions = async (req, res) => {
    const sessions = await RefreshToken_1.default.find({ userId: req.user.sub })
        .select("token expiresAt createdAt")
        .lean();
    res.json(sessions.map(s => ({ id: s._id, expiresAt: s.expiresAt, createdAt: s.createdAt })));
};
exports.listSessions = listSessions;
const revokeSession = async (req, res) => {
    const { id } = req.params;
    const removed = await RefreshToken_1.default.findOneAndDelete({ _id: id, userId: req.user.sub });
    if (!removed)
        return res.status(404).json({ message: "Session not found" });
    await (0, audit_1.recordAudit)({ userId: req.user?.sub, action: "REVOKE_SESSION", entity: "RefreshToken", entityId: id });
    res.status(204).send();
};
exports.revokeSession = revokeSession;
const revokeAllSessions = async (req, res) => {
    await RefreshToken_1.default.deleteMany({ userId: req.user.sub });
    await (0, audit_1.recordAudit)({ userId: req.user?.sub, action: "REVOKE_ALL_SESSIONS", entity: "RefreshToken" });
    res.status(204).send();
};
exports.revokeAllSessions = revokeAllSessions;
const refreshTokens = async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken)
        return res.status(400).json({ message: "refreshToken required" });
    try {
        const payload = (0, jwt_1.verifyRefresh)(refreshToken);
        const saved = await RefreshToken_1.default.findOne({ token: refreshToken, userId: payload.sub });
        if (!saved)
            return res.status(401).json({ message: "Invalid session" });
        if (saved.expiresAt && saved.expiresAt.getTime() < Date.now()) {
            await RefreshToken_1.default.deleteOne({ _id: saved._id });
            return res.status(401).json({ message: "Session expired" });
        }
        const user = await User_1.default.findById(payload.sub);
        if (!user || !user.isActive)
            return res.status(401).json({ message: "User disabled" });
        const accessToken = (0, jwt_1.signAccess)({ sub: String(user._id), role: user.role });
        const newRefresh = (0, jwt_1.signRefresh)({ sub: String(user._id) });
        const expiresAt = (0, duration_1.computeExpiryDate)(process.env.REFRESH_EXPIRES_IN, 7);
        saved.token = newRefresh;
        saved.expiresAt = expiresAt;
        await saved.save();
        await (0, audit_1.recordAudit)({ userId: String(user._id), action: "REFRESH", entity: "RefreshToken", entityId: String(saved._id) });
        res.json({ accessToken, refreshToken: newRefresh });
    }
    catch (err) {
        console.error(err);
        res.status(401).json({ message: "Invalid refresh token" });
    }
};
exports.refreshTokens = refreshTokens;
//# sourceMappingURL=sessions.controller.js.map