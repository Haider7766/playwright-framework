import { Locator, Page } from '@playwright/test';
import { NavigationLocators as L } from '../../locators/shared/navigation.locators';

export class NavigationPage {
  constructor(private readonly page: Page) {}

  /** Visible on every page after login — the proof that the user is logged in. */
  menuButton(): Locator {
    return this.page.locator(L.menuButton);
  }

  async logout(): Promise<void> {
    await this.page.locator(L.menuButton).click();
    await this.page.locator(L.logoutLink).click();
  }
}