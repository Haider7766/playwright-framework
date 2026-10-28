import { Page } from '@playwright/test';
import { InventoryLocators as L } from '../../locators/inventory/inventory.locators';

export class InventoryPage {
  constructor(private readonly page: Page) {}

  async open(url: string): Promise<void> {
    await this.page.goto(url);
  }

  /** Opens the product whose name is written on the list, e.g. "Sauce Labs Backpack". */
  async openProduct(name: string): Promise<void> {
    await this.page.locator(L.itemNames).filter({ hasText: name }).click();
  }
}