import request from 'supertest';

import { getTestServer } from './server-setup';

export const getTestApp = () => {
  const { server } = getTestServer();
  return server;
};

export const makeRequest = () => {
  const { baseUrl } = getTestServer();
  return request(baseUrl);
};

export const waitForDatabase = async (maxAttempts = 10): Promise<void> => {
  const mongoose = await import('mongoose');

  for (let i = 0; i < maxAttempts; i++) {
    if (
      mongoose.default.connection.readyState ===
      mongoose.ConnectionStates.connected
    ) {
      return;
    }
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  throw new Error('Database connection timeout');
};
