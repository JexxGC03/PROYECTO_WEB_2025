"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.looksEmail = void 0;
exports.resolveClientValue = resolveClientValue;
const User_1 = __importDefault(require("../models/User"));
const emailRegex = /\S+@\S+\.\S+/;
const looksEmail = (value) => !!value && emailRegex.test(value);
exports.looksEmail = looksEmail;
async function resolveClientValue(input) {
    if (!input)
        return {};
    if ((0, exports.looksEmail)(input)) {
        const u = await User_1.default.findOne({ email: input });
        if (u)
            return { ref: u._id };
        return { email: input };
    }
    return { name: input };
}
//# sourceMappingURL=client.js.map