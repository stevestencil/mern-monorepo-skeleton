import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    setupFiles: ["./src/__tests__/integration/setup.ts"],
    include: ["src/__tests__/integration/**/*.test.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov", "html"],
      exclude: [
        "node_modules/",
        "dist/",
        "coverage/",
        "**/*.d.ts",
        "src/index.ts",
        "src/__tests__/",
      ],
    },
    testTimeout: 30000, // 30 seconds for integration tests
    hookTimeout: 30000,
  },
});
