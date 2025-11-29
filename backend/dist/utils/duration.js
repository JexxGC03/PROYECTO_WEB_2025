"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.computeExpiryDate = void 0;
const multipliers = { s: 1000, m: 60000, h: 3600000, d: 86400000 };
const computeExpiryDate = (input, defaultDays = 7) => {
    const match = input?.match(/^(\d+)([smhd])$/i);
    if (match) {
        const value = Number(match[1]);
        const unit = match[2].toLowerCase();
        const ms = multipliers[unit] ?? multipliers.d;
        return new Date(Date.now() + value * ms);
    }
    return new Date(Date.now() + defaultDays * multipliers.d);
};
exports.computeExpiryDate = computeExpiryDate;
//# sourceMappingURL=duration.js.map