import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Look for test files in the "tests" directory, relative to this configuration file.
  testDir: 'test',
  
  // Fail the build on CI if you accidentally left test.only in the source code.
  forbidOnly: !!process.env.CI,
  
  // Retry on CI only.
  retries: process.env.CI ? 2 : 0,
  
  // Opt out of parallel tests on CI.
  workers: process.env.CI ? 1 : undefined,

  // Run all tests in parallel.
  fullyParallel: false,

  // Reporter to use
  reporter: 'html',

  use: {
    // Base URL to use in actions like ``.
    baseURL: process.env.BASE_URL || 'https://jupiter.cloud.planittesting.com',

    // Collect trace when retrying the failed test.
    trace: 'on-first-retry',
  },
  // Configure projects for major browsers.
  projects: [
    {
      name: 'edge',
      use: { ...devices['Desktop Edge'] },
    },
    {
      name: 'chrome',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    // {
    //   name: 'Safari',
    //   use: { ...devices['Desktop Safari'] },
    // }
  ],
});