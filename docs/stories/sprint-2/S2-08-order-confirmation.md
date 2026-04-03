# S2-08 Order Confirmation Page

## User Story

As a customer who just placed an order, I want to see my order details and pickup time on a confirmation page, so that I know my order was received and when to pick it up.

## Description

Build the order confirmation page (`/order/[id]`) that displays the order number, items ordered, pickup time, customer info, and a visual status tracker (Received > Preparing > Ready). The page auto-refreshes the status every 30 seconds to show real-time progress. In Sprint 2, the status will always show "Received" (Clover sync updates status in Sprint 3).

## Feature File

```gherkin
Feature: Order Confirmation Page
  As a customer who just placed an order
  I want to see my order details and pickup time
  So that I know my order was received and when to pick it up

  Background:
    Given I have placed an order successfully

  # --- Page Load ---

  Scenario: Confirmation page loads after placing order
    When I am redirected to "/order/{orderId}"
    Then the confirmation page renders with the order details

  Scenario: Page has correct title
    Given the order has orderNumber 1042
    When I check the document title
    Then it is "Order #1042 | Tengri Tagh Uyghur Cuisine"

  # --- Order Number & Success Message ---

  Scenario: Order number is prominently displayed
    When I look at the confirmation page
    Then "Order #1042" (or the actual number) is shown in large text

  Scenario: Success message is shown
    When the page loads
    Then a message "Your order has been received!" is visible

  # --- Status Tracker ---

  Scenario: Status tracker shows three steps
    When I look at the status tracker
    Then it displays three steps: Received, Preparing, and Ready

  Scenario: Current status step is highlighted
    Given the order status is "received"
    When I look at the status tracker
    Then the "Received" step is highlighted with a filled circle and accent color

  Scenario: Future steps are greyed out
    Given the order status is "received"
    When I look at the status tracker
    Then "Preparing" and "Ready" steps are greyed out

  Scenario: Completed steps show checkmarks
    Given the order status is "preparing"
    When I look at the status tracker
    Then "Received" shows a checkmark
    And "Preparing" is highlighted as current
    And "Ready" is greyed out

  Scenario: Status auto-refreshes every 30 seconds
    Given I am on the confirmation page
    When 30 seconds pass
    Then a network request is made to check the order status

  Scenario: Status update reflects after polling
    Given the order status changes from "received" to "preparing" in the database
    When the next status poll occurs
    Then the tracker updates to show "Preparing" as the current step

  # --- Order Details ---

  Scenario: Items ordered are listed
    Given the order contains "Lamb Laghman" (qty 2) and "Uyghur Polo" (qty 1)
    When I look at the items list
    Then each item shows its name, quantity, and line total

  Scenario: Pickup time is displayed
    Given the order pickup time is "12:45 PM" today
    When I look at the pickup time
    Then it shows "Today at 12:45 PM"

  Scenario: ASAP pickup time shows estimate
    Given the order was placed with ASAP pickup
    When I look at the pickup time
    Then it shows "ASAP - estimated ~20 min" or a similar readable format

  Scenario: Customer info is displayed
    Given the order was placed by "John Doe" with phone "(212) 555-1234"
    When I look at the customer section
    Then the name "John Doe" and phone "(212) 555-1234" are visible

  Scenario: Totals are displayed
    When I look at the order totals
    Then subtotal, tax, and estimated total are shown

  # --- Contact Section ---

  Scenario: Phone link for calling the restaurant
    When I look at the "Need to call us?" section
    Then the restaurant phone number is displayed as a clickable tel: link

  # --- Error States ---

  Scenario: Invalid order ID shows 404 message
    When I navigate to "/order/invalid-id-xyz"
    Then an "Order not found" message is displayed

  # --- Cart Clearing ---

  Scenario: Cart is cleared after placing an order
    Given I was redirected to the confirmation page after placing an order
    When I navigate to "/cart"
    Then the cart is empty

  # --- Responsive ---

  Scenario: Status tracker works on mobile
    Given I am viewing at 375px viewport width
    When the page renders
    Then the status tracker is visible (horizontal or vertical layout)
    And all content is readable
    And the phone link is tappable

  Scenario: Desktop shows centered content
    Given I am viewing at 1280px viewport width
    When the page renders
    Then the content is centered with a max-width
    And the status tracker is displayed horizontally

  Scenario Outline: Confirmation page is responsive
    Given I am viewing at <width>px viewport width
    When the page renders
    Then all order details are readable
    And no content overflows horizontally

    Examples:
      | width |
      | 375   |
      | 768   |
      | 1280  |

  # --- Accessibility ---

  Scenario: Phone link is keyboard focusable
    When I press Tab through the page
    Then the restaurant phone link is focusable

  Scenario: Status tracker steps have accessible labels
    When a screen reader reads the status tracker
    Then each step's label and current state are announced

  Scenario: Order number is announced as heading
    When a screen reader encounters the order number
    Then it is announced as a heading

  Scenario: Active vs inactive steps are distinguishable
    When I measure visual contrast on the status tracker
    Then active and inactive steps are distinguishable
    And all text meets WCAG 2.1 AA contrast ratios
```

## Technical Notes

- Initial data: Server Component fetches order from SQLite by ID, renders the page with initial data
- Status polling: a `use client` component that calls `getOrderStatus(orderId)` every 30 seconds using `setInterval` + fetch
- Status tracker: a horizontal stepper component showing Received -> Preparing -> Ready with visual states
- Cart clearing: on mount, call `clearCart()` from the cart store (use a `useEffect`)
- For cancelled orders, show a distinct state with a notice
- `getOrderStatus` can be a server action or API route (`GET /api/orders/[id]/status`)
- In Sprint 2, status will always be "received"; Sprint 3 adds Clover-driven status updates

## Dependencies

- S2-07 (Place Order -- creates the order record)
- S2-01 (Cart Store -- clearCart after confirmation)
- S0-03 (Database Schema -- orders, orderItems tables)
- S0-04 (Layout Shell)

## Priority

P0

## Story Points

5
