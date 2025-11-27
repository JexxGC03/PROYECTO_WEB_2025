import { Request, Response } from "express";
import mongoose from "mongoose";

export const health = async (_req: Request, res: Response) => {
  const mongoState = mongoose.connection.readyState === 1 ? "up" : "down";
  res.json({ status: "ok", mongo: mongoState, timestamp: new Date().toISOString() });
};
