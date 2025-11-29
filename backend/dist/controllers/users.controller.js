"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivateUser = exports.updateUser = exports.getUser = exports.createUser = exports.listUsers = void 0;
const User_1 = __importDefault(require("../models/User"));
const password_1 = require("../utils/password");
const audit_1 = require("../utils/audit");
const listUsers = async (_req, res) => {
    const users = await User_1.default.find().select("fullName email role isActive createdAt");
    res.json(users);
};
exports.listUsers = listUsers;
const createUser = async (req, res) => {
    const { fullName, email, password, role } = req.body;
    const exists = await User_1.default.findOne({ email });
    if (exists)
        return res.status(409).json({ message: "Email already registered" });
    const passwordHash = await (0, password_1.hashPassword)(password);
    const user = await User_1.default.create({ fullName, email, passwordHash, role });
    await (0, audit_1.recordAudit)({ userId: req.user?.sub, action: "CREATE", entity: "User", entityId: String(user._id) });
    res.status(201).json({ id: user._id, fullName: user.fullName, email: user.email, role: user.role });
};
exports.createUser = createUser;
const getUser = async (req, res) => {
    const { id } = req.params;
    if (req.user?.role !== "ADMIN" && req.user?.sub !== id)
        return res.status(403).json({ message: "Forbidden" });
    const user = await User_1.default.findById(id).select("fullName email role isActive createdAt updatedAt");
    if (!user)
        return res.status(404).json({ message: "User not found" });
    res.json(user);
};
exports.getUser = getUser;
const updateUser = async (req, res) => {
    const { id } = req.params;
    if (req.user?.role !== "ADMIN" && req.user?.sub !== id)
        return res.status(403).json({ message: "Forbidden" });
    const body = req.body;
    const patch = {};
    if (body.fullName)
        patch.fullName = body.fullName;
    if (body.password)
        patch.passwordHash = await (0, password_1.hashPassword)(body.password);
    if (body.role && req.user?.role === "ADMIN")
        patch.role = body.role;
    if (typeof body.isActive === "boolean" && req.user?.role === "ADMIN")
        patch.isActive = body.isActive;
    const updated = await User_1.default.findByIdAndUpdate(id, patch, { new: true }).select("fullName email role isActive");
    if (!updated)
        return res.status(404).json({ message: "User not found" });
    await (0, audit_1.recordAudit)({ userId: req.user?.sub, action: "UPDATE", entity: "User", entityId: id, metadata: patch });
    res.json(updated);
};
exports.updateUser = updateUser;
const deactivateUser = async (req, res) => {
    const { id } = req.params;
    const updated = await User_1.default.findByIdAndUpdate(id, { isActive: false }, { new: true }).select("fullName email role isActive");
    if (!updated)
        return res.status(404).json({ message: "User not found" });
    await (0, audit_1.recordAudit)({ userId: req.user?.sub, action: "DEACTIVATE", entity: "User", entityId: id });
    res.json(updated);
};
exports.deactivateUser = deactivateUser;
//# sourceMappingURL=users.controller.js.map