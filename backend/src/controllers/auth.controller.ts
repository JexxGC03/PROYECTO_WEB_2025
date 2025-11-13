import User from "../models/User";
import { hashPassword, verifyPassword } from "../utils/password";
import { signAccess, signRefresh } from "../utils/jwt";

export const register = async (req, res) => {
  const { fullName, email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ message: "Email already registered" });
  const passwordHash = await hashPassword(password);
  const user = await User.create({ fullName, email, passwordHash });
  return res.status(201).json({ id: user._id, fullName: user.fullName, email: user.email });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });
  const ok = await verifyPassword(password, user.passwordHash);
  if (!ok) return res.status(401).json({ message: "Invalid credentials" });

  const accessToken = signAccess({ sub: String(user._id), role: user.role });
  // opcional: refresh
  const refreshToken = signRefresh({ sub: String(user._id) });
  return res.json({ accessToken, refreshToken, user: { id: user._id, fullName: user.fullName, role: user.role } });
};

export const me = async (req, res) => {
  const user = await User.findById(req.user!.sub).select("_id fullName email role createdAt");
  return res.json(user);
};
