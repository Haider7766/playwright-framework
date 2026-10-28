import { test, expect } from '../../fixtures/base';
import { InventoryPage } from '../../pages/inventory/inventory.page';
import { ProductDetailsPage } from '../../pages/product-details/product-details.page';
import { CartPage } from '../../pages/cart/cart.page';
import { CheckoutPage } from '../../pages/checkout/checkout.page';
import { TestData } from '../../fixtures/test-data';

const inventoryData = TestData.inventory;
const cartData = TestData.cart;
const usersData = TestData.users;
const data = TestData.checkout;

// authedPage = the browser (already logged in). usersApi = the API client that supplies the data.
test('fills the checkout form with a customer taken from the API', async ({ authedPage, usersApi }) => {
  const inventory = new InventoryPage(authedPage);
  const details = new ProductDetailsPage(authedPage);
  const cart = new CartPage(authedPage);
  const checkout = new CheckoutPage(authedPage);

  // 1. API: get the customer (name and postal code) from the Users service.
  const customer = await usersApi.getCustomer(usersData.customerId);

  // 2. UI: put a product in the cart and start the checkout.
  await inventory.open(inventoryData.url);
  await inventory.openProduct(inventoryData.product.name);
  await details.addToCart();
  await cart.open(cartData.url);
  await cart.checkout();

  // 3. UI: type the data that came from the API into the form and continue.
  await checkout.fillInformation(customer.firstName, customer.lastName, customer.postalCode);
  await checkout.continue();

  await expect(authedPage).toHaveURL(data.expected.overviewUrl);
});