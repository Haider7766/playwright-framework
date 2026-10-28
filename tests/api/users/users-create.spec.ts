import { test, expect } from '../../../fixtures/base';
import { TestData } from '../../../fixtures/test-data';

const data = TestData.users;

// usersApi = the Users API client from base.ts (no browser is needed for an API test).
test('creates a user (POST)',  { tag: '@smoke' },async ({ usersApi }) => {
  const response = await usersApi.createCustomer(data.newUser);
  const body = await response.json();

  expect(response.status()).toBe(data.expected.createStatus);
  expect(typeof body.id).toBe('number');
  expect(body.firstName).toBe(data.newUser.firstName);
  expect(body.lastName).toBe(data.newUser.lastName);
  expect(body.age).toBe(data.newUser.age);
});