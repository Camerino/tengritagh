Feature: Ordering Happy Path
  As a customer
  I want to browse the menu, add items, and complete my order
  So that I can pick up my food from the restaurant

  Background:
    Given the restaurant website is loaded
    And the store is currently open

  Scenario: Full ordering flow from browse to confirmation
    Given I navigate to "/menu"
    When I add "Lamb Laghman" to the cart
    And I add "Uyghur Polo" to the cart
    And I navigate to "/cart"
    Then I should see 2 items in the cart
    When I tap "Proceed to Checkout"
    And I enter "John Doe" as the customer name
    And I enter "2125551234" as the phone number
    And I select "ASAP" as the pickup time
    And I tap "Place Order"
    Then I should see the order confirmation page
    And I should see the correct order number
    And I should see "Lamb Laghman" in the order items
    And I should see "Uyghur Polo" in the order items
    And I should see the pickup time

  Scenario: Order via item detail modal with quantity and instructions
    Given I navigate to "/menu"
    When I tap on the "Lamb Laghman" menu item card
    And I set the quantity to 3 in the detail modal
    And I type "extra spicy" in the special instructions
    And I tap "Add to Cart" in the modal
    And I navigate to "/cart"
    Then I should see "Lamb Laghman" with quantity 3
    And I should see special instructions "extra spicy"
    When I tap "Proceed to Checkout"
    And I fill in valid customer information
    And I tap "Place Order"
    Then I should see the order confirmation page
    And I should see "Lamb Laghman" with quantity 3 in the confirmation

  Scenario: Order with ASAP pickup time
    Given I have items in my cart
    And I navigate to "/checkout"
    When I fill in valid customer information
    And I select "ASAP" as the pickup time
    And I tap "Place Order"
    Then I should see the order confirmation page
    And the pickup time should show an ASAP estimated time

  Scenario: Order with scheduled pickup time
    Given I have items in my cart
    And I navigate to "/checkout"
    When I fill in valid customer information
    And I select a specific scheduled time slot
    And I tap "Place Order"
    Then I should see the order confirmation page
    And the pickup time should show the selected time

  Scenario: Order with kitchen note
    Given I have items in my cart
    And I navigate to "/checkout"
    When I fill in valid customer information
    And I enter "Please make it mild" in the kitchen note
    And I tap "Place Order"
    Then I should see the order confirmation page

  Scenario: Cart is cleared after order confirmation
    Given I have items in my cart
    When I complete the full ordering flow
    And I navigate to "/cart"
    Then the cart should be empty

  Scenario: Add item from menu quick button then from modal
    Given I navigate to "/menu"
    When I tap "Add to Cart" on the "Lamb Laghman" card
    Then a toast notification should appear
    And the cart badge should show "1"
    When I open the detail modal for "Uyghur Polo"
    And I set the quantity to 2
    And I tap "Add to Cart" in the modal
    Then the cart badge should show "3"

  Scenario: Toast notification includes View Cart link
    Given I navigate to "/menu"
    When I add an item to the cart
    Then a toast notification should appear with the item name
    And the toast should include a "View Cart" link
    When I tap "View Cart" in the toast
    Then I should be navigated to "/cart"
