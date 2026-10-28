import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../../pages/shared/login.page';
import { NavigationPage } from '../../pages/shared/navigation.page';
import { TestData } from '../../fixtures/test-data';

const data = TestData.login;

setup('log in once and save the session', async ({ page }) => {
  const login = new LoginPage(page);
  const navigation = new NavigationPage(page);

  await login.open(data.url);
  await login.login(data.username, data.password);
  await expect(navigation.menuButton()).toBeVisible();

  await page.context().storageState({ path: '.auth/user.json' });
});