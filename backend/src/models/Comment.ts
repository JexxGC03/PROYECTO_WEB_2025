import { Schema, model, Types } from "mongoose";
const commentSchema = new Schema({
  caseId:  { type: Types.ObjectId, ref: "Case", required: true, index: true },
  authorId:{ type: Types.ObjectId, ref: "User", required: true },
  body:    { type: String, required: true },
}, { timestamps: true });

export default model("Comment", commentSchema);
