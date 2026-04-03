Feature: Order Status Tracking
  As a customer waiting for my order
  I want to see live status updates on my confirmation page
  So that I know when my food is being prepared and when it is ready for pickup

  Background:
    Given the restaurant website is loaded
    And the store is currently open
    And the mock Clover server is running

  # --- Status Display ---

  Scenario: Initial status shows Received
    Given I have placed an order
    When I view the order confirmation page
    Then the status tracker should show "Received" as the active step
    And "Preparing" and "Ready" should be greyed out

  Scenario: Status updates to Preparing
    Given I have placed an order
    And the order status is changed to "preparing" on Clover
    When I wait for the next status poll on the confirmation page
    Then the status tracker should show "Preparing" as the active step
    And "Received" should show a checkmark

  Scenario: Status updates to Ready
    Given I have placed an order
    And the order status is changed to "ready" on Clover
    When I wait for the next status poll on the confirmation page
    Then the status tracker should show "Ready" as the active step
    And a "Ready for Pickup!" banner should appear
    And "Received" and "Preparing" should show checkmarks

  Scenario: Cancelled order shows cancelled state
    Given I have placed an order
    And the order status is changed to "cancelled"
    When I wait for the next status poll
    Then the tracker should show "Cancelled"
    And a notice to call the restaurant should be displayed

  # --- Polling ---

  Scenario: Status polls every 30 seconds
    Given I have placed an order
    When I am on the confirmation page
    Then a status check request should be made approximately every 30 seconds

  Scenario: Polling stops at terminal status (ready)
    Given I have placed an order
    And the order status reaches "ready"
    When I wait beyond the next poll interval
    Then no additional status check requests should be made

  Scenario: Polling stops at terminal status (cancelled)
    Given I have placed an order
    And the order status reaches "cancelled"
    When I wait beyond the next poll interval
    Then no additional status check requests should be made

  # --- Status Events Audit Trail ---

  Scenario: Each status transition is logged
    Given I have placed an order
    When the order goes through received, preparing, and ready
    Then the orderStatusEvents table should have 3 entries for this order

  Scenario: Status events record correct source
    Given I have placed an order
    When the status is updated via Clover
    Then the orderStatusEvent source should be "clover"

  Scenario: Initial status event has web source
    Given I have placed an order
    Then the first orderStatusEvent should have status "received" and source "web"

  # --- Confirmation Page Details ---

  Scenario: Order number displayed prominently
    Given I have placed an order
    When I view the confirmation page
    Then I should see the order number in large text

  Scenario: Success message shown
    Given I have placed an order
    When I view the confirmation page
    Then I should see "Your order has been received!"

  Scenario: Items listed on confirmation
    Given I have placed an order with "Lamb Laghman" and "Uyghur Polo"
    When I view the confirmation page
    Then I should see "Lamb Laghman" with its quantity and line total
    And I should see "Uyghur Polo" with its quantity and line total

  Scenario: Pickup time displayed
    Given I have placed an order with ASAP pickup
    When I view the confirmation page
    Then I should see the pickup time in a readable format

  Scenario: Customer info displayed
    Given I have placed an order as "John Doe" with phone "2125551234"
    When I view the confirmation page
    Then I should see "John Doe" and the phone number

  Scenario: Totals displayed on confirmation
    Given I have placed an order
    When I view the confirmation page
    Then I should see the subtotal, tax, and total

  Scenario: Phone link for calling restaurant
    Given I have placed an order
    When I view the "Need to call us?" section
    Then the phone number should be a clickable tel link

  Scenario: Invalid order ID shows not found
    When I navigate to "/order/nonexistent-id"
    Then I should see "Order not found"

  # --- Clover Sync Failure ---

  Scenario: Status page works when Clover sync failed
    Given I have placed an order
    And the Clover sync failed
    When I view the confirmation page
    Then the page should still load correctly
    And the status should show "Received"
