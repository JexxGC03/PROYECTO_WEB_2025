"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClientCases = exports.updateCaseClient = exports.listClients = void 0;
const Case_1 = __importDefault(require("../models/Case"));
const User_1 = __importDefault(require("../models/User"));
const client_1 = require("../utils/client");
const audit_1 = require("../utils/audit");
const listClients = async (_req, res) => {
    const raw = await Case_1.default.aggregate([
        { $match: { $or: [{ "client.ref": { $exists: true } }, { "client.name": { $exists: true } }, { "client.email": { $exists: true } }] } },
        { $group: {
                _id: { ref: "$client.ref", name: "$client.name", email: "$client.email" },
                caseCount: { $sum: 1 },
                caseIds: { $push: "$_id" }
            } },
        { $project: {
                ref: "$_id.ref",
                name: "$_id.name",
                email: "$_id.email",
                caseCount: 1,
                caseIds: 1,
                _id: 0
            } }
    ]);
    const refs = raw.filter(r => r.ref).map(r => r.ref);
    const users = await User_1.default.find({ _id: { $in: refs } }).select("fullName email");
    const usersMap = new Map(users.map(u => [String(u._id), u]));
    const data = raw.map(r => ({
        ref: r.ref,
        name: r.name ?? usersMap.get(String(r.ref))?.fullName,
        email: r.email ?? usersMap.get(String(r.ref))?.email,
        caseCount: r.caseCount,
        caseIds: r.caseIds
    }));
    res.json(data);
};
exports.listClients = listClients;
const updateCaseClient = async (req, res) => {
    const { caseId } = req.params;
    const { client } = req.body;
    const clientObj = await (0, client_1.resolveClientValue)(client);
    const doc = await Case_1.default.findByIdAndUpdate(caseId, { client: clientObj }, { new: true });
    if (!doc)
        return res.status(404).json({ message: "Case not found" });
    await (0, audit_1.recordAudit)({ userId: req.user?.sub, action: "UPDATE", entity: "CaseClient", entityId: caseId, metadata: clientObj });
    res.json(doc);
};
exports.updateCaseClient = updateCaseClient;
const getClientCases = async (req, res) => {
    const { id } = req.params;
    const { email } = req.query;
    const filter = {};
    if (id && id !== "undefined")
        filter["client.ref"] = id;
    if (email)
        filter["client.email"] = email;
    const cases = await Case_1.default.find(filter).select("caseNumber caseType status priority client createdAt");
    res.json(cases);
};
exports.getClientCases = getClientCases;
//# sourceMappingURL=clients.controller.js.map