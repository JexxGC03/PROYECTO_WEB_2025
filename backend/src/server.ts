import "./loadEnv";          // <-- antes de leer process.env
import app from "./app";
import { connectMongo } from "./db/mongoose";

const port = Number(process.env.PORT || 4000);

connectMongo()
  .then(() => {
    app.listen(port, () => console.log(`API running on :${port}`));
  })
  .catch((err) => {
    console.error("Mongo connection error:", err);
    process.exit(1);
  });