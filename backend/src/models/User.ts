import { Schema, model } from "mongoose";
const userSchema = new Schema({
  fullName: { type: String, required: true },
  email:    { type: String, required: true, unique: true, index: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ["ADMIN","AGENT","CLIENT"], default: "CLIENT", index: true },
}, { timestamps: true });

export default model("User", userSchema);