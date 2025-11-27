import { Schema, model, Types } from "mongoose";

const attachmentSchema = new Schema({
  caseId: { type: Types.ObjectId, ref: "Case", required: true, index: true },
  uploadedBy: { type: Types.ObjectId, ref: "User", required: true },
  fileName: { type: String, required: true },
  url: { type: String, required: true },
  size: { type: Number },
  mimeType: { type: String }
}, { timestamps: true });

export default model("Attachment", attachmentSchema);
