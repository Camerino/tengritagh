Feature: Clover Failure Handling
  As a restaurant owner
  I want the system to handle Clover API failures gracefully with retries
  So that temporary network issues do not cause lost orders

  Background:
    Given the restaurant website is loaded
    And the store is currently open
    And the mock Clover server is running

  # --- Retry Logic ---

  Scenario: Retry on 500 error succeeds
    Given the mock Clover server returns 500 for the first 2 requests then succeeds
    And I have items in my cart
    When I place the order
    Then the Clover sync should succeed on the 3rd attempt
    And the cloverSyncStatus should be "synced"

  Scenario: All retries exhausted marks order as failed
    Given the mock Clover server returns 500 for all requests
    And I have items in my cart
    When I place the order
    Then the sync should be attempted 4 times (initial + 3 retries)
    And the cloverSyncStatus should be "failed"

  Scenario: No retry on 400 client error
    Given the mock Clover server returns 400
    And I have items in my cart
    When I place the order
    Then the sync should fail immediately without retries
    And the cloverSyncStatus should be "failed"

  Scenario: Retry on timeout
    Given the mock Clover server has a 15-second delay on the first request
    And the client timeout is 10 seconds
    And I have items in my cart
    When I place the order
    Then the sync should retry after the timeout
    And eventually succeed if the next attempt responds normally

  Scenario: Retry on 429 rate limit
    Given the mock Clover server returns 429 on the first request then succeeds
    And I have items in my cart
    When I place the order
    Then the sync should retry
    And the cloverSyncStatus should be "synced"

  # --- Customer Experience ---

  Scenario: Customer gets confirmation regardless of Clover failure
    Given the mock Clover server is completely down
    And I have items in my cart
    When I place the order
    Then I should see the order confirmation page
    And the order should be saved locally with status "received"

  Scenario: New orders not blocked by Clover failure
    Given the mock Clover server is down
    And a previous order failed to sync
    When I add items and place a new order
    Then the new order should be confirmed successfully

  # --- Partial Failure ---

  Scenario: Order created on Clover but line items fail
    Given the mock Clover server succeeds for order creation
    But fails for bulk_line_items
    And I have items in my cart
    When I place the order
    Then the cloverOrderId should be saved
    And the cloverSyncStatus should be "failed"

  # --- Logging ---

  Scenario: Each retry attempt is logged
    Given the mock Clover server returns 500 for 2 requests then succeeds
    And I have items in my cart
    When I place the order
    Then each retry attempt should be logged with the attempt number and error

  Scenario: Failed sync is logged with order details
    Given the mock Clover server returns 500 for all requests
    And I have items in my cart
    When I place the order
    Then an error log should include the order ID, order number, error message, and retry count

  # --- Exponential Backoff ---

  Scenario: Retries use exponential backoff
    Given the mock Clover server returns 500 for all requests
    And I have items in my cart
    When I place the order
    Then the retry delays should be approximately 1s, 2s, and 4s

  # --- Health Check ---

  Scenario: Health endpoint reports failed sync count
    Given there are orders with cloverSyncStatus "failed" in the last 24 hours
    When I query the health check endpoint
    Then the response should include a failedCloverSyncs count greater than 0
