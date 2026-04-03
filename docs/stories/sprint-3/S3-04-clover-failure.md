# S3-04 Clover Failure Handling

## User Story

As the restaurant owner, I want the system to handle Clover API failures gracefully with retries, so that temporary network issues do not cause lost orders.

## Description

Implement retry logic for the Clover sync process and robust failure handling. When the Clover API is unreachable or returns errors, the system should retry with exponential backoff. If all retries fail, the order is flagged as `cloverSyncStatus: "failed"` for manual attention. The customer experience is never affected by Clover failures.

## Feature File

```gherkin
Feature: Clover Failure Handling
  As the restaurant owner
  I want the system to handle Clover API failures gracefully with retries
  So that temporary network issues do not cause lost orders

  # --- Retry Logic ---

  Scenario: Transient failure is retried and succeeds
    Given the Clover API returns 500 on the first 2 attempts
    And succeeds on the 3rd attempt
    When the sync runs
    Then the order syncs successfully
    And cloverSyncStatus is "synced"

  Scenario: All retries exhausted marks order as failed
    Given the Clover API returns 500 on all 4 attempts (1 initial + 3 retries)
    When the sync completes
    Then cloverSyncStatus is set to "failed"

  Scenario: Exponential backoff timing
    Given the Clover API keeps failing
    When retries are attempted
    Then the delays are approximately 1 second, 2 seconds, and 4 seconds

  Scenario: Maximum of 3 retries
    Given the Clover API keeps failing
    When the sync completes
    Then exactly 3 retry attempts were made after the initial attempt
    And no more retries occur

  # --- Retryable vs Non-Retryable Errors ---

  Scenario Outline: 5xx errors are retryable
    Given the Clover API returns <status_code>
    When the sync encounters the error
    Then it retries the request

    Examples:
      | status_code |
      | 500         |
      | 502         |
      | 503         |

  Scenario: Network timeout is retryable
    Given the Clover API times out
    When the sync encounters the timeout
    Then it retries the request

  Scenario: Connection refused is retryable
    Given the Clover API is unreachable
    When the sync encounters connection refused
    Then it retries the request

  Scenario: 429 Too Many Requests is retryable
    Given the Clover API returns 429
    When the sync encounters the error
    Then it retries the request

  Scenario: 400 Bad Request is NOT retried
    Given the Clover API returns 400
    When the sync encounters the error
    Then it immediately marks the sync as "failed" without retrying

  Scenario Outline: 4xx errors (except 429) are NOT retried
    Given the Clover API returns <status_code>
    When the sync encounters the error
    Then it does not retry

    Examples:
      | status_code |
      | 400         |
      | 403         |
      | 404         |
      | 422         |

  # --- Sync Status Updates ---

  Scenario: Status is "retrying" during retry attempts
    Given the Clover API fails and a retry is pending
    When I check the order record during the retry wait
    Then cloverSyncStatus is "retrying"

  # --- Partial Failure ---

  Scenario: Order created but line items fail preserves cloverOrderId
    Given the Clover order creation succeeds with cloverOrderId "clv-abc-123"
    And the bulk line items call fails
    When the sync fails
    Then cloverOrderId "clv-abc-123" is saved on the order
    And cloverSyncStatus is "failed"

  # --- Customer Impact ---

  Scenario: Customer confirmation unaffected by failures
    Given the Clover API is completely down
    When a customer places an order
    Then the customer sees the confirmation page normally
    And the order is saved in SQLite

  Scenario: New orders can be placed during Clover outage
    Given the Clover API is completely down
    And a previous order has cloverSyncStatus "failed"
    When another customer places a new order
    Then the new order is saved and confirmed normally

  # --- Logging ---

  Scenario: Each retry attempt is logged
    Given the Clover API fails and retries occur
    When I check the application logs
    Then each retry is logged at warning level with attempt number and error message

  Scenario: Final failure is logged with details
    Given all retries are exhausted
    When I check the application logs
    Then an error is logged with: order ID, order number, error message, number of retries attempted, and timestamp

  # --- Health Monitoring ---

  Scenario: Health endpoint reports failed sync count
    Given 2 orders have cloverSyncStatus "failed" in the last 24 hours
    When I query GET /api/health
    Then the response includes failedCloverSyncs with value 2
```

## Technical Notes

- Exponential backoff implementation:
  ```typescript
  async function withRetry<T>(fn: () => Promise<T>, maxRetries = 3): Promise<T> {
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await fn();
      } catch (error) {
        if (attempt === maxRetries || !isRetryable(error)) throw error;
        await sleep(Math.pow(2, attempt) * 1000);
      }
    }
  }
  ```
- Retryable check: inspect the error type and HTTP status code
- The retry wraps the entire 3-step sync (create order -> add items -> print), not each step individually. If step 1 succeeds but step 2 fails, retry from step 2 (not recreate the order)
- Idempotency concern: Clover order creation is NOT idempotent; if step 1 succeeds and step 2 fails, save the cloverOrderId before retrying step 2
- Consider: a manual retry mechanism (API endpoint or script) that re-attempts sync for failed orders
- Logging: use `console.error` / `console.warn` with structured data (JSON) for log aggregation
- Health endpoint: `GET /api/health` already exists from S0-05; extend it to include `failedCloverSyncs` count

## Dependencies

- S3-02 (Order-to-Clover Sync -- the sync flow to wrap with retries)
- S3-01 (Clover Client -- API calls that may fail)

## Priority

P0

## Story Points

5
