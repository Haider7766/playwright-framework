import { loginData } from './shared/login-data';
import { inventoryData } from './inventory/inventory-data';
import { cartData } from './cart/cart-data';
import { checkoutData } from './checkout/checkout-data';
import { usersData } from './users/users-data';

/**
 * Every page's test data in one object — the specs import only this.
 * Each page keeps its own file: fixtures/shared/*-data.ts, fixtures/<module>/<module>-data.ts
 */
export const TestData = {
  login: loginData,
  inventory: inventoryData,
  cart: cartData,
  checkout: checkoutData,
  users: usersData,
};