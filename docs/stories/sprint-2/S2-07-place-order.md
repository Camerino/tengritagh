# S2-07 Place Order Server Action

## User Story

As a customer, I want my order to be securely saved when I tap "Place Order", so that the restaurant receives my order and I get a confirmation.

## Description

Implement the `placeOrder` server action that validates the incoming order data with zod, checks the idempotency key to prevent duplicate orders, saves the order and order items to SQLite, creates an initial `orderStatusEvent`, and returns the order ID for redirect to the confirmation page. This is the critical backend logic for order submission.

## Feature File

```gherkin
Feature: Place Order Server Action
  As a customer
  I want my order to be securely saved when I tap "Place Order"
  So that the restaurant receives my order and I get a confirmation

  # --- Successful Order ---

  Scenario: Valid order is placed successfully
    Given valid order data with customerName "John Doe", customerPhone "2125551234", pickupTime, and at least 1 item
    When I call the placeOrder server action
    Then it returns { success: true, orderId: "<nanoid>", orderNumber: <number> }

  Scenario: Order is saved to the database
    Given I place a valid order
    When I query the orders table
    Then a new order exists with status "received" and cloverSyncStatus "pending"

  Scenario: Order items are saved with denormalized data
    Given I place an order with "Lamb Laghman" (quantity 2) and "Uyghur Polo" (quantity 1)
    When I query the orderItems table for this order
    Then 2 order items exist with denormalized name and priceCents from the menu at time of order

  Scenario: Order status event is created
    Given I place a valid order
    When I query the orderStatusEvents table for this order
    Then an event exists with status "received" and source "web"

  Scenario: Subtotal is calculated from current menu prices
    Given I place an order with 2x "Lamb Laghman" ($15.95) and 1x "Uyghur Polo" ($14.95)
    When I check the order record
    Then subtotalCents is 4685

  Scenario: Kitchen note is saved
    Given I place an order with kitchenNote "extra spicy"
    When I check the order record
    Then kitchenNote is "extra spicy"

  Scenario: Clover sync status is pending
    Given I place a valid order
    When I check the order record
    Then cloverSyncStatus is "pending"

  # --- Order Number ---

  Scenario: First order starts at 1001
    Given no orders exist in the database
    When I place the first order
    Then orderNumber is 1001

  Scenario: Order numbers are sequential
    Given an order exists with orderNumber 1041
    When I place a new order
    Then orderNumber is 1042

  Scenario: Order number generation is atomic
    Given concurrent order submissions
    When both orders complete
    Then each has a unique sequential orderNumber with no gaps

  # --- Validation ---

  Scenario: Missing customer name is rejected
    Given order data without customerName
    When I call placeOrder
    Then it returns { success: false } with an error for the name field

  Scenario: Name too short is rejected
    Given order data with customerName "A"
    When I call placeOrder
    Then it returns a validation error "Name must be at least 2 characters"

  Scenario: Invalid phone format is rejected
    Given order data with customerPhone "123"
    When I call placeOrder
    Then it returns a validation error for the phone field

  Scenario: Invalid email format is rejected
    Given order data with customerEmail "bad"
    When I call placeOrder
    Then it returns a validation error for the email field

  Scenario: Empty items array is rejected
    Given order data with an empty items array
    When I call placeOrder
    Then it returns a validation error "At least one item required"

  Scenario: Nonexistent menu item is rejected
    Given order data with a menuItemId that does not exist in the database
    When I call placeOrder
    Then it returns an error "Item not found"

  Scenario: Unavailable menu item is rejected
    Given order data with a menuItemId where isAvailable is false
    When I call placeOrder
    Then it returns an error "Item is currently unavailable"

  Scenario: Validation returns structured field errors
    Given order data with multiple invalid fields
    When I call placeOrder
    Then it returns { success: false, errors: Record<string, string[]> }
    And errors are keyed by field name

  # --- Idempotency ---

  Scenario: First submission with idempotency key creates order
    Given order data with idempotencyKey "uuid-abc-123"
    When I call placeOrder
    Then a new order is created and orderId is returned

  Scenario: Duplicate submission with same idempotency key returns existing order
    Given an order was already created with idempotencyKey "uuid-abc-123"
    When I call placeOrder with the same idempotencyKey
    Then the same orderId is returned
    And no duplicate order is created

  Scenario: Idempotency key is stored on order record
    Given I place an order with idempotencyKey "uuid-abc-123"
    When I inspect the order record
    Then the idempotencyKey field is "uuid-abc-123"

  # --- Transaction Safety ---

  Scenario: Order creation is atomic
    Given a failure occurs during order item insertion
    When the transaction rolls back
    Then no partial data exists (no order without items)

  Scenario: Denormalized prices survive menu price changes
    Given I place an order for "Lamb Laghman" at $15.95
    And the menu price later changes to $17.95
    When I check the orderItems for the original order
    Then priceCents is still 1595 (the price at time of order)

  # --- Input Validation Schema ---

  Scenario Outline: Zod schema validates field "<field>"
    Given order data with <field> set to <value>
    When I call placeOrder
    Then validation <result>

    Examples:
      | field         | value                  | result                    |
      | customerName  | "Jo"                   | passes                    |
      | customerName  | ""                     | fails with required error |
      | customerPhone | "2125551234"           | passes                    |
      | customerPhone | "abc"                  | fails with format error   |
      | customerEmail | "john@example.com"     | passes                    |
      | customerEmail | ""                     | passes (optional)         |
      | kitchenNote   | "mild please"          | passes                    |
      | kitchenNote   | a 501-character string | fails with length error   |
```

## Technical Notes

- Use Next.js `"use server"` directive for the server action
- Zod schema should be defined separately and also exported for client-side pre-validation
- SubtotalCents: look up each item's current price from `menuItems` table, multiply by quantity, sum all
- OrderNumber: use `SELECT MAX(orderNumber) FROM orders` + 1, starting at 1001; wrap in transaction for atomicity
- IdempotencyKey: stored as a column on the `orders` table; check for existing key before INSERT
- Transaction: use Drizzle's transaction API to ensure order + orderItems + statusEvent are atomic
- After successful save, the Clover sync will be triggered asynchronously in Sprint 3; for now, leave cloverSyncStatus as "pending"
- Consider rate limiting: no more than 1 order per phone number per minute (optional, P2)

## Dependencies

- S0-03 (Database Schema -- orders, orderItems, orderStatusEvents tables)
- S2-06 (Checkout Page -- calls this server action)

## Priority

P0

## Story Points

8
