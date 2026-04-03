Feature: Clover Sync Must Succeed Before Order Confirmation
  As a customer placing a pickup order
  I want to know my order reached the restaurant's POS
  So that I can be confident my food will be prepared

  Background:
    Given the restaurant website is loaded
    And the store is currently open
    And I have items in my cart
    And I am on the checkout page

  Scenario: Order succeeds when Clover is available
    Given the mock Clover service is running
    When I fill in valid customer information
    And I select ASAP pickup
    And I place the order
    Then I should see "Getting your order through... hang tight!"
    And I should see a loading spinner
    And within 10 seconds I should see the order confirmation page
    And the order should have Clover sync status "synced"

  Scenario: Order succeeds on retry after initial Clover failure
    Given the mock Clover service fails the first 2 requests then succeeds
    When I fill in valid customer information
    And I select ASAP pickup
    And I place the order
    Then I should see "Getting your order through... hang tight!"
    And within 10 seconds I should see the order confirmation page
    And the order should have Clover sync status "synced"

  Scenario: Order fails after all Clover retries exhausted
    Given the mock Clover service is down
    When I fill in valid customer information
    And I select ASAP pickup
    And I place the order
    Then I should see "Getting your order through... hang tight!"
    And after 10 seconds I should see an error message
    And the error message should contain "Oops"
    And the error message should contain the restaurant phone number
    And I should see a "Try Again" button
    And I should see a "Call Restaurant" link
    And the order should have Clover sync status "failed"

  Scenario: Retry button works after Clover failure
    Given the mock Clover service is down
    When I fill in valid customer information
    And I select ASAP pickup
    And I place the order
    And I see the error message
    And the mock Clover service is restored
    And I click "Try Again"
    Then I should see "Getting your order through... hang tight!"
    And within 10 seconds I should see the order confirmation page

  Scenario: Call restaurant link has correct phone number
    Given the mock Clover service is down
    When I fill in valid customer information
    And I select ASAP pickup
    And I place the order
    And I see the error message
    Then the "Call Restaurant" link should have href "tel:+15551234567"

  Scenario: Loading spinner is visible during Clover sync
    Given the mock Clover service has a 3 second delay
    When I fill in valid customer information
    And I select ASAP pickup
    And I place the order
    Then I should see a loading spinner
    And the "Place Order" button should be disabled
    And I should see "Getting your order through... hang tight!"

  Scenario: Order is saved locally even when Clover fails
    Given the mock Clover service is down
    When I fill in valid customer information
    And I select ASAP pickup
    And I place the order
    And I see the error message
    Then the order should exist in the local database
    And the order status in the database should be "received"
    And the Clover sync status should be "failed"

  Scenario Outline: Retry timing follows 2-second intervals
    Given the mock Clover service fails the first <fail_count> requests then succeeds
    When I fill in valid customer information
    And I select ASAP pickup
    And I place the order
    Then the order should succeed after approximately <wait_seconds> seconds

    Examples:
      | fail_count | wait_seconds |
      | 0          | 1            |
      | 1          | 3            |
      | 2          | 5            |
      | 3          | 7            |
      | 4          | 9            |

  Scenario: Support ticket email sent when Clover sync fails
    Given the mock Clover service is down
    When I fill in valid customer information
    And I select ASAP pickup
    And I place the order
    And after 10 seconds I should see an error message
    Then a support ticket email should be queued
    And the email should contain the order number
    And the email should contain the customer name and phone

  Scenario: Mobile viewport shows loading and error states correctly
    Given I am using a "mobile" device
    And the mock Clover service is down
    When I fill in valid customer information
    And I select ASAP pickup
    And I place the order
    Then I should see a loading spinner
    And after 10 seconds I should see an error message
    And the error message should be readable on mobile
    And the "Call Restaurant" link should be tap-friendly
