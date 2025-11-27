import { Schema, model, Types } from "mongoose";
const refreshSchema = new Schema({
  userId: { type: Types.ObjectId, ref: "User", index: true },
  token: { type: String, unique: true },
  expiresAt: { type: Date, index: { expires: 0 } } // TTL si quieres purga automática
}, { timestamps: true });
export default model("RefreshToken", refreshSchema);
