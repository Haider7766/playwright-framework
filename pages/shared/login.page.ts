import { Locator, Page } from '@playwright/test';
import { LoginLocators as L } from '../../locators/shared/login.locators';

export class LoginPage {
  constructor(private readonly page: Page) {}

  async open(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async login(username: string, password: string): Promise<void> {
    await this.page.locator(L.username).fill(username);
    await this.page.locator(L.password).fill(password);
    await this.page.locator(L.loginButton).click();
  }

  error(): Locator {
    return this.page.locator(L.error);
  }
}