import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/__tests__/integration/setup.ts"],
    include: ["src/__tests__/integration/**/*.test.tsx"],
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov", "html"],
      exclude: [
        "node_modules/",
        "dist/",
        "coverage/",
        "**/*.d.ts",
        "src/main.tsx",
        "src/vite-env.d.ts",
        "src/__tests__/",
      ],
    },
    testTimeout: 30000, // 30 seconds for integration tests
    hookTimeout: 30000,
  },
});
