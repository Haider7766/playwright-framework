import { test, expect } from '../../fixtures/base';
import { InventoryPage } from '../../pages/inventory/inventory.page';
import { TestData } from '../../fixtures/test-data';

const data = TestData.inventory;

// authedPage = a fresh window that is already logged in with the session auth.setup.ts saved.
test('clicks the Sauce Labs product on the Products screen', async ({ authedPage }) => {
  const inventory = new InventoryPage(authedPage);

  await inventory.open(data.url);
  await inventory.openProduct(data.product.name);

  await expect(authedPage).toHaveURL(data.expected.productUrl);
});