"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const commentSchema = new mongoose_1.Schema({
    caseId: { type: mongoose_1.Types.ObjectId, ref: "Case", required: true, index: true },
    authorId: { type: mongoose_1.Types.ObjectId, ref: "User", required: true },
    body: { type: String, required: true },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Comment", commentSchema);
//# sourceMappingURL=Comment.js.map