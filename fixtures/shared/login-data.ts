import { requireEnv } from '../../utils/helpers';

// Data of the Login page (SauceDemo's public demo users).
export const loginData = {
  url: '/',
  // Secrets: read from .env only when a test uses them (fails loudly if the value is missing).
  get username() { return requireEnv('SAUCE_USERNAME'); },
  get password() { return requireEnv('SAUCE_PASSWORD'); },
  lockedOutUser: 'locked_out_user',
  expected: {
    landingUrl: /inventory\.html/,
    lockedOutError: 'Epic sadface: Sorry, this user has been locked out.',
  },
};