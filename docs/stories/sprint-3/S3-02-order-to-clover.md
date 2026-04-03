# S3-02 Order-to-Clover Sync

## User Story

As a restaurant owner, I want online orders to automatically appear on my Clover POS and print in the kitchen, so that my staff can prepare orders without manually checking a screen.

## Description

Implement the async order-to-Clover sync flow: after an order is saved to SQLite, an async process maps the internal order to Clover's format, creates the order on Clover, adds line items in bulk, and triggers a print event. The sync runs fire-and-forget (customer already has confirmation). The `cloverSyncStatus` field on the order is updated to reflect sync progress.

## Feature File

```gherkin
Feature: Order-to-Clover Sync
  As a restaurant owner
  I want online orders to automatically appear on my Clover POS and print in the kitchen
  So that my staff can prepare orders without manually checking a screen

  Background:
    Given the mock Clover server is running
    And the Clover client is configured

  # --- Successful Sync Flow ---

  Scenario: Sync is triggered after order is placed
    When a customer places an order via the placeOrder action
    Then the syncOrderToClover function is triggered asynchronously

  Scenario: Clover order is created with correct title
    Given an order is placed with orderNumber 1042
    When the sync completes
    Then a Clover order exists with title "Online Pickup #1042"

  Scenario: Clover order note contains customer details
    Given an order is placed by "John Doe" with phone "(212) 555-1234" and pickup at "12:45 PM"
    When the sync completes
    Then the Clover order note contains "Customer: John Doe"
    And it contains "Phone: (212) 555-1234"
    And it contains "Pickup: 12:45 PM"

  Scenario: Kitchen note is included in Clover order note
    Given an order is placed with kitchenNote "extra spicy please"
    When the sync completes
    Then the Clover order note contains "Kitchen Note: extra spicy please"

  Scenario: Line items are added in bulk
    Given an order contains 3 items: "Lamb Laghman" (qty 2), "Uyghur Polo" (qty 1), "Nan Bread" (qty 3)
    When the sync completes
    Then the Clover order has 3 line items
    And each has the correct English name, price in cents, and unitQty

  Scenario: Special instructions are in line item notes
    Given an order item has specialInstructions "no onions"
    When the sync completes
    Then the corresponding Clover line item note contains "no onions"

  Scenario: Print event is triggered
    Given an order is placed and synced to Clover
    When the sync completes
    Then a print event is triggered at the Clover POS for that order

  Scenario: CloverOrderId is saved on successful sync
    Given the sync completes successfully
    When I query the order in SQLite
    Then the cloverOrderId matches the ID returned by Clover

  Scenario: CloverSyncStatus is set to synced
    Given the sync completes successfully
    When I query the order in SQLite
    Then cloverSyncStatus is "synced"

  Scenario: Order status event is created on sync
    Given the sync completes successfully
    When I query the orderStatusEvents table
    Then an event exists with status "received" and source "clover"

  # --- Fire-and-Forget ---

  Scenario: Customer gets confirmation before sync completes
    When a customer places an order
    Then the customer receives the confirmation page immediately
    And the Clover sync runs in the background

  Scenario: Customer confirmation is unaffected by sync failure
    Given the Clover API is returning 500 errors
    When a customer places an order
    Then the customer still sees the confirmation page with their order details

  # --- Failure Handling ---

  Scenario: Sync failure marks status as failed
    Given the Clover API is returning 500 errors
    When the sync fails after all retry attempts
    Then cloverSyncStatus is set to "failed"

  Scenario: Partial failure saves cloverOrderId
    Given the Clover order creation succeeds but bulk line items fail
    When the sync fails
    Then cloverOrderId is still saved for manual recovery
    And cloverSyncStatus is "failed"

  Scenario: Failed sync does not prevent new orders
    Given the Clover API is down
    When another customer places a new order
    Then the new order is saved and confirmed normally
```

## Technical Notes

- Fire-and-forget pattern: use `Promise.resolve().then(() => syncOrderToClover(orderId))` or `queueMicrotask` after returning the response to the client. Do NOT await the sync in the placeOrder action.
- Alternative: use `waitUntil` if available in the deployment environment (Vercel), or a simple setTimeout(0)
- Sync flow:
  ```
  1. POST /v3/merchants/{mId}/orders -> get cloverOrderId
  2. POST /v3/merchants/{mId}/orders/{cloverOrderId}/bulk_line_items -> add items
  3. POST /v3/merchants/{mId}/print_event -> trigger kitchen print
  4. UPDATE orders SET cloverOrderId, cloverSyncStatus='synced'
  ```
- If step 1 fails, mark as "failed" immediately
- If step 2 or 3 fails after order is created on Clover, still mark as "failed" but save the cloverOrderId for manual recovery
- The Clover order title format: "Online Pickup #1042"
- Consider: menu item names sent to Clover should be the English name (Clover POS displays English)

## Dependencies

- S3-01 (Clover Client -- provides the API methods)
- S2-07 (Place Order -- triggers the sync after order creation)
- S0-03 (Database Schema -- cloverOrderId, cloverSyncStatus fields)

## Priority

P0

## Story Points

8
