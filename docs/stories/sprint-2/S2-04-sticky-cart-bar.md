# S2-04 Sticky Cart Bar

## User Story

As a mobile customer browsing the menu, I want to see a persistent bar showing my cart summary, so that I always know how many items I have selected and can quickly navigate to my cart.

## Description

Build a sticky bottom bar that appears on mobile viewports when the cart has items. The bar shows the total item count, subtotal price, and a "View Cart" button. It is fixed to the bottom of the screen and visible across the menu page. On desktop, this bar is hidden (cart is accessible via the header icon).

## Feature File

```gherkin
Feature: Sticky Cart Bar
  As a mobile customer browsing the menu
  I want to see a persistent bar showing my cart summary
  So that I always know how many items I have selected and can quickly navigate to my cart

  Background:
    Given I am on the menu page "/menu"

  # --- Visibility ---

  Scenario: Bar is hidden when cart is empty
    Given the cart is empty
    When the page renders
    Then the sticky cart bar is not visible

  Scenario: Bar appears when first item is added
    Given the cart is empty
    And I am viewing at 375px viewport width
    When I add an item to the cart
    Then the sticky cart bar slides up from the bottom of the viewport

  Scenario: Bar is hidden on desktop
    Given items are in the cart
    And I am viewing at 1280px viewport width
    When the page renders
    Then the sticky cart bar is not visible

  Scenario: Bar is hidden on tablet
    Given items are in the cart
    And I am viewing at 768px viewport width
    When the page renders
    Then the sticky cart bar is not visible

  # --- Content ---

  Scenario: Bar displays item count
    Given the cart contains items with total quantity of 3
    And I am viewing at 375px viewport width
    When I look at the sticky bar
    Then it shows "3 items"

  Scenario: Bar displays subtotal
    Given the cart subtotal is $47.85
    And I am viewing at 375px viewport width
    When I look at the sticky bar
    Then it shows "$47.85"

  Scenario: View Cart button navigates to cart page
    Given items are in the cart
    And I am viewing at 375px viewport width
    When I tap "View Cart" on the sticky bar
    Then I am navigated to "/cart"

  # --- Real-Time Updates ---

  Scenario: Bar updates when items are added
    Given the sticky bar is visible showing "1 item" and "$15.95"
    When I add another item costing $14.95
    Then the bar updates to show "2 items" and "$30.90"

  Scenario: Bar updates when items are removed
    Given the cart has 3 items and the bar is visible
    When I remove an item
    Then the count and subtotal update immediately

  Scenario: Bar disappears when cart is emptied
    Given the cart has 1 item and the bar is visible at 375px viewport
    When I remove the last item
    Then the sticky bar slides away and becomes hidden

  # --- Z-Index & Layout ---

  Scenario: Bar appears above page content
    Given the sticky bar is visible
    When I scroll through the menu page
    Then the bar remains fixed at the bottom above the page content

  Scenario: Bar appears below modals
    Given the sticky bar is visible
    And I open the item detail modal
    Then the modal appears above the sticky bar

  Scenario: Footer content is not obscured by bar
    Given the sticky bar is visible at 375px viewport
    When I scroll to the bottom of the page
    Then the footer content is fully visible and not covered by the bar

  # --- Animation ---

  Scenario: Slide-up animation on first appearance
    Given the cart is empty at 375px viewport
    When I add the first item
    Then the bar animates in from the bottom (not an instant appear)

  # --- Accessibility ---

  Scenario: View Cart button is keyboard accessible
    Given the sticky bar is visible
    When I Tab to the "View Cart" button
    Then I can activate it with Enter or Space

  Scenario: Bar announces updates to screen readers
    Given the sticky bar is visible
    When the item count changes
    Then the update is announced via aria-live="polite" or role="status"

  Scenario: Bar text meets contrast ratios
    When I measure contrast on the sticky bar
    Then text on the bar background meets WCAG 2.1 AA 4.5:1 ratio
```

## Technical Notes

- `use client` component that reads from `useCartStore`
- Position: `fixed bottom-0` with appropriate z-index (e.g., z-40, below modal z-50)
- Use Tailwind responsive classes: `block md:hidden` or similar
- Add bottom padding to the page content when the bar is visible to prevent content being obscured
- Animation: CSS transition on transform (translateY) for slide-up entrance
- The bar should only render on pages where ordering makes sense (menu, cart); consider rendering it in the layout and letting it auto-hide when cart is empty

## Dependencies

- S2-01 (Cart Store -- reads itemCount and subtotalCents)
- S2-02 (Add to Cart -- bar appears when items are added)

## Priority

P1

## Story Points

2
