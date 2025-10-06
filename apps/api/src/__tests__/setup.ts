import { vi } from 'vitest';

// Mock environment variables
process.env['NODE_ENV'] = 'test';
process.env['MONGODB_URI'] = 'mongodb://localhost:27017/test';
process.env['PORT'] = '3001';

// Mock mongoose connection
vi.mock('mongoose', () => ({
  default: {
    connect: vi.fn(),
    connection: {
      readyState: 0,
    },
    ConnectionStates: {
      disconnected: 0,
      connected: 1,
      connecting: 2,
      disconnecting: 3,
    },
  },
  connect: vi.fn(),
  connection: {
    readyState: 0,
  },
  ConnectionStates: {
    disconnected: 0,
    connected: 1,
    connecting: 2,
    disconnecting: 3,
  },
}));

// Mock pino logger
vi.mock('pino', () => ({
  __esModule: true,
  default: vi.fn(() => ({
    info: vi.fn(),
    error: vi.fn(),
    debug: vi.fn(),
    warn: vi.fn(),
  })),
}));

// Mock pino-http
vi.mock('pino-http', () => ({
  __esModule: true,
  default: vi.fn(
    () => (_req: unknown, _res: unknown, next: () => void) => next(),
  ),
}));
