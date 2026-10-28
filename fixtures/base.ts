
import { test as base, Page } from '@playwright/test';
import { UsersApi } from '../api/users/users.api';

type Fixtures = {
  authedPage: Page;
  /** Calls the Users API (a different server from the website) to fetch test data for a UI test. */
  usersApi: UsersApi;
};

export const test = base.extend<Fixtures>({
  authedPage: async ({ page }, use) => {
    await use(page); // already logged in — storageState from auth.setup.ts

    // Debug aid: with HOLD_OPEN=1 the window stays open after the test until you press Resume
    // in the Playwright Inspector (needs --headed). Never set HOLD_OPEN on CI.
    if (process.env.HOLD_OPEN) await page.pause();
  },

  usersApi: async ({ playwright }, use) => {
    // A separate API client with its own address, so the website's baseURL is not used for it.
    const context = await playwright.request.newContext({
      baseURL: process.env.USERS_API_URL ?? 'https://dummyjson.com',
      extraHTTPHeaders: { Accept: 'application/json' },
    });
    await use(new UsersApi(context));
    await context.dispose();
  },
});

export { expect } from '@playwright/test';