Feature: Shopping Cart
  As a customer
  I want to manage items in my cart
  So that I can review and adjust my order before checkout

  Background:
    Given the restaurant website is loaded
    And the store is currently open

  # --- Add Items ---

  Scenario: Add single item to cart
    Given I am on the menu page
    When I tap "Add to Cart" on the "Lamb Laghman" menu card
    Then the cart should contain 1 item with quantity 1
    And the cart badge in the header should show "1"

  Scenario: Add multiple different items
    Given I am on the menu page
    When I add "Lamb Laghman" to the cart
    And I add "Uyghur Polo" to the cart
    Then the cart should contain 2 different items
    And the cart badge should show "2"

  Scenario: Increase item quantity in cart
    Given I have "Lamb Laghman" in my cart with quantity 1
    And I am on the cart page
    When I tap the plus button on "Lamb Laghman"
    Then the quantity should increase to 2
    And the subtotal should update accordingly

  Scenario: Decrease item quantity in cart
    Given I have "Lamb Laghman" in my cart with quantity 3
    And I am on the cart page
    When I tap the minus button on "Lamb Laghman"
    Then the quantity should decrease to 2
    And the subtotal should update accordingly

  Scenario: Remove item from cart
    Given I have "Lamb Laghman" and "Uyghur Polo" in my cart
    And I am on the cart page
    When I tap the remove button on "Lamb Laghman"
    Then "Lamb Laghman" should no longer be in the cart
    And the subtotal should update accordingly

  Scenario: Cart shows correct subtotal
    Given I have "Lamb Laghman" at $15.95 with quantity 2 in my cart
    And I have "Uyghur Polo" at $14.95 with quantity 1 in my cart
    And I am on the cart page
    Then the subtotal should be "$46.85"

  Scenario: Cart persists after page refresh
    Given I have items in my cart
    When I refresh the page
    Then the cart should still contain the same items with the same quantities

  Scenario: Cart persists after browser close and reopen
    Given I have items in my cart
    When I close the browser and reopen it
    And I navigate to the cart page
    Then the cart should still contain the same items

  Scenario: Empty cart shows empty state message
    Given the cart is empty
    When I navigate to "/cart"
    Then I should see "Your cart is empty" message
    And I should see a "Browse Menu" button linking to "/menu"

  Scenario: Cannot proceed to checkout with empty cart
    Given the cart is empty
    When I navigate to "/checkout"
    Then I should be redirected to "/cart" or see an appropriate message

  Scenario: Add item with special instructions
    Given I am on the menu page
    When I open the detail modal for "Lamb Laghman"
    And I type "no onions" in the special instructions
    And I tap "Add to Cart" in the modal
    Then the cart should contain "Lamb Laghman" with instructions "no onions"
    And the instructions should be visible on the cart page

  Scenario: Add 20+ items to cart (large order)
    Given I am on the menu page
    When I add 20 different items to the cart
    And I navigate to the cart page
    Then all 20 items should be displayed
    And the subtotal should be calculated correctly

  Scenario: Cart shows item Chinese names
    Given I have "Lamb Laghman" in my cart
    When I navigate to the cart page
    Then I should see both the English name and Chinese name for each item

  # --- Cart Page Details ---

  Scenario: Cart page displays item thumbnails
    Given I have items in my cart
    When I navigate to "/cart"
    Then each cart item should display a thumbnail image

  Scenario: Cart page shows special instructions
    Given I have an item with special instructions in my cart
    When I navigate to "/cart"
    Then the special instructions should be displayed below the item name

  Scenario: Cart shows estimated tax
    Given I have items totaling $46.85 in my cart
    When I navigate to "/cart"
    Then I should see an estimated tax line of approximately 8.875%

  Scenario: Cart shows estimated total
    Given I have items in my cart
    When I navigate to "/cart"
    Then I should see an estimated total equal to subtotal plus tax

  Scenario: Proceed to Checkout button navigates correctly
    Given I have items in my cart
    And I am on the cart page
    When I tap "Proceed to Checkout"
    Then I should be navigated to "/checkout"

  Scenario: Continue Shopping link navigates to menu
    Given I have items in my cart
    And I am on the cart page
    When I tap "Continue Shopping"
    Then I should be navigated to "/menu"

  Scenario: Cart page title is correct
    When I navigate to "/cart"
    Then the page title should be "Cart | Tengri Tagh Uyghur Cuisine"

  # --- Sticky Cart Bar (Mobile) ---

  Scenario: Sticky cart bar hidden when cart is empty
    Given the cart is empty
    And I am viewing the site at 375px viewport width
    When I navigate to "/menu"
    Then the sticky cart bar should not be visible

  Scenario: Sticky cart bar appears on adding first item
    Given I am viewing the site at 375px viewport width
    And I am on the menu page
    When I add an item to the cart
    Then the sticky cart bar should appear at the bottom of the viewport

  Scenario: Sticky cart bar shows item count and subtotal
    Given I am viewing the site at 375px viewport width
    And I have 3 items totaling $47.85 in my cart
    When I view the menu page
    Then the sticky cart bar should show "3 items" and "$47.85"

  Scenario: Sticky cart bar hidden on desktop
    Given I am viewing the site at 1280px viewport width
    And I have items in my cart
    When I view the menu page
    Then the sticky cart bar should not be visible
