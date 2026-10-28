import { test, expect } from '../../fixtures/base';
import { InventoryPage } from '../../pages/inventory/inventory.page';
import { ProductDetailsPage } from '../../pages/product-details/product-details.page';
import { CartPage } from '../../pages/cart/cart.page';
import { TestData } from '../../fixtures/test-data';

const inventoryData = TestData.inventory;
const data = TestData.cart;

// authedPage = a fresh window that is already logged in with the session auth.setup.ts saved.
test('clicks Checkout in the cart', async ({ authedPage }) => {
  const inventory = new InventoryPage(authedPage);
  const details = new ProductDetailsPage(authedPage);
  const cart = new CartPage(authedPage);

  // Open the Products screen. No login step: the saved session is already in this window.
  await inventory.open(inventoryData.url);

  // CLICK on the product name. Why: the "Add to cart" button we use lives on the product's own
  // page. What it does: the browser moves to the Sauce Labs Backpack page.
  await inventory.openProduct(inventoryData.product.name);

  // CLICK on "Add to cart". Why: the cart must hold something, otherwise Checkout has nothing
  // to check out. What it does: the product goes into the cart (the cart icon shows 1).
  await details.addToCart();

  // Open the cart page (by its address, not by a click).
  await cart.open(data.url);

  // CLICK on "Checkout". Why: this is what the test is about. What it does: the app moves to
  // the first checkout step (the "your information" form).
  await cart.checkout();

  // CHECK that the click worked: we are now on the first checkout step.
  await expect(authedPage).toHaveURL(data.expected.checkoutUrl);
});