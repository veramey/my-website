import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  retries: 1,
  reporter: 'line',

  use: {
    baseURL: 'http://localhost:3000',
    screenshot: 'only-on-failure',
  },

  webServer: {
    command: 'npx serve ./out -p 3000 --no-clipboard',
    url: 'http://localhost:3000',
    reuseExistingServer: false,
    timeout: 30_000,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
