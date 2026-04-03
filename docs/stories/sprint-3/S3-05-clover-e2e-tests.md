# S3-05 Clover Integration E2E Tests

## User Story

As a developer, I want end-to-end tests that verify the full order-to-Clover flow against the mock Clover server in Docker, so that I can be confident the integration works before connecting to real Clover.

## Description

Write Playwright E2E tests that run against the full Docker environment (app + mock Clover) to verify the complete integration: placing an order through the UI, verifying the mock Clover received the order with correct data, simulating status changes on mock Clover, and verifying the UI reflects those changes. Also test failure scenarios (mock returns errors) and edge cases.

## Feature File

```gherkin
Feature: Clover Integration E2E Tests
  As a developer
  I want end-to-end tests verifying the full order-to-Clover flow
  So that I can be confident the integration works before connecting to real Clover

  Background:
    Given the Docker environment is running (app + mock-clover)

  # --- Full Flow ---

  Scenario: Order placed through UI appears on mock Clover
    When I place an order through the full UI flow
    Then the mock Clover received a POST to create an order
    And the order title is "Online Pickup #[orderNumber]"
    And the order note contains the customer name, phone, and pickup time

  Scenario: Line items are sent to Clover correctly
    When I place an order with 3 items
    Then the mock Clover received bulk_line_items with 3 items
    And each item has the correct English name, price in cents, and quantity

  Scenario: Print event is triggered after order sync
    When I place an order and the sync completes
    Then the mock Clover received a print_event request for the order

  Scenario: CloverSyncStatus is synced after successful flow
    When I place an order and the sync completes
    Then the order in SQLite has cloverSyncStatus "synced"
    And cloverOrderId is populated with the Clover ID

  # --- Status Changes ---

  Scenario: Preparing status reflected on confirmation page
    Given I have placed an order
    When I use mock Clover PUT to change the order status to "preparing"
    And I wait for the confirmation page poll
    Then the status tracker shows "Preparing" as active

  Scenario: Ready status triggers banner on confirmation page
    Given I have placed an order
    When I use mock Clover PUT to change the order status to "ready"
    And I wait for the confirmation page poll
    Then a "Ready for Pickup!" banner appears

  Scenario: Status transitions are logged in audit trail
    Given I have placed an order
    When the order goes through received -> preparing -> ready
    Then the orderStatusEvents table has entries for each transition with correct sources

  # --- Failure Scenarios ---

  Scenario: Clover returns 500 - customer still gets confirmation
    Given the mock Clover is configured to return 500 errors
    When I place an order through the UI
    Then the customer sees the confirmation page normally
    And cloverSyncStatus in SQLite is "failed"

  Scenario: Clover times out - customer still gets confirmation
    Given the mock Clover is configured with a 15-second delay (exceeding timeout)
    When I place an order through the UI
    Then the customer sees the confirmation page normally
    And cloverSyncStatus is "failed" after retries

  Scenario: Partial failure - order created but line items fail
    Given the mock Clover succeeds for order creation but fails for bulk_line_items
    When I place an order
    Then cloverOrderId is saved in SQLite
    And cloverSyncStatus is "failed"

  # --- Edge Cases ---

  Scenario: Special instructions appear in Clover line item notes
    When I place an order with an item that has special instructions "no onions"
    Then the corresponding line item on mock Clover has note containing "no onions"

  Scenario: Kitchen note appears in Clover order note
    When I place an order with kitchen note "extra mild"
    Then the mock Clover order note contains "Kitchen Note: extra mild"

  # --- Infrastructure ---

  Scenario: Tests query mock Clover to verify received data
    When I place an order and then GET the order from mock Clover
    Then the returned order matches what was sent

  Scenario: All integration tests pass
    When I run "pnpm test:e2e:integration"
    Then all tests pass with zero failures

  Scenario: Integration test suite completes within time budget
    When I run the full integration test suite
    Then it completes within 120 seconds

  Scenario: Docker environment starts and stops cleanly
    When I run "docker compose up -d" before tests
    Then both services start
    When I run "docker compose down" after tests
    Then all containers stop with no orphans

  # --- Viewport ---

  Scenario: Integration tests verify mobile ordering flow
    Given I am viewing at 375px viewport width
    When I complete the full ordering flow
    Then the order appears on mock Clover correctly

  Scenario: Integration tests verify desktop ordering flow
    Given I am viewing at 1280px viewport width
    When I complete the full ordering flow
    Then the order appears on mock Clover correctly
```

## Technical Notes

- Test setup: `docker compose up -d` before running tests; `docker compose down` after
- To verify mock Clover received data: use the mock's GET endpoint (`GET /v3/merchants/:mId/orders/:orderId`) to inspect the created order and line items
- To simulate status changes: use the mock's PUT endpoint (`PUT /v3/merchants/:mId/orders/:orderId` with `{state: "preparing"}`)
- To simulate failures: the mock Clover should support a "chaos mode" endpoint (e.g., `POST /mock/config` with `{failNext: 3}`) that makes the next N requests fail with 500
- Alternative failure simulation: use a separate mock Clover configuration/profile or environment variable
- Test file location: `tests/e2e/integration/clover-sync.spec.ts`
- For polling tests, use Playwright's `page.waitForResponse` or `expect.poll` to wait for status updates
- Consider using `test.describe.serial` for tests that depend on order state progression (received -> preparing -> ready)
- Database inspection: use a test helper that runs a direct SQLite query to verify `cloverSyncStatus` and `cloverOrderId`

## Dependencies

- S3-01 (Clover Client)
- S3-02 (Order-to-Clover Sync)
- S3-03 (Order Status Tracking)
- S3-04 (Clover Failure Handling)
- S0-05 (Docker Setup -- mock Clover must be running)
- S0-06 (Test Configuration)

## Priority

P0

## Story Points

8
