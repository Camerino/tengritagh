# S4-01 Clover Sync Must Succeed Before Order Confirmation

## User Story

As a customer placing a pickup order, I want to know that my order was successfully received by the restaurant's POS system, so that I can be confident my food will be prepared.

## Description

Currently, the order is confirmed immediately (fire-and-forget) regardless of whether the Clover POS sync succeeds. This gives customers false confidence — they see "Order Confirmed!" but the restaurant may never receive the order if Clover is down.

**Change**: Make the Clover sync **blocking** — the UI waits for Clover to succeed before showing confirmation. If Clover fails after retries, show an error message with instructions to call the restaurant.

### Behavior Change

- **Before**: Place order → instant confirmation → Clover sync in background (may fail silently)
- **After**: Place order → loading spinner "Getting your order through... hang tight!" → Clover succeeds → confirmation OR Clover fails → error message with call-to-action

### Retry Logic

- After order is saved to SQLite, attempt Clover sync
- Retry every **2 seconds** for a maximum of **10 seconds** (5 attempts)
- If all attempts fail, return error to the user

### UI States

1. **Submitting**: "Placing your order..." (existing)
2. **Syncing to POS**: "Getting your order through... hang tight!" (NEW — shown after SQLite save, during Clover sync)
3. **Success**: Redirect to order confirmation page (existing)
4. **Failure**: "Oops... something happened. We'll fix it shortly. Please try again or call the restaurant at (555) 123-4567 to place your order while we work on the fix."

## Feature File

```gherkin
Feature: Clover Sync Must Succeed Before Order Confirmation
  As a customer placing a pickup order
  I want to know my order reached the restaurant's POS
  So that I can be confident my food will be prepared

  Background:
    Given the restaurant website is loaded
    And the store is currently open
    And I have items in my cart
    And I am on the checkout page

  Scenario: Order succeeds when Clover is available
    Given the mock Clover service is running
    When I fill in valid customer information
    And I select ASAP pickup
    And I place the order
    Then I should see "Getting your order through... hang tight!"
    And I should see a loading spinner
    And within 10 seconds I should see the order confirmation page
    And the order should have Clover sync status "synced"

  Scenario: Order succeeds on retry after initial Clover failure
    Given the mock Clover service fails the first 2 requests then succeeds
    When I fill in valid customer information
    And I select ASAP pickup
    And I place the order
    Then I should see "Getting your order through... hang tight!"
    And within 10 seconds I should see the order confirmation page
    And the order should have Clover sync status "synced"

  Scenario: Order fails after all Clover retries exhausted
    Given the mock Clover service is down
    When I fill in valid customer information
    And I select ASAP pickup
    And I place the order
    Then I should see "Getting your order through... hang tight!"
    And after 10 seconds I should see an error message
    And the error message should contain "Oops"
    And the error message should contain the restaurant phone number
    And I should see a "Try Again" button
    And I should see a "Call Restaurant" link
    And the order should have Clover sync status "failed"

  Scenario: Retry button works after Clover failure
    Given the mock Clover service is down
    When I place the order
    And I see the error message
    And the mock Clover service is restored
    And I click "Try Again"
    Then I should see "Getting your order through... hang tight!"
    And within 10 seconds I should see the order confirmation page

  Scenario: Call restaurant link has correct phone number
    Given the mock Clover service is down
    When I place the order
    And I see the error message
    Then the "Call Restaurant" link should have href "tel:+15551234567"

  Scenario: Loading spinner is visible during Clover sync
    Given the mock Clover service has a 3 second delay
    When I fill in valid customer information
    And I place the order
    Then I should see a loading spinner
    And the "Place Order" button should be disabled
    And I should see "Getting your order through... hang tight!"

  Scenario: Order is saved locally even when Clover fails
    Given the mock Clover service is down
    When I place the order
    And I see the error message
    Then the order should exist in the local database
    And the order status should be "received"
    And the Clover sync status should be "failed"

  Scenario Outline: Retry timing follows 2-second intervals
    Given the mock Clover service fails <fail_count> times then succeeds
    When I place the order
    Then the order should succeed after approximately <wait_seconds> seconds

    Examples:
      | fail_count | wait_seconds |
      | 0          | 1            |
      | 1          | 3            |
      | 2          | 5            |
      | 3          | 7            |
      | 4          | 9            |

  Scenario: Support ticket email sent when Clover sync fails
    Given the mock Clover service is down
    When I fill in valid customer information
    And I place the order
    And all Clover retries are exhausted
    Then a support ticket email should be queued
    And the email should contain the order number
    And the email should contain the customer name and phone
    And the email should contain the items ordered

  Scenario: Mobile viewport shows loading and error states correctly
    Given I am using a "mobile" device
    And the mock Clover service is down
    When I place the order
    Then I should see the loading spinner centered on screen
    And after the timeout I should see the error message
    And the error message should be readable on mobile
    And the "Call Restaurant" link should be tap-friendly
```

### Email Support Ticket on Failure

When Clover sync fails after all retries:

- Send an automated email to the support email (configurable via `SUPPORT_EMAIL` env var)
- Email contains: order number, customer name, phone, items ordered, timestamp, error details
- Use a simple `fetch` to an email API (e.g., Resend, or just log for now with a TODO)
- This ensures the restaurant knows about failed orders even if the customer doesn't call

## Technical Notes

- Modify `placeOrder` server action to return Clover sync result (not fire-and-forget)
- On Clover failure, trigger `sendFailedOrderNotification(order)` to email support
- New retry logic: 2s interval, max 5 attempts (10s total), replaces current exponential backoff for the initial sync
- Keep the existing exponential backoff for background retry of failed orders (separate concern)
- Add new UI states to checkout page: syncing spinner, error with retry/call CTA
- The order is ALWAYS saved to SQLite first (even if Clover fails) — idempotency key prevents duplicates on retry
- Mock Clover needs new admin endpoints: `PUT /__admin/config` to set failNext count and delay

## Dependencies

- S3-01 (Clover client)
- S3-02 (Order-to-Clover sync)
- S2-06 (Checkout page)
- S2-07 (Place order action)

## Priority

P0 (must-have) — customers currently get false order confirmations

## Story Points

8
