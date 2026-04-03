Feature: Clover POS Integration
  As a restaurant owner
  I want online orders to automatically appear on my Clover POS and print in the kitchen
  So that my staff can prepare orders without manually checking a screen

  Background:
    Given the restaurant website is loaded
    And the store is currently open
    And the mock Clover server is running

  # --- Order Sync ---

  Scenario: Order sent to Clover after placement
    Given I have items in my cart
    When I complete the checkout flow and place the order
    Then the order should be sent to Clover asynchronously
    And the cloverSyncStatus should be "synced" in the database

  Scenario: Clover receives correct line items
    Given I have "Lamb Laghman" with quantity 2 and "Uyghur Polo" with quantity 1 in my cart
    When I place the order
    Then the mock Clover should receive a bulk_line_items request
    And the line items should include "Lamb Laghman" with correct price and quantity 2
    And the line items should include "Uyghur Polo" with correct price and quantity 1

  Scenario: Clover order has correct title and note
    Given I place an order as "John Doe" with phone "2125551234"
    When the order syncs to Clover
    Then the Clover order title should be "Online Pickup #" followed by the order number
    And the Clover order note should contain "John Doe"
    And the Clover order note should contain "2125551234"
    And the Clover order note should contain the pickup time

  Scenario: Print event triggered after order creation
    Given I have items in my cart
    When I place the order
    And the order syncs to Clover
    Then a print event should be triggered on the mock Clover server

  Scenario: Special instructions sent to Clover
    Given I have "Lamb Laghman" with instructions "extra spicy" in my cart
    When I place the order
    And the order syncs to Clover
    Then the Clover line item note should contain "extra spicy"

  Scenario: Kitchen note sent to Clover
    Given I have items in my cart
    When I place the order with kitchen note "Please make it mild"
    And the order syncs to Clover
    Then the Clover order note should contain "Please make it mild"

  Scenario: CloverOrderId saved to database
    Given I have items in my cart
    When I place the order
    And the order syncs to Clover
    Then the order record should have a cloverOrderId matching the Clover response

  # --- Fire and Forget ---

  Scenario: Order confirmed even if Clover is down
    Given the mock Clover server is configured to return 500 errors
    And I have items in my cart
    When I place the order
    Then I should see the order confirmation page immediately
    And the order should be saved in the local database with status "received"

  Scenario: Customer confirmation not delayed by Clover sync
    Given I have items in my cart
    When I place the order
    Then the confirmation page should load without waiting for Clover sync

  Scenario: Failed Clover sync marked as 'failed'
    Given the mock Clover server is configured to return 500 errors
    And I have items in my cart
    When I place the order
    Then the cloverSyncStatus should eventually be "failed" in the database

  Scenario: Partial failure saves cloverOrderId
    Given the mock Clover server fails on bulk_line_items but succeeds on order creation
    And I have items in my cart
    When I place the order
    Then the cloverOrderId should be saved in the database
    And the cloverSyncStatus should be "failed"

  # --- Status Event ---

  Scenario: Order status event created on sync
    Given I have items in my cart
    When I place the order
    And the order syncs to Clover successfully
    Then an orderStatusEvent should be created with source "clover"

  Scenario: New orders not blocked by Clover failure
    Given the mock Clover server is down
    And I have placed an order that failed to sync
    When I add new items to my cart
    And I place another order
    Then the new order should be confirmed successfully
