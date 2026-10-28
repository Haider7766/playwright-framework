import 'dotenv/config';
import { defineConfig, devices } from '@playwright/test';

// True when running in a pipeline. Azure DevOps sets TF_BUILD; GitHub/GitLab set CI.
const isCI = !!process.env.CI || !!process.env.TF_BUILD;

// The browser settings that the login setup and the UI tests share.
const uiUse = {
  ...devices['Desktop Chrome'],
  baseURL: process.env.UI_BASE_URL ?? 'https://www.saucedemo.com',
};

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  timeout: 150000,

  /* Default wait for expect(...).toBeVisible() etc. Raised from Playwright's
     default (5s) because this QA server is slow, especially with several
     tests running in the same batch. */
  expect: {
    timeout: 15000,
  },

  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the pipeline if test.only was accidentally left in the source code. */
  forbidOnly: isCI,
  /* Retry failed tests twice in the pipeline only */
  retries: isCI ? 2 : 0,
  /* This QA server doesn't handle multiple simultaneous logins/sessions
     well, so we always run one test at a time regardless of CI. */
  workers: 1,
  /* Reporters: list (console), html (report folder), junit (Azure Tests tab) */
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['junit', { outputFile: 'test-results/results.xml' }],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    /* Ignore self-signed / internal SSL certificate warnings on QA/internal domains. */
    ignoreHTTPSErrors: true,

    /* Keep video and screenshot only for failed tests (faster runs, less disk) */
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },

  /* Configure projects */
  projects: [
    // 1) Logs in once and saves the session to .auth/user.json (needs the same baseURL as the UI tests)
    { name: 'setup', testMatch: /auth\.setup\.ts/, use: uiUse },

    // 2) UI tests start logged in, using the saved session (API tests are not run here)
    {
      name: 'ui',
      testIgnore: '**/api/**',
      dependencies: ['setup'],
      use: { ...uiUse, storageState: '.auth/user.json' },
    },

    // 3) API tests: no browser, no saved session
    {
      name: 'api',
      testDir: './tests/api',
      use: {
        baseURL: process.env.API_BASE_URL ?? 'https://restful-booker.herokuapp.com',
        // The booking service answers 418 unless the call says it wants JSON.
        extraHTTPHeaders: { Accept: 'application/json' },
      },
    },
  ],
});