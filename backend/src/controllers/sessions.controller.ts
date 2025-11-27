import { Request, Response } from "express";
import RefreshToken from "../models/RefreshToken";
import User from "../models/User";
import { signAccess, signRefresh, verifyRefresh } from "../utils/jwt";
import { computeExpiryDate } from "../utils/duration";
import { AuthRequest } from "../middlewares/auth";
import { recordAudit } from "../utils/audit";

export const listSessions = async (req: AuthRequest, res: Response) => {
  const sessions = await RefreshToken.find({ userId: req.user!.sub })
    .select("token expiresAt createdAt")
    .lean<{ _id: string; expiresAt: Date; createdAt: Date }[]>();
  res.json(sessions.map(s => ({ id: s._id, expiresAt: s.expiresAt, createdAt: s.createdAt })));
};

export const revokeSession = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const removed = await RefreshToken.findOneAndDelete({ _id: id, userId: req.user!.sub });
  if (!removed) return res.status(404).json({ message: "Session not found" });
  await recordAudit({ userId: req.user?.sub, action: "REVOKE_SESSION", entity: "RefreshToken", entityId: id });
  res.status(204).send();
};

export const revokeAllSessions = async (req: AuthRequest, res: Response) => {
  await RefreshToken.deleteMany({ userId: req.user!.sub });
  await recordAudit({ userId: req.user?.sub, action: "REVOKE_ALL_SESSIONS", entity: "RefreshToken" });
  res.status(204).send();
};

export const refreshTokens = async (req: Request, res: Response) => {
  const { refreshToken } = req.body as { refreshToken?: string };
  if (!refreshToken) return res.status(400).json({ message: "refreshToken required" });

  try {
    const payload = verifyRefresh(refreshToken);
    const saved = await RefreshToken.findOne({ token: refreshToken, userId: payload.sub });
    if (!saved) return res.status(401).json({ message: "Invalid session" });
    if (saved.expiresAt && saved.expiresAt.getTime() < Date.now()) {
      await RefreshToken.deleteOne({ _id: saved._id });
      return res.status(401).json({ message: "Session expired" });
    }

    const user = await User.findById(payload.sub);
    if (!user || !user.isActive) return res.status(401).json({ message: "User disabled" });

    const accessToken = signAccess({ sub: String(user._id), role: user.role });
    const newRefresh = signRefresh({ sub: String(user._id) });
    const expiresAt = computeExpiryDate(process.env.REFRESH_EXPIRES_IN, 7);

    saved.token = newRefresh;
    saved.expiresAt = expiresAt;
    await saved.save();

    await recordAudit({ userId: String(user._id), action: "REFRESH", entity: "RefreshToken", entityId: String(saved._id) });

    res.json({ accessToken, refreshToken: newRefresh });
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Invalid refresh token" });
  }
};
