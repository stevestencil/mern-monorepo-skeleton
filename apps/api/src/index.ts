import { env } from "./config/env";
import { connectDB } from "./lib/db";
import { app } from "./server";

void connectDB().then(() => {
  app.listen(env.PORT, () =>
    console.log(`API on http://localhost:${env.PORT}`),
  );
});
