import mongoose from 'mongoose';

import { env } from '../config/env';

export async function connectDB() {
  if (mongoose.connection.readyState === mongoose.ConnectionStates.connected)
    return;
  await mongoose.connect(env.MONGODB_URI);
}
