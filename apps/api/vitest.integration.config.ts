import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['./src/__tests__/integration/server-setup.ts'],
    include: ['src/__tests__/integration/**/*.test.ts'],
    env: {
      MONGODB_URI: 'mongodb://localhost:27018/mern_test',
      NODE_ENV: 'test',
      PORT: '4001',
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'html'],
      exclude: [
        'node_modules/',
        'dist/',
        'coverage/',
        '**/*.d.ts',
        'src/index.ts',
        'src/__tests__/',
      ],
    },
    testTimeout: 30000, // 30 seconds for integration tests
    hookTimeout: 30000,
  },
});
