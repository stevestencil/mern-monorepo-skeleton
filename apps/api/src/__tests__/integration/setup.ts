import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { beforeAll, afterAll, beforeEach, afterEach } from 'vitest';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  // Start in-memory MongoDB instance
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  // Set environment variable for the app
  process.env['MONGODB_URI'] = mongoUri;
  process.env['NODE_ENV'] = 'test';
  process.env['PORT'] = '0'; // Use random port for tests
});

afterAll(async () => {
  // Clean up
  if (
    mongoose.connection.readyState !== mongoose.ConnectionStates.disconnected
  ) {
    await mongoose.connection.close();
  }
  await mongoServer.stop();
});

beforeEach(async () => {
  // Clear all collections before each test
  if (
    mongoose.connection.readyState === mongoose.ConnectionStates.connected &&
    mongoose.connection.db
  ) {
    const collections = await mongoose.connection.db.collections();
    for (const collection of collections) {
      await collection.deleteMany({});
    }
  }
});

afterEach(async () => {
  // Additional cleanup if needed
});
