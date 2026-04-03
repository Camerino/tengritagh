# S2-11 Ordering Flow E2E Tests

## User Story

As a developer, I want comprehensive end-to-end tests covering the full ordering flow and all edge cases, so that I can be confident the ordering system works correctly before launch.

## Description

Write Playwright E2E tests that cover the complete ordering journey from browsing the menu through order confirmation, plus all edge cases: empty cart, store closed, invalid inputs, double-submit, large orders, cart persistence, and pickup time edge cases. These tests are the safety net for the most critical feature of the website.

## Feature File

```gherkin
Feature: Ordering Flow E2E Tests
  As a developer
  I want comprehensive end-to-end tests covering the full ordering flow
  So that I can be confident the ordering system works correctly before launch

  # --- Happy Path ---

  Scenario: Complete ordering flow from menu to confirmation
    Given the store is currently open
    When I browse the menu and add multiple items to the cart
    And I navigate to the cart page and proceed to checkout
    And I fill in valid customer information (name, phone)
    And I select a pickup time
    And I tap "Place Order"
    Then I am redirected to the confirmation page
    And the correct order number, items, and pickup time are displayed

  Scenario: Add item via menu card button and verify toast
    Given I am on the menu page
    When I tap "Add to Cart" on a menu item
    Then a toast appears with the item name (e.g., "Lamb Laghman added to cart")

  Scenario: Add item via detail modal with quantity and instructions
    Given I am on the menu page
    When I open the item detail modal for "Lamb Laghman" (羊肉拌面)
    And I set the quantity to 3
    And I enter special instructions "extra spicy"
    And I tap "Add to Cart"
    Then the cart has the item with quantity 3 and instructions "extra spicy"

  Scenario: Complete order with ASAP pickup time
    Given I complete the checkout with ASAP selected
    When I view the confirmation page
    Then the pickup time shows an ASAP estimated time

  # --- Cart Modification ---

  Scenario: Increase quantity in cart updates subtotal
    Given the cart contains 3 items
    When I navigate to the cart and increase the quantity of one item
    Then the subtotal updates correctly

  Scenario: Remove item from cart updates subtotal
    Given the cart contains 3 items
    When I navigate to the cart and remove one item
    Then the item disappears and the subtotal is recalculated

  Scenario: Set quantity to zero removes item
    Given the cart contains an item with quantity 1
    When I decrease the quantity to 0 on the cart page
    Then the item is removed from the cart

  Scenario: Clear all items shows empty state
    Given the cart contains items
    When I remove all items from the cart
    Then the empty cart state is shown with a "Browse Menu" button

  # --- Empty Cart ---

  Scenario: Direct navigation to cart with empty cart
    Given the cart is empty
    When I navigate directly to "/cart"
    Then the empty state message is displayed
    And a "Browse Menu" link is available

  Scenario: Direct navigation to checkout with empty cart
    Given the cart is empty
    When I navigate directly to "/checkout"
    Then I am redirected to "/cart" or shown an appropriate message

  # --- Scheduled Pickup ---

  Scenario: Select a specific scheduled time slot
    Given I am on the checkout page with items in my cart
    When I select a specific time slot (not ASAP)
    And I place the order
    Then the confirmation page shows the selected pickup time

  Scenario: Pickup time selector shows only future slots
    Given I am on the checkout page
    When I open the pickup time selector
    Then all displayed time slots are in the future

  # --- Store Closed ---

  Scenario: Add to Cart buttons disabled when store is closed
    Given the store is closed via siteConfig override
    When I visit the menu page
    Then all "Add to Cart" buttons are disabled

  Scenario: Checkout blocks submission when store is closed
    Given the store is closed via siteConfig override
    When I navigate to the checkout page
    Then order submission is blocked with a closed message

  Scenario: Homepage CTA disabled when store is closed
    Given the store is closed via siteConfig override
    When I visit the homepage
    Then the "Order for Pickup" button is disabled or shows the opening time

  # --- Form Validation ---

  Scenario: Empty name shows inline error
    When I submit the checkout form with the name field empty
    Then a "Name is required" error appears inline below the name field

  Scenario: Invalid phone shows inline error
    When I submit with phone "123"
    Then an inline error for the phone field is displayed

  Scenario: Invalid email shows inline error
    When I enter "bad" in the email field and blur
    Then an inline error for the email field is displayed

  Scenario: Valid form submission succeeds
    When I submit with all fields valid
    Then no validation errors appear
    And the order is placed successfully

  # --- Double Submit (Idempotency) ---

  Scenario: Rapid double-click creates only one order
    Given I have filled the checkout form with valid data
    When I rapidly click "Place Order" twice
    Then only one order is created in the database

  Scenario: Place Order button shows loading state
    Given I have filled the checkout form with valid data
    When I click "Place Order"
    Then the button shows a loading state with a spinner
    And the button is disabled during submission

  # --- Large Orders ---

  Scenario: Large order with 20 items completes successfully
    When I add 20 different items to the cart
    And I proceed through checkout and place the order
    Then all 20 items appear on the confirmation page

  Scenario: Single item with high quantity calculates correctly
    When I add a single item with quantity 50 to the cart
    Then the cart totals are calculated correctly

  # --- Special Instructions & Kitchen Notes ---

  Scenario: Special instructions flow through to confirmation
    When I add an item via modal with special instructions "no onions"
    And I complete the order
    Then "no onions" appears in the cart and on the confirmation page

  Scenario: Kitchen note is saved with the order
    When I enter a kitchen note on the checkout page
    And I place the order
    Then the kitchen note is saved with the order record

  # --- Cart Persistence ---

  Scenario: Cart survives page reload
    Given I have items in the cart
    When I reload the page
    Then the cart items are preserved

  Scenario: Cart survives navigation
    Given I have items in the cart
    When I navigate to another page and back to the cart
    Then the cart items are preserved

  # --- Pickup Time Edge Cases ---

  Scenario: Last time slot respects 30-minute closing cutoff
    Given the store closes at 10:00 PM
    When I view the pickup time slots
    Then the last available slot is at least 30 minutes before 10:00 PM

  # --- Cross-Viewport ---

  Scenario Outline: Ordering flow works at <viewport> viewport
    Given I am viewing at <width>px viewport width
    When I complete the full ordering flow
    Then all steps succeed without errors

    Examples:
      | viewport | width |
      | Mobile   | 375   |
      | Desktop  | 1280  |

  # --- Edge Cases: Unavailable Items ---

  Scenario: Item becomes unavailable before order is placed
    Given I have items in my cart including an item that becomes unavailable
    When I tap "Place Order" on the checkout page
    Then I see an error indicating the unavailable item
    And the order is not placed

  # --- Edge Cases: Browser Navigation ---

  Scenario: Browser back button after placing order does not allow resubmission
    Given I have placed an order successfully
    When I press the browser back button
    Then I should not be able to place a duplicate order

  # --- Edge Cases: Network Errors ---

  Scenario: Network error during order placement shows error message
    Given I have filled the checkout form with valid data
    And the server is unreachable
    When I tap "Place Order"
    Then I see an error message about a connection problem
    And I can retry placing the order after connectivity is restored

  # --- Edge Cases: Accessibility ---

  Scenario: Full ordering flow is completable using keyboard only
    Given I am on the menu page
    When I complete the entire ordering flow using only keyboard navigation
    Then the order is placed successfully

  # --- Suite ---

  Scenario: All ordering E2E tests pass
    When I run "pnpm test:e2e" for the ordering test suite
    Then all tests pass with zero failures

  Scenario: Tests are organized by scenario category
    When I inspect the test files in "tests/e2e/ordering/"
    Then tests are grouped in descriptive test.describe blocks
    And files include: happy-path.spec.ts, cart.spec.ts, checkout-validation.spec.ts, store-hours.spec.ts, pickup-times.spec.ts, idempotency.spec.ts
```

## Technical Notes

- Test files in `tests/e2e/ordering/` directory:
  - `happy-path.spec.ts` -- full ordering flow
  - `cart.spec.ts` -- cart modifications and persistence
  - `checkout-validation.spec.ts` -- form validation tests
  - `store-hours.spec.ts` -- closed store scenarios
  - `pickup-times.spec.ts` -- pickup time edge cases
  - `idempotency.spec.ts` -- double submit tests
- For store-closed tests: use a test helper that sets `siteConfig.storeOpen = "false"` in the DB before the test and resets after
- For time-based tests: consider mocking the system clock with Playwright's `page.clock` API or testing at known times
- For idempotency tests: use `page.evaluate` to check the number of orders in the DB after double-clicking, or check the network requests
- Use `test.beforeEach` to navigate to the starting page and ensure a clean state (clear cart via localStorage manipulation)
- For large order tests, use a helper function that adds items in a loop

## Dependencies

- S2-01 through S2-10 (all Sprint 2 stories must be complete)
- S0-06 (Test Configuration)

## Priority

P0

## Story Points

8
