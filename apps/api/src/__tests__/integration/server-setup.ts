import mongoose from 'mongoose';
import { beforeAll, afterAll, beforeEach } from 'vitest';

import { createServer } from '../../server';

import type { Server } from 'http';
import type { AddressInfo } from 'net';

let server: Server;
let baseUrl: string;

export function getTestServer() {
  return { server, baseUrl };
}

beforeAll(async () => {
  // Connect to the test MongoDB instance
  await mongoose.connect(process.env['MONGODB_URI']!);

  // Start the actual server
  server = await createServer();

  const address = server.address() as AddressInfo;
  baseUrl = `http://localhost:${address.port}`;

  console.log(`Test server running on ${baseUrl}`);
});

afterAll(async () => {
  // Clean up server and database connection
  await new Promise<void>((resolve, reject) => {
    server.close(err => {
      if (err) reject(err);
      else resolve();
    });
  });

  if (
    mongoose.connection.readyState !== mongoose.ConnectionStates.disconnected
  ) {
    await mongoose.connection.close();
  }
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
