"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const attachmentSchema = new mongoose_1.Schema({
    caseId: { type: mongoose_1.Types.ObjectId, ref: "Case", required: true, index: true },
    uploadedBy: { type: mongoose_1.Types.ObjectId, ref: "User", required: true },
    fileName: { type: String, required: true },
    url: { type: String, required: true },
    size: { type: Number },
    mimeType: { type: String }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Attachment", attachmentSchema);
//# sourceMappingURL=Attachment.js.map