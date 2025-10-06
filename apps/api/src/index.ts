import { app } from './server';
import { env } from './config/env';
import { connectDB } from './lib/db';

connectDB().then(() => {
  app.listen(env.PORT, () => console.log(`API on http://localhost:${env.PORT}`));
});