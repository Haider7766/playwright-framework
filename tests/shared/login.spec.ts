import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/shared/login.page';
import { NavigationPage } from '../../pages/shared/navigation.page';
import { TestData } from '../../fixtures/test-data';

// The login tests must start LOGGED OUT, so they ignore the saved session.
test.use({ storageState: { cookies: [], origins: [] } });

const data = TestData.login;

test.describe('Login', () => {
  test('logs in with a valid user', async ({ page }) => {
    const login = new LoginPage(page);
    const navigation = new NavigationPage(page);

    await login.open(data.url);
    await login.login(data.username, data.password);

    await expect(page).toHaveURL(data.expected.landingUrl);
    await expect(navigation.menuButton()).toBeVisible();
  });

});