# S3-03 Order Status Tracking

## User Story

As a customer waiting for my order, I want to see live status updates on my confirmation page, so that I know when my food is being prepared and when it is ready for pickup.

## Description

Enhance the order confirmation page with live status tracking that polls the Clover POS for status changes. When restaurant staff update the order status on Clover (received -> preparing -> ready), the change is detected, logged to the `orderStatusEvents` audit trail, and reflected on the customer's confirmation page in real-time via polling.

## Feature File

```gherkin
Feature: Order Status Tracking
  As a customer waiting for my order
  I want to see live status updates on my confirmation page
  So that I know when my food is being prepared and when it is ready for pickup

  Background:
    Given I have placed an order successfully
    And I am on the order confirmation page

  # --- Status Endpoint ---

  Scenario: Status endpoint returns current status
    When the confirmation page calls getOrderStatus(orderId)
    Then it returns the current order status
    And it includes the timestamp of the last status change

  Scenario: Status includes cloverSyncStatus for debugging
    When the status endpoint responds
    Then it includes the cloverSyncStatus field (not shown to the customer)

  # --- Polling ---

  Scenario: Confirmation page polls every 30 seconds
    Given I am on the confirmation page
    When 30 seconds pass
    Then a network request is made to check the order status

  Scenario: Polling stops at terminal status "ready"
    Given the order status reaches "ready"
    When I wait 30 seconds
    Then no further polling requests are made

  Scenario: Polling stops at terminal status "picked_up"
    Given the order status reaches "picked_up"
    When I wait 30 seconds
    Then no further polling requests are made

  Scenario: Polling stops at terminal status "cancelled"
    Given the order status reaches "cancelled"
    When I wait 30 seconds
    Then no further polling requests are made

  # --- Status Transitions ---

  Scenario: Status changes from received to preparing
    Given the order status is "received"
    When the restaurant staff updates the status to "preparing" on Clover
    And the next poll occurs
    Then the status tracker shows "Preparing" as the active step
    And "Received" shows a checkmark

  Scenario: Status changes to ready with prominent indicator
    Given the order status is "preparing"
    When the status changes to "ready"
    And the next poll occurs
    Then the status tracker shows "Ready for Pickup" as active
    And a prominent "Ready for Pickup!" banner appears with the order number in large text
    And a green highlight or animation is visible

  Scenario: Cancelled order shows cancellation notice
    Given the order status changes to "cancelled"
    When the next poll occurs
    Then the tracker shows a "Cancelled" state
    And a notice explains to call the restaurant

  # --- Audit Trail ---

  Scenario: Each status transition is logged
    Given the order transitions through received, preparing, and ready
    When I query the orderStatusEvents table
    Then 3 entries exist for this order

  Scenario: Audit trail records correct sources
    Given the initial status event has source "web"
    When a Clover-driven status change occurs
    Then the new event has source "clover"

  Scenario: Audit trail preserves full history
    Given the order has gone through multiple status changes
    When I query all orderStatusEvents for this order
    Then all historical events are present with timestamps
    And they are in chronological order

  # --- Clover Sync Failure Resilience ---

  Scenario: Status page works when Clover sync failed
    Given the order has cloverSyncStatus "failed"
    When I view the confirmation page
    Then the page still loads correctly
    And it shows the local status (likely "received")

  # --- Responsive ---

  Scenario: Status tracker is readable on mobile
    Given I am viewing at 375px viewport width
    When the status updates to "ready"
    Then the "Ready for Pickup!" banner is prominent and readable

  Scenario: Status tracker displays horizontally on desktop
    Given I am viewing at 1280px viewport width
    When I look at the status tracker
    Then the steps are displayed horizontally with clear indicators

  Scenario Outline: Status page is responsive at <width>px
    Given I am viewing at <width>px viewport width
    When the page renders
    Then the status tracker and all content are visible and readable

    Examples:
      | width |
      | 375   |
      | 768   |
      | 1280  |

  # --- Accessibility ---

  Scenario: Status changes are announced via aria-live
    When the status changes after a poll
    Then the update is announced via an aria-live region

  Scenario: Current step is clearly communicated to screen readers
    When a screen reader reads the status tracker
    Then the current step and its state are announced

  Scenario: Active vs inactive steps meet contrast requirements
    When I measure contrast on the status tracker
    Then active and inactive steps are visually distinguishable
    And all text meets WCAG 2.1 AA contrast ratios
```

## Technical Notes

- Status polling: update the existing 30-second polling from S2-08 to call a server action or API route that checks both local DB and optionally queries Clover
- Clover status mapping: Clover uses order `state` field. Map Clover states to internal statuses:
  - `open` / `created` -> "received"
  - Custom logic or title-based -> "preparing" (staff may use notes or custom fields)
  - `fulfilled` -> "ready"
- Alternatively, the mock Clover PUT endpoint simulates staff changing status; a separate cron/poll on the server detects changes and updates local DB
- Audit trail: every time the status changes (detected via poll or webhook), insert a new `orderStatusEvent` row
- Consider: a server-side background poll that checks Clover for all "active" orders every 30 seconds (rather than client-initiated Clover queries)
- Terminal statuses: when order is "ready", "picked_up", or "cancelled", stop polling to save resources

## Dependencies

- S3-02 (Order-to-Clover Sync -- orders must exist on Clover)
- S2-08 (Order Confirmation Page -- status tracker UI already exists)
- S0-03 (Database Schema -- orderStatusEvents table)

## Priority

P0

## Story Points

5
