# S2-05 Cart Page

## User Story

As a customer, I want to review my selected items, adjust quantities, and remove items before proceeding to checkout, so that my order is exactly what I want.

## Description

Build the full cart page (`/cart`) displaying all cart items with thumbnails, names (English and Chinese), prices, quantity steppers, remove buttons, a subtotal line, an estimated tax line, and a "Proceed to Checkout" button. The page should also handle the empty cart state gracefully.

## Feature File

```gherkin
Feature: Cart Page
  As a customer
  I want to review my selected items and adjust quantities
  So that my order is exactly what I want before proceeding to checkout

  Background:
    Given I navigate to the cart page "/cart"

  # --- Cart with Items ---

  Scenario: Cart displays all added items
    Given the cart contains "Lamb Laghman" (羊肉拌面) and "Uyghur Polo" (手抓饭)
    When the page renders
    Then both items are displayed with their correct details

  Scenario: Cart item row shows all required information
    Given the cart contains "Lamb Laghman" with quantity 2
    When I inspect a cart item row
    Then it shows a thumbnail image
    And the English name "Lamb Laghman"
    And the Chinese name "羊肉拌面"
    And the unit price
    And a quantity stepper
    And the line total (price * quantity)
    And a remove button (trash icon)

  Scenario: Special instructions are displayed
    Given the cart contains "Lamb Laghman" with specialInstructions "extra spicy"
    When I inspect the cart item row
    Then "extra spicy" is displayed below the item name in smaller text

  Scenario: Page has correct title
    When I check the document title
    Then it is "Cart | Tengri Tagh Uyghur Cuisine"

  # --- Quantity Management ---

  Scenario: Increase quantity updates totals in real-time
    Given the cart contains "Lamb Laghman" at $15.95 with quantity 1
    When I tap the plus button on the quantity stepper
    Then the quantity becomes 2
    And the line total updates to "$31.90"
    And the subtotal updates accordingly

  Scenario: Decrease quantity updates totals in real-time
    Given the cart contains "Lamb Laghman" with quantity 3
    When I tap the minus button on the quantity stepper
    Then the quantity becomes 2
    And the line total and subtotal update accordingly

  Scenario: Decreasing quantity to zero removes the item
    Given the cart contains "Lamb Laghman" with quantity 1
    When I tap the minus button
    Then the item is removed from the cart or a confirmation is shown

  # --- Removing Items ---

  Scenario: Remove item via trash icon
    Given the cart contains "Lamb Laghman" and "Uyghur Polo"
    When I tap the trash icon on "Lamb Laghman"
    Then "Lamb Laghman" is removed immediately
    And the subtotal is recalculated

  # --- Price Calculations ---

  Scenario: Subtotal is calculated correctly
    Given the cart contains "Lamb Laghman" (qty 2 at $15.95) and "Uyghur Polo" (qty 1 at $14.95)
    When I look at the subtotal
    Then it shows "$46.85"

  Scenario: Estimated tax is displayed
    Given the cart subtotal is $46.85
    When I look at the tax line
    Then it shows approximately $4.16 (8.875% NYC sales tax)

  Scenario: Estimated total is displayed
    Given the cart has a subtotal and tax calculated
    When I look at the total line
    Then it shows the sum of subtotal plus tax

  # --- Navigation ---

  Scenario: Proceed to Checkout navigates to checkout page
    Given the cart contains items
    When I tap "Proceed to Checkout"
    Then I am navigated to "/checkout"

  Scenario: Continue Shopping navigates back to menu
    Given the cart contains items
    When I tap "Continue Shopping"
    Then I am navigated to "/menu"

  # --- Empty Cart State ---

  Scenario: Empty cart shows friendly message
    Given the cart is empty
    When the page renders
    Then a "Your cart is empty" message is displayed
    And an illustration or icon is shown
    And a "Browse Menu" button is visible

  Scenario: Browse Menu link navigates to menu
    Given the cart is empty
    When I tap the "Browse Menu" button
    Then I am navigated to "/menu"

  # --- Edge Cases ---

  Scenario: Large cart renders correctly
    Given the cart contains 20 different items
    When the page renders
    Then all items are visible (scrollable)
    And totals are calculated correctly

  # --- Responsive ---

  Scenario Outline: Cart page is responsive
    Given I am viewing at <width>px viewport width
    When the page renders
    Then all cart items are readable
    And quantity steppers are usable
    And totals are visible

    Examples:
      | width |
      | 375   |
      | 768   |
      | 1280  |

  Scenario: Mobile cart items stack compactly
    Given I am viewing at 375px viewport width
    When the page renders
    Then items are displayed in a compact stacked layout
    And thumbnails are visible

  Scenario: Desktop cart uses wide layout
    Given I am viewing at 1280px viewport width
    When the page renders
    Then items use a wider layout with clear column structure

  # --- Accessibility ---

  Scenario: All interactive elements are keyboard accessible
    When I press Tab through the cart page
    Then quantity steppers, remove buttons, and "Proceed to Checkout" are all reachable

  Scenario: Remove buttons have accessible labels
    Given the cart contains "Lamb Laghman"
    When I inspect the remove button
    Then it has an aria-label like "Remove Lamb Laghman"

  Scenario: Quantity stepper labels are announced
    When a screen reader reads a quantity stepper
    Then the stepper has appropriate labels for increment and decrement

  Scenario: All text meets contrast ratios
    When I measure contrast on the cart page
    Then all text and interactive elements meet WCAG 2.1 AA 4.5:1 ratio
```

## Technical Notes

- `use client` page component that reads from `useCartStore`
- Tax calculation: 8.875% NYC sales tax (can be a constant or from siteConfig)
- Price formatting: utility function `formatCents(cents: number): string` that converts cents to "$X.XX"
- Thumbnail images: use `next/image` with small dimensions (64x64 or 80x80)
- Empty state: render when `cartItems.length === 0`
- Consider optimistic UI: quantity changes are instant (Zustand is synchronous)
- The "Proceed to Checkout" button should be disabled/hidden if cart is empty (though the empty state should already guide users)

## Dependencies

- S2-01 (Cart Store)
- S2-02 (Add to Cart -- items must be in cart to display)
- S0-04 (Layout Shell)

## Priority

P0

## Story Points

5
