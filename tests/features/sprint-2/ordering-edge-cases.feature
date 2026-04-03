Feature: Ordering Edge Cases
  As a customer
  I want the ordering system to handle edge cases gracefully
  So that I have a smooth experience even in unusual situations

  Background:
    Given the restaurant website is loaded

  # --- Store Closed ---

  Scenario: Add to Cart disabled when store is closed
    Given the store is currently closed
    When I navigate to "/menu"
    Then all "Add to Cart" buttons should be disabled
    And I should see a message indicating the store is closed

  Scenario: Homepage CTA disabled when store is closed
    Given the store is currently closed
    When I navigate to "/"
    Then the "Order for Pickup" button should be disabled or show the next opening time

  Scenario: Checkout blocked when store is closed
    Given the store is currently closed
    And I have items in my cart from a previous session
    When I navigate to "/checkout"
    Then I should see a message "We're currently closed"
    And I should not be able to submit the order

  # --- Double Submit ---

  Scenario: Double-click Place Order only creates one order
    Given the store is currently open
    And I have items in my cart
    And I am on the checkout page with valid information filled in
    When I rapidly click "Place Order" twice
    Then only one order should be created in the database
    And I should see one confirmation page

  Scenario: Place Order button disabled during submission
    Given the store is currently open
    And I have items in my cart
    And I am on the checkout page with valid information filled in
    When I tap "Place Order"
    Then the button should immediately show a loading state
    And the button should be disabled

  # --- Invalid Inputs ---

  Scenario: Submit with missing required fields
    Given the store is currently open
    And I have items in my cart
    And I navigate to "/checkout"
    When I tap "Place Order" without filling in any fields
    Then I should see validation errors for name and phone fields
    And the order should not be submitted

  Scenario: Invalid phone number format
    Given I am on the checkout page
    When I enter "abc" as the phone number
    And I blur the phone field
    Then I should see a phone validation error

  Scenario: Invalid email format
    Given I am on the checkout page
    When I enter "not@valid" as the email
    And I blur the email field
    Then I should see an email validation error

  # --- Large Order ---

  Scenario: Large order with 20 different items
    Given the store is currently open
    And I am on the menu page
    When I add 20 different items to the cart
    And I proceed through checkout with valid information
    And I place the order
    Then all 20 items should appear on the confirmation page
    And the totals should be calculated correctly

  Scenario: Single item with quantity 50
    Given the store is currently open
    And I am on the menu page
    When I open the detail modal for "Lamb Laghman"
    And I set the quantity to 50
    And I add it to the cart
    And I navigate to the cart page
    Then the quantity should show 50
    And the line total should be correct for 50 units

  # --- Last Slot Before Close ---

  Scenario: Last available pickup slot is before closing time
    Given the store is currently open
    And it is approaching closing time
    When I navigate to "/checkout"
    And I view the pickup time selector
    Then the last available time slot should be at least 30 minutes before closing

  Scenario: ASAP time accounts for estimated wait
    Given the store is currently open
    When I navigate to "/checkout"
    And I view the ASAP option
    Then the estimated ready time should be current time plus the estimated wait minutes

  # --- Cart Persistence ---

  Scenario: Cart survives page navigation
    Given the store is currently open
    And I have items in my cart
    When I navigate to "/about"
    And I navigate to "/menu"
    And I navigate to "/cart"
    Then the cart should still contain my items

  Scenario: Cart survives page refresh
    Given I have items in my cart
    When I refresh the page
    Then the cart should still contain the same items

  # --- Invalid Order ---

  Scenario: Order with invalid order ID shows not found
    When I navigate to "/order/invalid-id-12345"
    Then I should see an "Order not found" message

  Scenario: Unavailable item cannot be added
    Given a menu item is marked as unavailable
    When I view that item on the menu page
    Then the "Add to Cart" button should be disabled
    And it should show "Unavailable"
