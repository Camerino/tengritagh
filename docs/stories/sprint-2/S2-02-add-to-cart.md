# S2-02 Add to Cart

## User Story

As a customer browsing the menu, I want to quickly add items to my cart with a single tap, so that I can build my order without leaving the menu page.

## Description

Wire the "Add to Cart" button on menu item cards to the Zustand cart store. When tapped, the item is added with quantity 1 and a toast notification confirms the action. The cart icon in the header updates to show the current item count badge.

## Feature File

```gherkin
Feature: Add to Cart
  As a customer browsing the menu
  I want to quickly add items to my cart with a single tap
  So that I can build my order without leaving the menu page

  Background:
    Given I am on the menu page "/menu"
    And the store is currently open

  Scenario: Add item to cart via button tap
    When I tap "Add to Cart" on the "Lamb Laghman" (羊肉拌面) menu card
    Then the item is added to the cart with quantity 1

  Scenario: Toast notification confirms addition
    When I tap "Add to Cart" on the "Lamb Laghman" card
    Then a toast notification appears with text "Lamb Laghman added to cart"
    And the toast includes a "View Cart" link

  Scenario: Toast auto-dismisses after 3 seconds
    When I add an item and the toast appears
    Then the toast disappears after 3 seconds
    Or I can dismiss it by tapping

  Scenario: Toast View Cart link navigates to cart
    When I add an item and tap "View Cart" in the toast
    Then I am navigated to "/cart"

  Scenario: Cart badge updates immediately
    Given the cart is empty
    When I add an item to the cart
    Then the cart icon badge in the header shows "1"

  Scenario: Adding same item again increments quantity
    Given the cart already contains "Lamb Laghman" with quantity 1
    When I tap "Add to Cart" on "Lamb Laghman" again
    Then the cart badge shows "2"
    And the cart has 1 entry with quantity 2

  Scenario: Adding different items updates badge correctly
    When I add "Lamb Laghman" and then "Uyghur Polo"
    Then the cart badge shows "2"
    And the cart has 2 separate entries

  Scenario: Add to Cart button shows visual feedback
    When I tap the "Add to Cart" button
    Then the button shows brief visual feedback (animation or checkmark)

  Scenario: Unavailable items have disabled Add to Cart button
    Given a menu item has isAvailable set to false
    When I look at its card
    Then the "Add to Cart" button is disabled
    And it shows "Unavailable" text

  Scenario: Cart badge shows total quantity not unique items
    Given I add "Lamb Laghman" twice (quantity 2) and "Polo" once (quantity 1)
    When I check the cart badge
    Then it shows "3" (total quantity)

  Scenario: Cart badge is hidden when cart is empty
    Given the cart is empty
    When I look at the header cart icon
    Then the badge is hidden (not showing "0")

  # --- Responsive ---

  Scenario: Toast positions correctly on mobile
    Given I am viewing at 375px viewport width
    When I add an item and the toast appears
    Then the toast is positioned correctly (bottom or top of viewport)
    And the button is easily tappable

  Scenario: Hover states work on desktop
    Given I am viewing at 1280px viewport width
    When I hover over the "Add to Cart" button
    Then a hover effect is visible

  # --- Accessibility ---

  Scenario: Add to Cart button is keyboard accessible
    When I press Tab to focus on an "Add to Cart" button
    And I press Enter or Space
    Then the item is added to the cart

  Scenario: Toast is announced as alert
    When an item is added and the toast appears
    Then screen readers announce the toast as an alert

  Scenario: Disabled button state is communicated to screen readers
    Given a menu item is unavailable
    When a screen reader reads the button
    Then the disabled state is announced

  Scenario: Button text and toast text meet contrast ratios
    When I measure contrast on the button and toast
    Then both meet WCAG 2.1 AA 4.5:1 ratio
```

## Technical Notes

- The menu item card "Add to Cart" button becomes a `use client` component (or the card becomes a client component wrapper)
- Use shadcn/ui `Toast` or `Sonner` for notifications
- Cart badge: use the `useCartStore` hook in the Header component; requires making the cart badge area a client component
- Handle hydration: cart badge should show 0 on server render, then update on client hydration to avoid mismatch
- Item data passed to `addItem`: menuItemId, name, nameZh, priceCents, imageUrl (all available from the menu item card props)

## Dependencies

- S2-01 (Cart Store)
- S1-02 (Menu Page -- "Add to Cart" button exists but was non-functional)

## Priority

P0

## Story Points

3
