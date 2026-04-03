# Stories, Gherkin & Step Definitions Review

**Reviewer:** Claude Opus 4.6 (1M context)
**Date:** 2026-04-02
**Scope:** All user stories (Sprint 0-3), all step definitions in tests/steps/

---

## Executive Summary

The story set is comprehensive and well-structured overall. The Gherkin scenarios are largely behavior-focused and follow a logical sprint progression. However, there are significant issues with: (1) testing implementation details rather than behavior in several Sprint 0 stories, (2) step definition gaps and mismatches that will prevent Gherkin execution, (3) missing edge case scenarios for the ordering flow, (4) anti-patterns in several feature files, and (5) duplicated step definitions across files. Below is the full list of issues, organized by severity.

---

## HIGH Severity Issues

### H1. Step Definition Duplicates Will Cause Runtime Errors

Multiple step definition files register the same or overlapping patterns, which will cause playwright-bdd to throw "ambiguous step" errors at runtime.

- `common.steps.ts` line 49: `Then('I should be navigated to {string}', ...)`
  `navigation.steps.ts` line 52: `Then('I should be on the {string} page', ...)` -- different pattern, OK
  BUT `common.steps.ts` line 248: `Then('the page title should contain {string}', ...)` conflicts with
  `visibility.steps.ts` line 52: `Then('the page title should contain {string}', ...)`
- `common.steps.ts` line 178: `When('I tap the {string} link', ...)` conflicts with
  `navigation.steps.ts` line 44: `When('I click the {string} link', ...)` -- different wording, but Gherkin uses both "tap" and "click" interchangeably in stories, which will be confusing.
- `order.steps.ts` line 190: `Then('I should see {string}', ...)` conflicts with
  `visibility.steps.ts` line 11: `Then('I should see {string}', ...)`

**FILES:** `tests/steps/common.steps.ts`, `tests/steps/visibility.steps.ts`, `tests/steps/order.steps.ts`
**FIX:** Remove the duplicate `Then('the page title should contain {string}')` from `common.steps.ts` (keep the one in `visibility.steps.ts`). Remove `Then('I should see {string}')` from `order.steps.ts` (keep the one in `visibility.steps.ts`). Standardize on either "click" or "tap" -- not both.

### H2. Gherkin Steps Have No Matching Step Definitions

Many Gherkin steps in story files have no corresponding step definition. The step definitions cover only a fraction of the scenarios written.

Key missing step definitions:

- **Store hours steps:** No steps for `Given the store is currently open`, `Given the store is currently closed`, `When I call isStoreOpen()`. S2-09 and S2-11 rely on these heavily.
- **Pickup time steps:** No steps for time slot interactions, ASAP selection beyond the basic one in checkout.steps.ts.
- **Item detail modal steps:** No steps for opening a modal by tapping a card, quantity stepper interactions within the modal, special instructions in the modal. S2-03 is entirely unimplemented in step definitions.
- **Toast auto-dismiss:** No step for waiting 3 seconds and verifying toast disappears.
- **Phone auto-format:** No step for verifying formatted phone display.
- **Order summary collapse/expand:** No steps for toggling collapsible order summary.
- **Cart persistence after reload:** `cart.steps.ts` has `my cart should still contain` but the Gherkin in S2-01 says "When I reload the page / Then the cart state is restored" -- different wording.

**FILES:** `tests/steps/` (all), `docs/stories/sprint-2/`
**FIX:** Add missing step definitions for store hours, pickup times, item detail modal, toast behavior, and phone formatting. See "Step Definition Gaps" section below.

### H3. S2-01 Cart Store Scenarios Are Unit Tests Written as Gherkin

S2-01's scenarios test internal API calls (`addItem`, `updateQuantity`, `removeItem`, `clearCart`, `updateSpecialInstructions`, `subtotalCents`, `itemCount`). These are implementation details, not user behavior. BDD Gherkin is for acceptance criteria from the user's perspective -- not for testing store method signatures.

**FILE:** `docs/stories/sprint-2/S2-01-cart-store.md`
**FIX:** These scenarios should be unit tests (Vitest), not Gherkin BDD scenarios. Either: (a) move them to a Vitest test file and replace with user-facing Gherkin that tests cart behavior through the UI, or (b) clearly label them as "unit-level acceptance criteria" to be validated via Vitest, not Playwright.

### H4. S2-07 Place Order Scenarios Are Backend Tests Written as Gherkin

S2-07 tests server action internals: "When I call placeOrder", "When I query the orders table", "When I inspect the order record". This is testing implementation, not behavior. Gherkin should describe user-visible outcomes.

**FILE:** `docs/stories/sprint-2/S2-07-place-order.md`
**FIX:** Keep the validation scenarios (user sees error messages) but rewrite database/internal scenarios as Vitest integration tests. The Gherkin should focus on what the user experiences: "When I place an order with missing name / Then I see an error message."

### H5. `waitForLoadState('networkidle')` is Fragile and Deprecated-Adjacent

Almost every navigation step uses `waitForLoadState('networkidle')`. The Playwright docs warn that `networkidle` is unreliable (long-polling, analytics, etc. keep the network busy). This will cause flaky tests.

**FILES:** `tests/steps/common.steps.ts`, `tests/steps/navigation.steps.ts`, `tests/steps/order.steps.ts`
**FIX:** Replace `networkidle` with `domcontentloaded` and use explicit assertions (e.g., `await expect(page.locator('main')).toBeVisible()`) to confirm page readiness.

### H6. Status Polling Steps Use `waitForTimeout(35000)` -- Tests Will Be Extremely Slow

`order.steps.ts` lines 211-247 use `page.waitForTimeout(35000)` and even `page.waitForTimeout(65000)` to wait for polling. This makes individual tests take over a minute. In a test suite, this is unacceptable.

**FILE:** `tests/steps/order.steps.ts`
**FIX:** Use `page.waitForResponse()` or `expect.poll()` to wait for status check requests instead of hardcoded timeouts. Alternatively, mock the polling interval to be shorter in test mode.

---

## MEDIUM Severity Issues

### M1. Mixed "tap" and "click" Terminology in Gherkin

Stories inconsistently use "I tap" and "I click" to mean the same thing. This forces creation of duplicate step definitions or fragile regex matching.

**FILES:** Most Sprint 2 story files
**FIX:** Standardize on "I click" throughout (it works for both mouse and touch). If touch-specific behavior matters, make it explicit: "I touch".

### M2. S1-01 Homepage Has Multi-Step Scenario (Anti-Pattern)

The scenario "Times Square location link opens Google Maps" has two When steps:

```
When the hero section loads
Then "Near Times Square, NYC" text is visible and clickable
When I click "Near Times Square, NYC"
Then Google Maps opens in a new tab
```

This is two behaviors in one scenario.

**FILE:** `docs/stories/sprint-1/S1-01-homepage.md`
**FIX:** Split into two scenarios: one verifying the link exists, one verifying navigation.

### M3. S0-01 Through S0-06 Are Developer Stories Testing Config, Not Behavior

Sprint 0 stories like "When I inspect tsconfig.json / Then strict is set to true" are not BDD scenarios -- they are infrastructure verification checks. They should be shell scripts or CI checks, not Gherkin features.

**FILES:** `docs/stories/sprint-0/*.md`
**FIX:** Accept that Sprint 0 stories are deliberately infrastructure-focused. However, rename the Feature descriptions to clarify these are "Technical Setup Verification" not user behavior. Alternatively, convert to simple checklist items.

### M4. Inconsistent `data-testid` Naming Between Steps and Stories

Step definitions reference `data-testid="menu-item"` but `order.steps.ts` references `data-testid="menu-item-card"`. The stories don't specify which testids to use, creating a mismatch risk.

**FILES:** `tests/steps/menu.steps.ts` vs `tests/steps/order.steps.ts`
**FIX:** Standardize on `data-testid="menu-item-card"` everywhere (it's more descriptive). Update `menu.steps.ts` to match.

### M5. `order.steps.ts` Has Incomplete/Placeholder Step Implementations

Several steps in `order.steps.ts` have empty bodies or comments like `// These steps should not be active`:

- Line 166-167: `Then('{string} and {string} should be greyed out', ...)` -- empty body
- Line 174-176: `Then('{string} and {string} should show checkmarks', ...)` -- empty body
- Lines 197-207: Multiple `Given` steps for status changes are empty

**FILE:** `tests/steps/order.steps.ts`
**FIX:** Implement these steps or remove them if the corresponding scenarios are deferred to Sprint 3.

### M6. `order-status.steps.ts` Hardcodes Status Value in `When` Step

Line 26: `{ data: { state: 'ready' } }` is hardcoded regardless of the `status` parameter passed to the step. This means `When('the order status changes to {string}')` always sets status to "ready".

**FILE:** `tests/steps/order-status.steps.ts`
**FIX:** Use the `status` parameter: `{ data: { state: status } }` (with appropriate mapping from internal status to Clover state).

### M7. `import { expect }` Placement at End of File

`common.steps.ts` has `import { expect } from '@playwright/test'` at line 272 (end of file). While this works in practice, it is unconventional and confusing.

**FILE:** `tests/steps/common.steps.ts`
**FIX:** Move the import to the top of the file with other imports.

### M8. S2-06 Checkout Has "Errors show on blur not on every keystroke" -- Two When/Then Pairs

The scenario has:

```
When I start typing in the name field
Then no validation error appears while I type
When I move focus to another field (blur)
Then validation is triggered on the name field
```

This is an imperative, multi-step scenario testing implementation timing, not behavior.

**FILE:** `docs/stories/sprint-2/S2-06-checkout-page.md`
**FIX:** Rewrite as two simpler scenarios: "Validation errors do not appear while typing" and "Validation errors appear after leaving a field."

### M9. S3-04 Introduces "retrying" Status Not in Schema

S3-04 mentions `cloverSyncStatus is "retrying"` but the database schema in S0-03 only defines `pending | synced | failed` for cloverSyncStatus. Either the schema needs updating or the scenario is incorrect.

**FILE:** `docs/stories/sprint-3/S3-04-clover-failure.md`, `docs/stories/sprint-0/S0-03-database-schema.md`
**FIX:** Add "retrying" to the cloverSyncStatus enum in S0-03, or remove the "retrying" status from S3-04 and just keep it as "pending" during retries.

### M10. Overly Specific Selectors in cart.steps.ts

`cart.steps.ts` uses complex selectors like `page.locator('[data-testid="menu-item"]:has-text("${item}") button[data-testid="add-to-cart"]')`. This is fragile -- if the DOM structure changes even slightly, the selector breaks.

**FILE:** `tests/steps/cart.steps.ts`
**FIX:** Prefer `page.getByRole()` combined with `within()` patterns, or use a simpler `page.getByTestId('menu-item').filter({ hasText: item }).getByRole('button', { name: 'Add to Cart' })`.

---

## LOW Severity Issues

### L1. S1-06 E2E Test Story Tests That Tests Exist

S1-06 scenarios like "Given the homepage E2E test file exists at tests/e2e/homepage.spec.ts" are meta-tests about test file existence. This is not BDD.

**FILE:** `docs/stories/sprint-1/S1-06-sprint1-e2e-tests.md`
**FIX:** Replace with actual acceptance criteria that the tests should validate, or accept this as a task tracking artifact rather than a BDD feature.

### L2. Inconsistent Viewport Heights

`common.steps.ts` sets viewport height to 800, `responsive.steps.ts` uses 812 (iPhone) for mobile and 720 for desktop. The Playwright config in S0-06 specifies yet different values (667 for mobile).

**FILES:** `tests/steps/common.steps.ts`, `tests/steps/responsive.steps.ts`
**FIX:** Use consistent viewport sizes from the Playwright config. Define viewport constants in `fixtures.ts`.

### L3. `cart.steps.ts` Uses `waitForTimeout(300)` for Timing

Lines 29, 57 use hardcoded `waitForTimeout(300)` after clicking buttons. This is fragile.

**FILE:** `tests/steps/cart.steps.ts`
**FIX:** Wait for a visible change instead (toast appears, badge updates, etc.).

### L4. S2-09 Manual Override Logic May Be Contradictory

S2-09 says `siteConfig.storeOpen = "true"` should force the store open even on a closed day (Monday). But the scenario also says `siteConfig.storeOpen = "false"` forces closed during business hours. The override is bidirectional, which may confuse implementation.

**FILE:** `docs/stories/sprint-2/S2-09-store-hours.md`
**FIX:** Clarify in the story that `storeOpen` is a tri-state: `"auto"` (use schedule), `"true"` (force open), `"false"` (force closed). Or rename to `storeOverride`.

### L5. Several Scenarios Test CSS/Visual Details Inappropriately

Scenarios like "terracotta underline or background highlight", "gold (#D4A84B) focus ring", "cream text" test specific CSS implementation. BDD should test behavior, not pixel-level styling.

**FILES:** `docs/stories/sprint-0/S0-02-design-system.md`, `docs/stories/sprint-1/S1-02-menu-page.md`
**FIX:** Accept these as design system verification scenarios (not pure BDD). Alternatively, move color-specific checks to visual regression tests.

---

## Missing Scenarios

The following scenarios are NOT covered in any story file and represent real business risk:

### Critical Missing Scenarios

1. **Menu item sold out during browsing:** Customer adds item, but by the time they check out, the item is marked `isAvailable: false`. No scenario covers this race condition.

2. **Modifying cart during checkout:** Customer is on the checkout page, navigates back to menu, changes cart, returns to checkout. Is the order summary refreshed? No scenario.

3. **Browser back button during checkout flow:** Customer presses back after "Place Order" is clicked but before redirect. Could cause duplicate submission or confusing state.

4. **Network timeout during order placement:** The `placeOrder` server action fails due to network issues. The customer sees... what? No error handling scenario from the user perspective.

5. **Very long special instructions:** S2-03 caps at 200 characters, but what about Unicode characters (Chinese characters count differently)? What about emoji in special instructions?

6. **Phone number with country code:** S2-06 only validates 10-digit US numbers. What about +1-212-555-1234 or international numbers? The PRD says customers near Times Square include tourists.

7. **Keyboard-only ordering flow:** No end-to-end scenario verifying a user can complete the entire order using only keyboard (Tab, Enter, arrow keys). Individual accessibility scenarios exist but not a full-flow test.

8. **Cart with stale prices:** Menu prices change between when items are added to cart and when the order is placed. S2-07 tests denormalized prices after order, but no scenario for the user seeing a price mismatch.

9. **Concurrent orders with same phone number:** What if someone places two orders with the same phone? The plan mentions "rate limiting" as P2, but there is no scenario for the base case.

10. **Order confirmation page refresh/bookmark:** Customer bookmarks the order confirmation URL and returns days later. Does it still work? What if the order is old?

### Recommended Additions

Add these scenarios to S2-11 (Ordering E2E Tests):

```gherkin
Scenario: Item becomes unavailable during checkout
  Given I have "Lamb Laghman" in my cart
  And "Lamb Laghman" becomes unavailable before I place the order
  When I tap "Place Order"
  Then I see an error "Lamb Laghman is currently unavailable"
  And the order is not placed

Scenario: Browser back button after placing order
  Given I have placed an order
  When I press the browser back button
  Then I should not see the checkout form with a "Place Order" button
  And I should not be able to place a duplicate order

Scenario: Network error during order placement
  Given I have filled the checkout form with valid data
  And the server is unreachable
  When I tap "Place Order"
  Then I see an error message about connectivity
  And I can retry placing the order

Scenario: Full ordering flow using keyboard only
  Given I am on the menu page
  When I complete the entire ordering flow using only keyboard
  Then the order is placed successfully
```

---

## Step Definition Gaps

Steps that need to be created for existing Gherkin to execute:

| Missing Step Pattern                                    | Needed By                                            |
| ------------------------------------------------------- | ---------------------------------------------------- |
| `Given the store is currently open`                     | S2-02, S2-03, S2-09, S2-11                           |
| `Given the store is currently closed`                   | S2-09, S2-11                                         |
| `Given the store is closed via siteConfig override`     | S2-11                                                |
| `When I open the item detail modal for {string}`        | S2-03, S2-11                                         |
| `When I set the quantity to {int}` (in modal)           | S2-03, S2-11                                         |
| `When I enter special instructions {string}` (in modal) | S2-03, S2-11                                         |
| `Then a toast notification appears with text {string}`  | S2-02                                                |
| `Then the toast disappears after {int} seconds`         | S2-02                                                |
| `When I open the pickup time selector`                  | S2-10                                                |
| `Then time slots are displayed in 15-minute increments` | S2-10                                                |
| `Given siteConfig.estimatedWaitMinutes is {int}`        | S2-06, S2-10                                         |
| `When I tap the plus button` / `minus button` (modal)   | S2-03                                                |
| `Then the quantity stepper shows {int}`                 | S2-03                                                |
| `When I press the Escape key`                           | S2-03                                                |
| `When I click outside the modal`                        | S2-03                                                |
| `Then the modal closes`                                 | S2-03                                                |
| `Given I am viewing at {int}px viewport width`          | Many stories (uses different wording than step defs) |

---

## Plan Compliance Check

Comparing the plan in `greedy-beaming-conway.md` against stories:

| Plan Feature                        | Story Coverage         | Status             |
| ----------------------------------- | ---------------------- | ------------------ |
| Homepage hero with etles pattern    | S1-01                  | Covered            |
| Featured dishes with Chinese names  | S1-01                  | Covered            |
| Google Reviews (Places API)         | S1-01                  | Covered            |
| Menu page with bilingual names      | S1-02                  | Covered            |
| About page                          | S1-03                  | Covered            |
| Location page                       | S1-04                  | Covered            |
| Zustand cart with localStorage      | S2-01                  | Covered            |
| Add to Cart + toast                 | S2-02                  | Covered            |
| Item detail modal                   | S2-03                  | Covered            |
| Sticky cart bar                     | S2-04                  | Covered            |
| Cart page                           | S2-05                  | Covered            |
| Checkout page                       | S2-06                  | Covered            |
| placeOrder server action            | S2-07                  | Covered            |
| Order confirmation + status tracker | S2-08                  | Covered            |
| Store hours logic                   | S2-09                  | Covered            |
| Pickup time rules                   | S2-10                  | Covered            |
| Clover client                       | S3-01                  | Covered            |
| Order-to-Clover sync                | S3-02                  | Covered            |
| Order status tracking               | S3-03                  | Covered            |
| Clover failure handling             | S3-04                  | Covered            |
| Accessibility audit                 | Plan mentions Sprint 3 | No dedicated story |
| Lighthouse optimization             | Plan mentions Sprint 3 | No dedicated story |

**Gap:** The plan mentions "Accessibility audit, Lighthouse optimization" in Sprint 3 but there is no dedicated story for it. Accessibility scenarios are scattered across individual stories, but there is no comprehensive audit story.

---

## Consistency Check

### Story ID/Priority/Dependency Issues

- All story IDs follow the S{sprint}-{number} pattern consistently.
- All Sprint 0 stories are P0 or P1 (correct for foundation).
- S2-06 (Checkout) depends on S2-05 (Cart Page) and S2-01 (Cart Store) but does NOT list S2-09 (Store Hours) or S2-10 (Pickup Times) as dependencies, even though the checkout page includes the pickup time selector. The stories were likely written in implementation order, but the dependency should be noted.
- S3-04 introduces "retrying" cloverSyncStatus not in S0-03 schema (see M9 above).

---

## Fixes Applied

See the "Changes Made" section at the end of this document for all edits applied to story files and step definitions.
