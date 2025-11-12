import app from "./app";
import { connectMongo } from "./db/mongoose.ts";
const port = process.env.PORT || 4000;

connectMongo().then(() => {
  app.listen(port, () => console.log(`API running on :${port}`));
});
