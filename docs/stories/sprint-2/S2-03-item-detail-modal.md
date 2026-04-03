# S2-03 Item Detail Modal

## User Story

As a customer, I want to view full details about a menu item and customize my order with quantity and special instructions, so that I can get exactly what I want.

## Description

Build a modal/drawer that opens when a customer taps on a menu item card (or a dedicated "Customize" button). The modal displays the item's full image, English name, Chinese name, full description, price, a quantity stepper, and a text field for special instructions. An "Add to Cart" button in the modal adds the item with the specified quantity and instructions.

## Feature File

```gherkin
Feature: Item Detail Modal
  As a customer
  I want to view full details about a menu item and customize my order
  So that I can get exactly what I want

  Background:
    Given I am on the menu page "/menu"
    And the store is currently open

  # --- Opening and Displaying ---

  Scenario: Modal opens when tapping a menu item card
    When I tap on the "Lamb Laghman" (羊肉拌面) menu item card
    Then a modal overlay opens with the item details

  Scenario: Modal displays all item information
    When I open the modal for "Lamb Laghman"
    Then the item image is displayed at a large size
    And the English name "Lamb Laghman" is visible
    And the Chinese name "羊肉拌面" is visible
    And the full description is displayed (not truncated)
    And the price "$15.95" is visible

  # --- Quantity Stepper ---

  Scenario: Default quantity is 1
    When I open the item detail modal
    Then the quantity stepper shows 1

  Scenario: Increment quantity
    Given the modal is open with quantity 1
    When I tap the plus button
    Then the quantity increases to 2

  Scenario: Decrement quantity
    Given the modal is open with quantity 3
    When I tap the minus button
    Then the quantity decreases to 2

  Scenario: Minimum quantity is enforced at 1
    Given the modal is open with quantity 1
    When I look at the minus button
    Then it is disabled
    And tapping it does not change the quantity below 1

  Scenario: Maximum quantity is 99
    Given the modal is open with quantity 99
    When I tap the plus button
    Then the quantity remains at 99

  # --- Special Instructions ---

  Scenario: Special instructions field is available
    When I open the item detail modal
    Then a text input for "Special Instructions" is visible
    And the placeholder reads "e.g., no onions, extra spicy"

  Scenario: Special instructions enforces character limit
    When I type more than 200 characters in the special instructions field
    Then input stops at 200 characters
    And a visible counter shows "200/200"

  Scenario: Valid special instructions are accepted
    When I type "extra spicy" in the special instructions field
    Then the text appears in the field
    And the counter updates accordingly

  # --- Dynamic Price ---

  Scenario: Add to Cart button shows dynamic total price
    Given the modal is open for a $15.95 item
    And the quantity is set to 1
    Then the button reads "Add to Cart - $15.95"

  Scenario Outline: Price updates with quantity changes
    Given the modal is open for a $15.95 item
    When I set the quantity to <qty>
    Then the button reads "Add to Cart - $<total>"

    Examples:
      | qty | total |
      | 1   | 15.95 |
      | 2   | 31.90 |
      | 3   | 47.85 |

  # --- Adding to Cart ---

  Scenario: Add to cart from modal with quantity and instructions
    Given the modal is open for "Lamb Laghman"
    And I set the quantity to 2
    And I enter special instructions "no onions"
    When I tap "Add to Cart - $31.90"
    Then the item is added to the cart with quantity 2 and specialInstructions "no onions"
    And the modal closes
    And a toast notification confirms the addition

  Scenario: Adding duplicate item with same instructions updates quantity
    Given the cart already contains "Lamb Laghman" with quantity 1 and no special instructions
    When I open the modal for "Lamb Laghman" and add with quantity 2 and no special instructions
    Then the cart has 1 entry for "Lamb Laghman" with quantity 3

  # --- Closing the Modal ---

  Scenario: Close modal via X button
    Given the modal is open
    When I tap the X close button
    Then the modal closes
    And no item is added to the cart

  Scenario: Close modal via backdrop click
    Given the modal is open
    When I click outside the modal on the backdrop overlay
    Then the modal closes

  Scenario: Close modal via Escape key
    Given the modal is open
    When I press the Escape key
    Then the modal closes

  # --- Accessibility ---

  Scenario: Modal traps focus
    Given the modal is open
    When I press Tab repeatedly
    Then focus cycles within the modal
    And focus does not move to elements behind the modal

  Scenario: Modal has dialog role
    Given the modal is open
    When I inspect the modal element
    Then it has role="dialog" and aria-modal="true"
    And the item name is in the dialog title

  Scenario: Quantity stepper is keyboard operable
    Given the modal is open
    When I Tab to the quantity stepper
    Then I can increment and decrement using keyboard controls

  # --- Responsive ---

  Scenario: Mobile shows bottom sheet
    Given I am viewing at 375px viewport width
    When I open the item detail modal
    Then it renders as a bottom sheet sliding up from the bottom
    And the image fits the viewport
    And the content is scrollable if it overflows

  Scenario: Desktop shows centered modal
    Given I am viewing at 1280px viewport width
    When I open the item detail modal
    Then it renders as a centered modal with max-width

  Scenario: Modal body scrolls on overflow
    Given the modal content exceeds the viewport height
    When I look at the modal
    Then the modal body is scrollable

  # --- Contrast & Visibility ---

  Scenario: All interactive elements meet contrast ratios
    When I measure contrast on the modal
    Then all text and interactive elements meet WCAG 2.1 AA 4.5:1 ratio
```

## Technical Notes

- Use shadcn/ui `Dialog` or `Sheet` component as the base
- Mobile: use `Sheet` (side="bottom") for bottom sheet behavior; Desktop: use `Dialog` for centered modal
- Quantity stepper: custom component with +/- buttons and a number display
- Price calculation: `priceCents * quantity`, formatted as dollars
- The "Add to Cart" button calls `addItem` from the cart store with all fields populated
- If the item is already in the cart (same menuItemId, same special instructions), this should update the quantity rather than create a duplicate
- Use `use client` for the entire modal component

## Dependencies

- S2-01 (Cart Store)
- S2-02 (Add to Cart -- toast notification pattern)
- S1-02 (Menu Page -- card tap triggers modal)

## Priority

P0

## Story Points

5
