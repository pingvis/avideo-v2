import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: false,
  retries: 0,
  reporter: "line",
  use: {
    baseURL: "http://127.0.0.1:8788",
    trace: "retain-on-failure",
  },
  webServer: {
    command: "npm run start -- --port 8788",
    url: "http://127.0.0.1:8788",
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
