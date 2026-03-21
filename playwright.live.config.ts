import { defineConfig, devices } from '@playwright/test';

// Config for running against the live deployed site — no local server
export default defineConfig({
  testDir: './tests',
  timeout: 60_000,
  retries: 2,
  reporter: 'line',

  use: {
    baseURL: (() => {
      const raw = process.env.BASE_URL || 'https://veramey.github.io/my-website';
      return raw.endsWith('/') ? raw : raw + '/';
    })(),
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
