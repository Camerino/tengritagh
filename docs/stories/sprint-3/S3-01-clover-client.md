# S3-01 Clover API Client Module

## User Story

As a developer, I want a well-structured Clover API client module, so that the application can communicate with the Clover POS system to sync orders for kitchen printing.

## Description

Build a Clover API client module (`src/lib/clover.ts`) that encapsulates all communication with the Clover REST API. The client handles authentication, base URL configuration (sandbox vs production vs mock), request/response typing, and error handling. It exposes methods for creating orders, adding bulk line items, triggering print events, and fetching order status.

## Feature File

```gherkin
Feature: Clover API Client Module
  As a developer
  I want a well-structured Clover API client module
  So that the application can communicate with the Clover POS system to sync orders

  Background:
    Given the Clover client module exists at "src/lib/clover.ts"
    And environment variables CLOVER_API_BASE_URL, CLOVER_MERCHANT_ID, and CLOVER_API_TOKEN are configured

  # --- Configuration ---

  Scenario: Client reads configuration from environment variables
    When the Clover client is initialized
    Then it uses CLOVER_API_BASE_URL for the base URL
    And it uses CLOVER_MERCHANT_ID for the merchant ID
    And it uses CLOVER_API_TOKEN for the authorization token

  Scenario: All requests include Authorization header
    When any Clover API call is made
    Then the request includes "Authorization: Bearer {CLOVER_API_TOKEN}" header

  Scenario Outline: Client works with different base URLs
    Given CLOVER_API_BASE_URL is set to "<url>"
    When I make an API call
    Then the request is sent to "<url>"

    Examples:
      | url                                    |
      | https://api.clover.com                 |
      | https://apisandbox.dev.clover.com      |
      | http://mock-clover:3001                |

  # --- Create Order ---

  Scenario: Create order sends correct request
    When I call createOrder with valid order data
    Then a POST request is sent to "/v3/merchants/{mId}/orders"
    And the response is a CloverOrder object with a generated ID

  # --- Bulk Line Items ---

  Scenario: Add bulk line items sends correct request
    Given an order exists with ID "order-123" on Clover
    When I call addBulkLineItems("order-123", items)
    Then a POST request is sent to "/v3/merchants/{mId}/orders/order-123/bulk_line_items"
    And the response contains line items with generated IDs

  # --- Print Event ---

  Scenario: Trigger print sends correct request
    Given an order exists on Clover
    When I call triggerPrint(orderId)
    Then a POST request is sent to "/v3/merchants/{mId}/print_event"
    And a 200 response is returned

  # --- Get Order ---

  Scenario: Get order retrieves order with line items
    Given an order exists on Clover
    When I call getOrder(orderId)
    Then a GET request is sent to "/v3/merchants/{mId}/orders/{orderId}?expand=lineItems"
    And the response includes the order state and line items

  # --- Response Typing ---

  Scenario: Responses match CloverOrder type
    When I call createOrder and inspect the return value
    Then it matches the CloverOrder TypeScript interface
    And it includes id, state, title, note, createdTime, modifiedTime

  Scenario: CloverLineItem types are defined
    When I inspect the Clover type definitions in "src/types/clover.ts"
    Then CloverLineItem includes id, name, price, unitQty, note

  # --- Error Handling ---

  Scenario: Non-2xx response throws CloverApiError
    Given the Clover API returns a 500 status
    When I make an API call
    Then a CloverApiError is thrown
    And it includes the status code 500
    And it includes the response body
    And it includes the endpoint

  Scenario: 401 Unauthorized throws CloverApiError
    Given the API token is invalid
    When I make an API call
    Then a CloverApiError is thrown with status code 401

  Scenario: Request timeout is enforced
    Given the Clover API takes longer than 10 seconds to respond
    When I make an API call
    Then a timeout error is thrown

  Scenario: Timeout is configurable
    Given the client is configured with a custom timeout of 5 seconds
    When the API takes 6 seconds
    Then a timeout error is thrown

  # --- Logging ---

  Scenario: Requests and responses are logged at debug level
    When I make a Clover API call
    Then the request method and URL are logged
    And the response status is logged
```

## Technical Notes

- Use native `fetch` (available in Node.js 18+) rather than axios to minimize dependencies
- Clover API response types (define based on Clover docs):
  ```typescript
  interface CloverOrder {
    id: string;
    state: string;
    title: string;
    note: string;
    createdTime: number;
    modifiedTime: number;
    lineItems?: { elements: CloverLineItem[] };
  }
  interface CloverLineItem {
    id: string;
    name: string;
    price: number;
    unitQty: number;
    note: string;
  }
  ```
- Base URLs:
  - Production: `https://api.clover.com`
  - Sandbox: `https://apisandbox.dev.clover.com`
  - Mock (Docker): `http://mock-clover:3001`
- Error handling: parse response body for Clover error messages, wrap in `CloverApiError`
- Consider a factory pattern: `createCloverClient(config)` that returns the client object
- All prices in cents (Clover uses cents natively)

## Dependencies

- S0-01 (Project Setup)
- S0-05 (Docker Setup -- mock Clover server for testing)

## Priority

P0

## Story Points

5
