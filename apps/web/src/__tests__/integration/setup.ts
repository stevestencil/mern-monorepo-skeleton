import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock environment variables
process.env['NODE_ENV'] = 'test';
process.env['VITE_API_URL'] = 'http://localhost:3001';

// Mock Vite environment
Object.defineProperty(import.meta, 'env', {
  value: {
    DEV: false,
    PROD: true,
    SSR: false,
    VITE_API_URL: 'http://localhost:3001',
  },
  writable: true,
});

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock fetch for API calls
global.fetch = vi.fn();

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));
