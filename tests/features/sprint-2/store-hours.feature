Feature: Store Hours
  As a customer
  I want to know when the restaurant is open
  So that I can order at the right time and pick up my food

  # --- Open/Closed Logic ---

  Scenario: Order button visible when store is open
    Given the current time is during business hours
    And the restaurant website is loaded
    When I navigate to "/"
    Then the "Order for Pickup" button should be enabled

  Scenario: Order button disabled when store is closed
    Given the current time is outside business hours
    And the restaurant website is loaded
    When I navigate to "/"
    Then the "Order for Pickup" button should be disabled or show "Opens at" with the next opening time

  Scenario: Store closed on closed day
    Given today is a day the restaurant is closed
    And the restaurant website is loaded
    When I navigate to "/"
    Then the open/closed badge should show "Closed"

  Scenario: Store open during business hours
    Given today is a regular business day
    And the current time is within operating hours
    And the restaurant website is loaded
    When I navigate to "/"
    Then the open/closed badge should show "Open"

  Scenario: Store treated as closed 30 minutes before closing
    Given the restaurant closes at 10:00 PM
    And the current time is 9:35 PM
    And the restaurant website is loaded
    When I check the store open status
    Then the store should be considered closed for new orders

  Scenario: Store open just before 30-minute cutoff
    Given the restaurant closes at 10:00 PM
    And the current time is 9:25 PM
    And the restaurant website is loaded
    When I check the store open status
    Then the store should be considered open for new orders

  # --- Manual Override ---

  Scenario: Manual override forces store closed during business hours
    Given siteConfig storeOpen is set to "false"
    And the current time is during business hours
    When I navigate to "/"
    Then the store should be treated as closed
    And "Add to Cart" buttons should be disabled on the menu page

  Scenario: Manual override forces store open on closed day
    Given siteConfig storeOpen is set to "true"
    And today is normally a closed day
    When I navigate to "/"
    Then the store should be treated as open

  # --- Pickup Time Validation ---

  Scenario: Cannot select pickup time outside business hours
    Given the store is currently open
    And I am on the checkout page
    When I view the pickup time selector
    Then no time slots outside business hours should be available

  Scenario: Last available pickup slot is before closing time
    Given the store is currently open
    And I am on the checkout page
    When I view the pickup time selector
    Then the last available slot should be at least 30 minutes before closing

  Scenario: ASAP time accounts for estimated wait
    Given the store is currently open
    And the estimated wait is 20 minutes
    And I am on the checkout page
    When I view the ASAP option
    Then it should show "ASAP (~20 min)" with an estimated ready time

  Scenario: Time slots in 15-minute increments
    Given the store is currently open
    And I am on the checkout page
    When I view the scheduled time slots
    Then the slots should be in 15-minute increments

  Scenario: Expired pickup time rejected by server
    Given the store is currently open
    And I am on the checkout page
    And I have been on the page for a long time
    When I submit an order with a pickup time that has now passed
    Then the server should reject the order with "This pickup time is no longer available"

  Scenario: Time slot list auto-refreshes
    Given I am on the checkout page
    When 60 seconds have passed
    Then the time slot list should update
    And expired slots should be removed

  # --- Open/Closed Badge ---

  Scenario: Open badge on homepage location strip
    Given the store is currently open
    When I navigate to "/"
    And I scroll to the location strip
    Then the badge should show "Open" in green

  Scenario: Closed badge on homepage location strip
    Given the store is currently closed
    When I navigate to "/"
    And I scroll to the location strip
    Then the badge should show "Closed" in red

  Scenario: Open/closed badge on location page
    Given the store is currently open
    When I navigate to "/location"
    Then the open/closed badge should show "Open"

  # --- Timezone ---

  Scenario: All time calculations use Eastern Time
    Given the server is in any timezone
    When I check the store open/closed status
    Then the calculation should use America/New_York timezone
