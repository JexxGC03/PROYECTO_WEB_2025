"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./loadEnv"); // <-- antes de leer process.env
const app_1 = __importDefault(require("./app"));
const mongoose_1 = require("./db/mongoose");
const port = Number(process.env.PORT || 4000);
(0, mongoose_1.connectMongo)()
    .then(() => {
    app_1.default.listen(port, () => console.log(`API running on :${port}`));
})
    .catch((err) => {
    console.error("Mongo connection error:", err);
    process.exit(1);
});
//# sourceMappingURL=server.js.map