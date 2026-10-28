import { test, expect } from '../../fixtures/base';
import { InventoryPage } from '../../pages/inventory/inventory.page';
import { ProductDetailsPage } from '../../pages/product-details/product-details.page';
import { CartPage } from '../../pages/cart/cart.page';
import { TestData } from '../../fixtures/test-data';

const inventoryData = TestData.inventory;
const data = TestData.cart;

// authedPage = a fresh window that is already logged in with the session auth.setup.ts saved.
test('the cart holds the product that was added', async ({ authedPage }) => {
  const inventory = new InventoryPage(authedPage);
  const details = new ProductDetailsPage(authedPage);
  const cart = new CartPage(authedPage);

  await inventory.open(inventoryData.url);

  // CLICK on the product name: opens that product's page.
  await inventory.openProduct(inventoryData.product.name);

  // CLICK on "Add to cart": puts the product into the cart.
  await details.addToCart();

  await cart.open(data.url);

  // CHECKS: exactly one item, and it is the same product we clicked (the name comes from the
  // same test data that was used for the click, so the two cannot drift apart).
  await expect(cart.items()).toHaveCount(data.expected.itemCount);
  await expect(cart.itemNames()).toHaveText([inventoryData.product.name]);
});