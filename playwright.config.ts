import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  outputDir: './test-results',
  // The OrangeHRM demo shares one global auto-incrementing Employee ID
  // counter across all sessions. Running spec files in parallel lets two
  // tests grab the same ID and race each other's Save, so this suite runs
  // fully serial rather than isolating just the employee-creation specs.
  workers: 1,
  use: {
    baseURL: process.env.BASE_URL || 'https://opensource-demo.orangehrmlive.com',
    browserName: 'chromium',
    headless: false,
    screenshot: 'only-on-failure',
    video: 'off',
  },
  projects: [
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    },
  ],
});