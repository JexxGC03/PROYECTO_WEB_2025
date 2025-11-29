"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectMongo = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectMongo = async () => {
    const uri = process.env.MONGODB_URI;
    if (!uri)
        throw new Error("MONGODB_URI no está definida");
    await mongoose_1.default.connect(uri);
    console.log("MongoDB connected");
};
exports.connectMongo = connectMongo;
//# sourceMappingURL=mongoose.js.map