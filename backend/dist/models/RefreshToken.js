"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const refreshSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Types.ObjectId, ref: "User", index: true },
    token: { type: String, unique: true },
    expiresAt: { type: Date, index: { expires: 0 } } // TTL si quieres purga automática
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("RefreshToken", refreshSchema);
//# sourceMappingURL=RefreshToken.js.map