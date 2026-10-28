/**
 * Shared helpers for generating unique test data.
 * Kept SHORT on purpose — long values seemed to get silently truncated
 * by the app at some max length, causing all runs to collide on the
 * same leading characters. Short unique values avoid that entirely.
 */

function digitsToLetters(num: number): string {
  const map = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  return String(num)
    .split('')
    .map((digit) => map[Number(digit)])
    .join('');
}
/** Read a required environment variable. Secrets live in .env (or CI secrets), never in the repo. */
/**
 * Last 6 digits of the current timestamp — short but still effectively
 * unique for test purposes (repeats only once every ~16.6 minutes).
 */
function shortUniqueDigits(): string {
  return Date.now().toString().slice(-6);
}

/**
 * Generates a short unique CODE value — letters/numbers allowed.
 * Example: uniqueCode('QA') -> 'QA063214'
 */
export function uniqueCode(prefix: string): string {
  return `${prefix}${shortUniqueDigits()}`;
}

/**
 * Generates a short unique NAME value — letters only, no digits, no spaces.
 * Example: uniqueName('Test') -> 'TestACDBHE'
 */
export function uniqueName(prefix: string): string {
  return `${prefix}${digitsToLetters(Number(shortUniqueDigits()))}`;
}
/** Read a required environment variable. Secrets live in .env (or CI secrets), never in the repo. */
export function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable ${name}. Add it to .env (see .env.example).`);
  }
  return value;
}