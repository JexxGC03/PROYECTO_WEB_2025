import User from "../models/User";

const emailRegex = /\S+@\S+\.\S+/;

export const looksEmail = (value?: string) => !!value && emailRegex.test(value);

export async function resolveClientValue(input?: string) {
  if (!input) return {} as { ref?: string; name?: string; email?: string };
  if (looksEmail(input)) {
    const u = await User.findOne({ email: input });
    if (u) return { ref: u._id };
    return { email: input };
  }
  return { name: input };
}
