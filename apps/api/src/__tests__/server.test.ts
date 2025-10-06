import request from "supertest";
import { describe, it, expect } from "vitest";

import { app } from "../server";

// Type assertion for supertest
const requestApp = request(app);

describe("Server", () => {
  it("should respond to health check", async () => {
    const response = await requestApp.get("/api").expect(200);

    expect(response.body).toBeDefined();
  });

  it("should handle CORS", async () => {
    const response = await requestApp.options("/api").expect(204);

    expect(response.headers["access-control-allow-origin"]).toBeDefined();
  });

  it("should handle JSON parsing", async () => {
    const testData = { test: "data" };

    const response = await requestApp
      .post("/api/test")
      .send(testData)
      .expect(404); // Route doesn't exist, but JSON parsing should work

    expect(response.body).toBeDefined();
  });

  it("should handle malformed JSON", async () => {
    const response = await requestApp
      .post("/api/test")
      .set("Content-Type", "application/json")
      .send("invalid json")
      .expect(400);

    expect(response.body).toBeDefined();
  });

  it("should include security headers", async () => {
    const response = await requestApp.get("/api").expect(200);

    // Check for helmet security headers
    expect(response.headers["x-content-type-options"]).toBe("nosniff");
    expect(response.headers["x-frame-options"]).toBe("SAMEORIGIN");
  });

  it("should handle unknown routes with 404", async () => {
    const response = await requestApp.get("/api/unknown-route").expect(404);

    expect(response.body).toBeDefined();
  });
});
