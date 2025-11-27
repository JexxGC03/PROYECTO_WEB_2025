import jwt from "jsonwebtoken";

const ensureSecret = (value: string | undefined, name: string): jwt.Secret => {
  if (!value) throw new Error(`${name} is required`);
  return value;
};

const accessSecret = ensureSecret(process.env.JWT_SECRET, "JWT_SECRET");
const refreshSecret = ensureSecret(process.env.REFRESH_SECRET, "REFRESH_SECRET");

const accessOptions: jwt.SignOptions = { expiresIn: (process.env.JWT_EXPIRES_IN || "15m") as jwt.SignOptions["expiresIn"] };
const refreshOptions: jwt.SignOptions = { expiresIn: (process.env.REFRESH_EXPIRES_IN || "7d") as jwt.SignOptions["expiresIn"] };

export const signAccess = (payload: object) =>
  jwt.sign(payload, accessSecret, accessOptions);

export const verifyAccess = (token: string) =>
  jwt.verify(token, accessSecret) as any;

// opcional: refresh
export const signRefresh = (payload: object) =>
  jwt.sign(payload, refreshSecret, refreshOptions);

export const verifyRefresh = (token: string) =>
  jwt.verify(token, refreshSecret) as any;
