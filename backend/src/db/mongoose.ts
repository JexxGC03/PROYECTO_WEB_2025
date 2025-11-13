import mongoose from "mongoose";
export const connectMongo = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI no está definida");
  await mongoose.connect(uri);
  console.log("MongoDB connected");
};