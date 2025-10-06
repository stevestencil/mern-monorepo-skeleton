import mongoose from 'mongoose';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { connectDB } from '../../lib/db';

// Import the shared test setup
import '../setup';

describe('connectDB', () => {
  const mockConnect = vi.mocked(mongoose.connect);

  beforeEach(() => {
    vi.clearAllMocks();
    // Reset the connection state
    Object.defineProperty(mongoose.connection, 'readyState', {
      value: 0,
      writable: true,
      configurable: true,
    });
  });

  it('should connect to database when not already connected', async () => {
    Object.defineProperty(mongoose.connection, 'readyState', {
      value: 0,
      writable: true,
    });
    mockConnect.mockResolvedValue(mongoose);

    await connectDB();

    expect(mockConnect).toHaveBeenCalledWith(process.env['MONGODB_URI']);
  });

  it('should not connect when already connected', async () => {
    Object.defineProperty(mongoose.connection, 'readyState', {
      value: 1,
      writable: true,
    });
    mockConnect.mockResolvedValue(mongoose);

    await connectDB();

    expect(mockConnect).not.toHaveBeenCalled();
  });

  it('should handle connection errors', async () => {
    Object.defineProperty(mongoose.connection, 'readyState', {
      value: 0,
      writable: true,
    });
    const connectionError = new Error('Connection failed');
    mockConnect.mockRejectedValue(connectionError);

    await expect(connectDB()).rejects.toThrow('Connection failed');
    expect(mockConnect).toHaveBeenCalledWith(process.env['MONGODB_URI']);
  });
});
