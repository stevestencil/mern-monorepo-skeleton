import request from "supertest";

import { app } from "../../server";

import type { Express } from "express";

export const getTestApp = (): Express => {
  return app;
};

export const makeRequest = () => {
  return request(app);
};

export const waitForDatabase = async (maxAttempts = 10): Promise<void> => {
  const mongoose = await import("mongoose");

  for (let i = 0; i < maxAttempts; i++) {
    if (
      mongoose.default.connection.readyState ===
      mongoose.ConnectionStates.connected
    ) {
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  throw new Error("Database connection timeout");
};
