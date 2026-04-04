import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  outputDir: './test-results',
  use: {
    baseURL: 'https://opensource-demo.orangehrmlive.com',
    browserName: 'chromium',
    headless: false,
    screenshot: 'only-on-failure',
    video: 'off',
  },
});