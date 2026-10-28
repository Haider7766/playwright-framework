import { test } from '../../fixtures/base';
import { InventoryPage } from '../../pages/inventory/inventory.page';
import { ProductDetailsPage } from '../../pages/product-details/product-details.page';
import { TestData } from '../../fixtures/test-data';

const data = TestData.inventory;

// authedPage = a fresh window that is already logged in with the session auth.setup.ts saved.
test('clicks Add to cart on the Sauce Labs product page', async ({ authedPage }) => {
  const inventory = new InventoryPage(authedPage);
  const details = new ProductDetailsPage(authedPage);

  await inventory.open(data.url);
  await inventory.openProduct(data.product.name);
  await details.addToCart();
});