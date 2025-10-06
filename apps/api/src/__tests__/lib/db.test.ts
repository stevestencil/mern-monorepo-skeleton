import mongoose from "mongoose";
import { describe, it, expect, beforeEach, vi } from "vitest";

import { connectDB } from "../../lib/db";

// Mock mongoose
vi.mock("mongoose");

describe("connectDB", () => {
  const mockConnect = vi.mocked(mongoose.connect);
  const mockConnection = {
    readyState: 0,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    Object.assign(mongoose.connection, mockConnection);
  });

  it("should connect to database when not already connected", async () => {
    mockConnection.readyState = 0;
    mockConnect.mockResolvedValue(mongoose);

    await connectDB();

    expect(mockConnect).toHaveBeenCalledWith(process.env["MONGODB_URI"]);
  });

  it("should not connect when already connected", async () => {
    mockConnection.readyState = 1;
    mockConnect.mockResolvedValue(mongoose);

    await connectDB();

    expect(mockConnect).not.toHaveBeenCalled();
  });

  it("should handle connection errors", async () => {
    mockConnection.readyState = 0;
    const connectionError = new Error("Connection failed");
    mockConnect.mockRejectedValue(connectionError);

    await expect(connectDB()).rejects.toThrow("Connection failed");
    expect(mockConnect).toHaveBeenCalledWith(process.env["MONGODB_URI"]);
  });
});
