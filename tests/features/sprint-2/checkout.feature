Feature: Checkout
  As a customer ready to order
  I want to provide my pickup details and place my order
  So that the restaurant can prepare my food for pickup

  Background:
    Given the restaurant website is loaded
    And the store is currently open
    And I have items in my cart
    And I navigate to "/checkout"

  # --- Customer Information ---

  Scenario: Complete checkout with valid info
    When I enter "John Doe" as the customer name
    And I enter "2125551234" as the phone number
    And I select "ASAP" as the pickup time
    And I tap "Place Order"
    Then I should see the order confirmation page

  Scenario: Checkout requires name
    When I leave the name field empty
    And I tap "Place Order"
    Then I should see an error "Name is required" below the name field

  Scenario: Checkout requires phone
    When I enter "John Doe" as the name
    And I leave the phone field empty
    And I tap "Place Order"
    Then I should see an error below the phone field

  Scenario: Invalid phone number shows error
    When I enter "123" as the phone number
    And I blur the phone field
    Then I should see an error "Enter a valid phone number" below the phone field

  Scenario: Phone number auto-formats
    When I type "2125551234" in the phone field
    Then the phone field should display "(212) 555-1234"

  Scenario: Valid email is accepted
    When I enter "john@example.com" in the email field
    Then no error should be shown for the email field

  Scenario: Invalid email shows error
    When I enter "not-an-email" in the email field
    And I blur the email field
    Then I should see an error "Enter a valid email" below the email field

  Scenario: Email is optional
    When I leave the email field empty
    And I fill in valid name and phone
    And I tap "Place Order"
    Then no error should be shown for the email field

  Scenario: Name minimum length validation
    When I enter "A" as the customer name
    And I blur the name field
    Then I should see an error about minimum length

  # --- Pickup Time ---

  Scenario: Select ASAP pickup time
    When I view the pickup time selector
    Then "ASAP" should be selected by default
    And it should display an estimated ready time like "ASAP (~20 min)"

  Scenario: Select scheduled pickup time
    When I open the pickup time selector
    Then I should see time slots in 15-minute increments
    When I select a specific time slot
    Then that time slot should be marked as selected

  Scenario: No past time slots shown
    When I view the available pickup time slots
    Then no time slot should be in the past

  Scenario: Time slots stop before closing
    When I view the available pickup time slots
    Then the last available slot should be at least 30 minutes before closing time

  # --- Order Summary ---

  Scenario: Order summary shows all items
    When I view the order summary section
    Then I should see all cart items with names, quantities, and line totals
    And I should see the subtotal
    And I should see the estimated tax
    And I should see the estimated total

  Scenario: Order summary collapsed on mobile by default
    Given I am viewing the site at 375px viewport width
    When I view the order summary
    Then it should be collapsed by default

  Scenario: Order summary expanded on desktop
    Given I am viewing the site at 1280px viewport width
    When I view the order summary
    Then it should be expanded by default

  # --- Kitchen Note ---

  Scenario: Add kitchen note
    When I enter "Please make everything mild" in the kitchen note field
    Then the text should be accepted
    And a character counter should be visible

  Scenario: Kitchen note has character limit
    When I type more than 500 characters in the kitchen note field
    Then the input should stop at 500 characters

  # --- Payment Notice ---

  Scenario: Payment notice shows pay at pickup
    When I view the checkout page
    Then I should see a notice "Payment will be collected at pickup"

  # --- Place Order ---

  Scenario: Place order shows confirmation
    When I fill in all required fields with valid data
    And I tap "Place Order"
    Then I should be navigated to the order confirmation page
    And I should see an order number

  Scenario: Double-click place order only creates one order (idempotency)
    When I fill in all required fields with valid data
    And I rapidly click "Place Order" twice
    Then only one order should be created
    And I should see only one confirmation

  Scenario: Place Order button shows loading state
    When I fill in all required fields with valid data
    And I tap "Place Order"
    Then the button should show a loading spinner
    And the button should be disabled during submission

  # --- Edge Cases ---

  Scenario: Empty cart redirects from checkout
    Given the cart is empty
    When I navigate to "/checkout"
    Then I should be redirected to "/cart" or see a message to add items

  Scenario: Checkout page title is correct
    Then the page title should be "Checkout | Tengri Tagh Uyghur Cuisine"

  Scenario Outline: Checkout is fully responsive
    Given I am viewing the site at <width>px viewport width
    When the checkout page loads
    Then there should be no horizontal overflow
    And all form fields should be usable

    Examples:
      | width |
      | 375   |
      | 768   |
      | 1280  |
