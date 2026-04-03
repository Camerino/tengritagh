# S0-05 Docker Setup

## User Story

As a developer, I want a Docker-based development environment with the app and a mock Clover server, so that I can develop and test the full ordering flow locally without needing access to the real Clover API.

## Description

Create a Dockerfile for the Next.js application, build a mock Clover Express server that mimics the Clover POS API, and wire them together with docker-compose.yml. The mock Clover server uses an in-memory store and implements the three critical endpoints (create order, bulk line items, print event) plus status query and update endpoints for testing.

## Feature File

```gherkin
Feature: Docker Setup
  As a developer
  I want a Docker-based development environment with a mock Clover server
  So that I can develop and test the full ordering flow locally

  # --- Docker Compose ---

  Scenario: Docker compose starts both services
    Given the project root has a docker-compose.yml
    When I run "docker compose up -d"
    Then both "app" and "mock-clover" services start without errors

  Scenario: App service is accessible
    Given docker compose services are running
    When I visit http://localhost:3000
    Then the Next.js app responds

  Scenario: Mock Clover service is accessible
    Given docker compose services are running
    When I send a request to http://localhost:3001
    Then the mock Clover server responds

  Scenario: App connects to mock Clover via Docker network
    Given docker compose services are running
    And the app service has CLOVER_API_BASE_URL=http://mock-clover:3001
    When the app makes a Clover API call
    Then the request reaches the mock-clover service

  Scenario: Docker compose stops cleanly
    Given docker compose services are running
    When I run "docker compose down"
    Then all services stop cleanly
    And no orphaned containers remain

  # --- Dockerfile ---

  Scenario: Dockerfile exists for the app
    Given the project root directory
    When I check for "Dockerfile"
    Then the file exists
    And it uses a multi-stage build (deps, build, runtime)

  Scenario: Mock Clover has its own Dockerfile and source
    Given the project root directory
    When I check the "mock-clover/" directory
    Then it contains a Dockerfile, package.json, and TypeScript source files

  # --- Mock Clover API Endpoints ---

  Scenario: Create order endpoint
    Given the mock Clover server is running
    And I include a valid Authorization Bearer header
    When I POST to "/v3/merchants/test/orders" with a valid order body
    Then I receive a 200 response with an order object containing a generated ID

  Scenario: Bulk line items endpoint
    Given the mock Clover server is running
    And an order has been created with ID "order-123"
    When I POST to "/v3/merchants/test/orders/order-123/bulk_line_items" with line items
    Then I receive a 200 response with line items containing generated IDs

  Scenario: Print event endpoint
    Given the mock Clover server is running
    When I POST to "/v3/merchants/test/print_event" with an order reference
    Then I receive a 200 response
    And the print request is logged to stdout

  Scenario: Get order endpoint
    Given the mock Clover server is running
    And an order has been created
    When I GET "/v3/merchants/test/orders/{orderId}"
    Then I receive the order with its current state and line items

  Scenario: Update order status endpoint
    Given the mock Clover server is running
    And an order has been created
    When I PUT "/v3/merchants/test/orders/{orderId}" with {"state": "preparing"}
    Then the order state is updated
    And a subsequent GET returns the order with state "preparing"

  Scenario: Get order types endpoint
    Given the mock Clover server is running
    When I GET "/v3/merchants/test/order_types"
    Then I receive mock order types

  # --- Auth & Response Shape ---

  Scenario: Authorization header is required
    Given the mock Clover server is running
    When I send a request without an Authorization header
    Then I receive a 401 Unauthorized response

  Scenario: Any Bearer token is accepted
    Given the mock Clover server is running
    When I send a request with "Authorization: Bearer any-token-value"
    Then the request is accepted

  Scenario: Response shapes match Clover API format
    Given the mock Clover server is running
    When I create an order and retrieve it
    Then the response includes realistic Clover fields: id, createdTime, elements array

  # --- Logging & In-Memory Store ---

  Scenario: All requests are logged to stdout
    Given the mock Clover server is running
    When I send any request to the mock server
    Then the request method, path, and body are logged to stdout

  Scenario: Mock Clover uses in-memory storage
    Given the mock Clover server is running
    When I create an order and then restart the mock-clover service
    Then the previously created order no longer exists

  # --- Configurable Delay ---

  Scenario: Mock supports configurable delay
    Given the mock Clover server has MOCK_DELAY_MS=500
    When I send a request
    Then the response is delayed by approximately 500 milliseconds
```

## Technical Notes

- Mock Clover file structure:
  ```
  mock-clover/
    src/
      server.ts          # Express app entry point
      routes/orders.ts   # Order CRUD endpoints
      routes/print.ts    # Print event endpoint
      store.ts           # In-memory order store
      types.ts           # Clover API response types
    Dockerfile
    package.json
    tsconfig.json
  ```
- Use Express.js for the mock server
- In-memory store: a Map of orderId to order objects
- The app Dockerfile should use multi-stage build (deps, build, runtime) for smaller image size
- Mock Clover should support a configurable delay via `MOCK_DELAY_MS` env var (default 0) to simulate network latency
- Docker networking: services communicate via Docker's internal DNS (service name as hostname)

## Dependencies

- S0-01 (Project Setup)

## Priority

P1

## Story Points

8
