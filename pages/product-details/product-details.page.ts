import { Page } from '@playwright/test';
import { ProductDetailsLocators as L } from '../../locators/product-details/product-details.locators';

export class ProductDetailsPage {
  constructor(private readonly page: Page) {}

  async addToCart(): Promise<void> {
    await this.page.locator(L.addToCart).click();
  }
}