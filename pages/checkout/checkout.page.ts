import { Page } from '@playwright/test';
import { CheckoutLocators as L } from '../../locators/checkout/checkout.locators';

export class CheckoutPage {
  constructor(private readonly page: Page) {}

  async fillInformation(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.page.locator(L.firstName).fill(firstName);
    await this.page.locator(L.lastName).fill(lastName);
    await this.page.locator(L.postalCode).fill(postalCode);
  }

  async continue(): Promise<void> {
    await this.page.locator(L.continueButton).click();
  }
}