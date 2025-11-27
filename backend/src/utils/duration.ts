const multipliers: Record<string, number> = { s: 1000, m: 60_000, h: 3_600_000, d: 86_400_000 };

export const computeExpiryDate = (input?: string, defaultDays = 7) => {
  const match = input?.match(/^(\d+)([smhd])$/i);
  if (match) {
    const value = Number(match[1]);
    const unit = match[2].toLowerCase();
    const ms = multipliers[unit] ?? multipliers.d;
    return new Date(Date.now() + value * ms);
  }
  return new Date(Date.now() + defaultDays * multipliers.d);
};
