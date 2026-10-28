# Playwright UI + API Automation Framework

UI tests for SauceDemo (login, products, cart, checkout) with test data fetched from a Users API (DummyJSON).

## What it covers

- Log in once; every UI test starts already logged in with the saved session.
- Products -> product page -> add to cart -> cart -> checkout.
- A customer is fetched from the Users API and typed into the checkout form.

## Prerequisites

- Node.js 22 or newer (20 is the minimum): `node -v`
- Git

## Setup

```
git clone https://github.com/Haider7766/playwright-api.git
cd playwright-api
npm ci
npx playwright install
```

Create your own `.env` from the example (it is never committed):

```
Copy-Item .env.example .env      # Windows PowerShell
cp .env.example .env             # macOS / Linux
```

Then fill it in:

```
SAUCE_USERNAME=standard_user
SAUCE_PASSWORD=secret_sauce
```

## Run

```
npx tsc --noEmit                                   # type check, prints nothing when fine
npx playwright test --project=ui                   # all UI tests
npx playwright test --project=ui tests/checkout    # one folder
npx playwright test --project=ui --headed          # watch the browser
npx playwright test --project=ui --ui              # step by step in the Playwright UI
npx playwright show-report                         # open the last HTML report
```

## Folder structure

| Folder | What it holds |
|---|---|
| `fixtures/<page>/<page>-data.ts` | Test data of one page |
| `fixtures/test-data.ts` | All data files in one `TestData` object |
| `fixtures/base.ts` | Shared fixtures: `authedPage` (logged-in tab), `usersApi` (API client) |
| `locators/<page>/` | Selectors of the page |
| `pages/<page>/` | Page classes: what to do on the page |
| `api/<service>/` | `<service>.endpoints.ts` (addresses) and `<service>.api.ts` (calls) |
| `tests/<page>/` | Specs: the story and the `expect` at the end |
| `tests/setup/auth.setup.ts` | Logs in once and saves the session in `.auth/` |
| `utils/` | Helpers (for example `requireEnv`) |

## Adding a new page

1. `fixtures/<page>/<page>-data.ts`, then add it to `fixtures/test-data.ts`
2. `locators/<page>/<page>.locators.ts`
3. `pages/<page>/<page>.page.ts`
4. `tests/<page>/<page>-<what>.spec.ts`

## Taking data from a new API

1. Look at the API in Postman and decide which fields the UI needs.
2. `fixtures/<service>/<service>-data.ts` and add it to `fixtures/test-data.ts`.
3. `api/<service>/<service>.endpoints.ts` (only addresses).
4. `api/<service>/<service>.api.ts` (call the API, return only the needed fields).
5. In `fixtures/base.ts`: import the class, add it to the `Fixtures` type, and add its fixture block with the API address.
6. In the test: call the API first, keep the result in a variable, pass it to the page method, and put the `expect` last.

## Notes

- Secrets live only in `.env` (ignored by git). Never put passwords in code.
- To keep the browser open after a test for debugging: set `HOLD_OPEN=1`, run with `--headed --timeout=0`. Never set it on CI.

