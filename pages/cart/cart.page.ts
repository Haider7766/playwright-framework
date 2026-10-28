import { Locator, Page } from '@playwright/test';
import { CartLocators as L } from '../../locators/cart/cart.locators';

export class CartPage {
  constructor(private readonly page: Page) {}

  async open(url: string): Promise<void> {
    await this.page.goto(url);
  }

  items(): Locator {
    return this.page.locator(L.items);
  }

  itemNames(): Locator {
    return this.page.locator(L.itemNames);
  }

  async checkout(): Promise<void> {
    await this.page.locator(L.checkoutButton).click();
  }
}
