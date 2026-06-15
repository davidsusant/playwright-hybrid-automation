import { defineConfig, devices } from "@playwright/test";
import * as dotenv from "dotenv";

dotenv.config();

const UI_BASE_URL =
  process.env.UI_BASE_URL ?? "http://automationintesting.online";
const API_BASE_URL =
  process.env.API_BASE_URL ?? "https://restful-booker.herokuapp.com";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  timeout: 60_000,
  expect: {
    timeout: 10_000,
  },
  reporter: [
    ["list"],
    ["html", { open: "never", outputFolder: "playwright-report" }],
    ["junit", { outputFile: "test-results/junit.xml" }],
    ["json", { outputFile: "test-results/results.json" }],
  ],
  use: {
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  projects: [
    {
      name: "api",
      testDir: "./tests/api",
      use: {
        baseURL: API_BASE_URL,
        extraHTTPHeaders: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    },
    {
      name: "ui-chromium",
      testDir: "./tests/ui",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: UI_BASE_URL,
      },
    },
    {
      name: "ui-firefox",
      testDir: "./tests/ui",
      use: {
        ...devices["Desktop Firefox"],
        baseURL: UI_BASE_URL,
      },
    },
    {
      name: "ui-webkit",
      testDir: "./tests/ui",
      use: {
        ...devices["Desktop Safari"],
        baseURL: UI_BASE_URL,
      },
    },
  ],
});
