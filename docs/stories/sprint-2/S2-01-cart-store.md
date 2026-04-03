# S2-01 Cart Store

## User Story

As a customer, I want my cart to persist even if I close my browser or navigate away, so that I do not lose my selected items when I come back.

## Description

Implement a Zustand store for the shopping cart with localStorage persistence. The store manages cart items (menu item reference, quantity, special instructions), provides actions for add/update/remove/clear, and computes derived values (item count, subtotal). The store must survive page refreshes and browser restarts via localStorage hydration.

## Feature File

```gherkin
Feature: Cart Store
  As a customer
  I want my cart to persist even if I close my browser
  So that I do not lose my selected items when I come back

  # --- Adding Items ---

  Scenario: Add item to empty cart
    Given the cart is empty
    When I call addItem with a menu item (menuItemId "item-1", name "Lamb Laghman", nameZh "羊肉拌面", priceCents 1595)
    Then the cart contains 1 item with quantity 1
    And the item has menuItemId "item-1"

  Scenario: Add duplicate item increments quantity
    Given the cart contains "Lamb Laghman" with quantity 1 and no special instructions
    When I call addItem with the same menuItemId and no special instructions
    Then the cart contains 1 entry with quantity 2

  Scenario: Add same item with different special instructions creates separate entry
    Given the cart contains "Lamb Laghman" with quantity 1 and specialInstructions ""
    When I call addItem with the same menuItemId and specialInstructions "extra spicy"
    Then the cart contains 2 separate entries

  # --- Updating Quantity ---

  Scenario: Update quantity to a specific value
    Given the cart contains "Lamb Laghman" with quantity 1
    When I call updateQuantity("item-1", 5)
    Then the item quantity becomes 5

  Scenario: Update quantity to zero removes item
    Given the cart contains "Lamb Laghman" with quantity 3
    When I call updateQuantity("item-1", 0)
    Then "Lamb Laghman" is no longer in the cart

  # --- Removing Items ---

  Scenario: Remove item from cart
    Given the cart contains "Lamb Laghman" and "Uyghur Polo"
    When I call removeItem("item-1")
    Then "Lamb Laghman" is no longer in the cart
    And "Uyghur Polo" remains in the cart

  # --- Clearing Cart ---

  Scenario: Clear entire cart
    Given the cart contains multiple items
    When I call clearCart()
    Then the cart is empty
    And itemCount is 0

  # --- Special Instructions ---

  Scenario: Update special instructions for an item
    Given the cart contains "Lamb Laghman" with specialInstructions ""
    When I call updateSpecialInstructions("item-1", "no onions")
    Then the item's specialInstructions is "no onions"

  # --- Computed Values ---

  Scenario: Item count sums all quantities
    Given the cart contains "Lamb Laghman" with quantity 3 and "Uyghur Polo" with quantity 2
    When I read itemCount
    Then it returns 5

  Scenario: Subtotal calculates correctly
    Given the cart contains an item at 1595 cents with quantity 2 and an item at 895 cents with quantity 1
    When I read subtotalCents
    Then it returns 4085

  # --- Persistence ---

  Scenario: Cart persists to localStorage
    Given I add items to the cart
    When I reload the page
    Then the cart state is restored from localStorage
    And all items, quantities, and instructions are preserved

  Scenario: Cart works when localStorage is unavailable
    Given localStorage is unavailable (private browsing mode)
    When I add items to the cart
    Then the store works in-memory without errors
    And items are added successfully

  # --- Cart Item Shape ---

  Scenario: Cart item contains all required fields
    Given I add a menu item to the cart
    When I inspect the cart item
    Then it contains menuItemId, name, nameZh, priceCents, quantity, specialInstructions, and imageUrl

  # --- Edge Cases ---

  Scenario: Adding item with quantity that exceeds reasonable limit
    Given the cart contains "Lamb Laghman" with quantity 98
    When I call addItem for the same item
    Then the quantity becomes 99

  Scenario Outline: Cart handles bilingual item names
    Given I add an item with name "<english>" and nameZh "<chinese>"
    When I inspect the cart
    Then both names are stored correctly

    Examples:
      | english           | chinese    |
      | Gouyourou Laghman | 过油肉拌面  |
      | Uyghur Polo       | 手抓饭      |
      | Lamb Samsa        | 烤包子      |
```

## Technical Notes

- Use Zustand's `persist` middleware with `localStorage` storage
- Handle hydration mismatch: Zustand persist + Next.js SSR can cause hydration issues; use `skipHydration` or a mounted check pattern
- Cart item type:
  ```typescript
  interface CartItem {
    menuItemId: string;
    name: string;
    nameZh: string;
    priceCents: number;
    quantity: number;
    specialInstructions: string;
    imageUrl: string | null;
  }
  ```
- Use a composite key (menuItemId + specialInstructions hash) to differentiate items with same dish but different instructions
- Expose a `useCartStore` hook for components to consume
- Consider a `useCartHydrated` helper to prevent SSR/client mismatch on badge counts

## Dependencies

- S0-01 (Project Setup)

## Priority

P0

## Story Points

3
