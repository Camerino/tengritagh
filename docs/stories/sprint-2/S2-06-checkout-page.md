# S2-06 Checkout Page

## User Story

As a customer ready to order, I want to provide my name, phone number, and preferred pickup time, so that the restaurant can prepare my food and I can pick it up at the right time.

## Description

Build the checkout page (`/checkout`) with a customer info form (name, phone, optional email), a pickup time selector (ASAP + 15-minute time slots), an optional kitchen note field, a collapsible order summary, a "Payment collected at pickup" notice, and a "Place Order" button. The form validates inputs client-side before submission.

## Feature File

```gherkin
Feature: Checkout Page
  As a customer ready to order
  I want to provide my name, phone number, and preferred pickup time
  So that the restaurant can prepare my food and I can pick it up at the right time

  Background:
    Given I have items in my cart
    And I navigate to the checkout page "/checkout"

  # --- Page Load ---

  Scenario: Checkout page loads with cart items
    When the page renders
    Then the customer info form is displayed
    And the order summary shows my cart items
    And the pickup time selector is visible

  Scenario: Empty cart redirects away from checkout
    Given the cart is empty
    When I navigate to "/checkout"
    Then I am redirected to "/cart" or shown an empty state with a link to the menu

  Scenario: Page has correct title
    When I check the document title
    Then it is "Checkout | Tengri Tagh Uyghur Cuisine"

  # --- Name Validation ---

  Scenario: Name is required
    When I leave the name field empty and submit the form
    Then a "Name is required" error is shown below the name field

  Scenario: Name must be at least 2 characters
    When I enter "A" in the name field and blur
    Then a "Name must be at least 2 characters" error is shown

  Scenario: Valid name is accepted
    When I enter "John Doe" in the name field
    Then no error is shown for the name field

  Scenario: Name maximum length is 100 characters
    When I enter a name longer than 100 characters
    Then validation prevents or warns about exceeding the limit

  # --- Phone Validation ---

  Scenario: Phone is required
    When I leave the phone field empty and submit the form
    Then a "Phone is required" error is shown

  Scenario: Invalid phone format is rejected
    When I enter "123" in the phone field and blur
    Then an "Enter a valid phone number" error is shown

  Scenario: Phone auto-formats as user types
    When I type "2125551234" in the phone field
    Then the field displays "(212) 555-1234"

  Scenario: Valid US phone number is accepted
    When I enter a valid 10-digit phone number
    Then no error is shown for the phone field

  # --- Email Validation ---

  Scenario: Email is optional
    When I leave the email field empty and submit the form
    Then no error is shown for the email field

  Scenario: Invalid email format is rejected
    When I enter "not-an-email" in the email field and blur
    Then an "Enter a valid email" error is shown

  Scenario: Valid email is accepted
    When I enter "john@example.com" in the email field
    Then no error is shown

  # --- Validation Behavior ---

  Scenario: Validation errors do not appear while typing
    When I start typing in the name field
    Then no validation error appears while I type

  Scenario: Validation errors appear after leaving a field
    When I enter "A" in the name field and move focus to another field
    Then a validation error appears for the name field

  Scenario: Errors show inline below each field
    When I submit the form with empty required fields
    Then error messages appear in red text below each invalid field

  # --- Pickup Time ---

  Scenario: ASAP is the default pickup option
    When I look at the pickup time selector
    Then "ASAP" is selected by default

  Scenario: ASAP shows estimated ready time
    Given siteConfig.estimatedWaitMinutes is 20
    When I look at the ASAP option
    Then it displays "ASAP (~20 min)"

  Scenario: Time slots are in 15-minute increments
    When I open the pickup time selector
    Then scheduled time slots are displayed in 15-minute increments

  Scenario: Past time slots are not shown
    Given the current time is 2:30 PM
    When I open the pickup time selector
    Then no time slots before 2:30 PM are shown

  Scenario: Time slots stop before closing
    Given the store closes at 10:00 PM
    When I view the time slots
    Then the last available slot is at least 30 minutes before 10:00 PM

  # --- Order Summary ---

  Scenario: Order summary shows all cart items
    When I look at the order summary section
    Then all cart items are listed with names, quantities, and line totals

  Scenario: Order summary shows totals
    When I look at the order summary
    Then subtotal, estimated tax, and estimated total are displayed

  Scenario: Order summary is collapsed by default on mobile
    Given I am viewing at 375px viewport width
    When the page loads
    Then the order summary section is collapsed

  Scenario: Order summary is expanded on desktop
    Given I am viewing at 1280px viewport width
    When the page loads
    Then the order summary section is expanded

  Scenario: Order summary can be toggled
    Given I am viewing at 375px viewport width
    When I tap the order summary collapse toggle
    Then the summary expands or collapses

  # --- Kitchen Note ---

  Scenario: Kitchen note is optional
    When I look at the kitchen note textarea
    Then it is available but not required

  Scenario: Kitchen note accepts text up to 500 characters
    When I enter "Please make it mild" in the kitchen note
    Then the text is accepted
    And a character counter is visible

  Scenario: Kitchen note enforces 500 character limit
    When I type more than 500 characters in the kitchen note
    Then input stops or warns at 500 characters

  # --- Payment Notice ---

  Scenario: Payment at pickup notice is displayed
    When I look at the checkout page
    Then a notice reads "Payment will be collected at pickup"
    And credit card and cash icons are visible

  # --- Place Order Button ---

  Scenario: Place Order button submits the form
    Given I have filled in valid name and phone
    When I tap "Place Order"
    Then the form is submitted

  Scenario: Place Order shows loading state during submission
    Given I have filled in valid data
    When I tap "Place Order"
    Then the button shows a loading state with a spinner
    And the button is disabled during submission

  Scenario: Submit with validation errors prevents submission
    When I tap "Place Order" with empty name and phone fields
    Then errors are shown on both fields
    And the form is not submitted

  # --- Responsive ---

  Scenario Outline: Checkout page is responsive
    Given I am viewing at <width>px viewport width
    When the page renders
    Then form fields are properly sized
    And the payment notice is visible

    Examples:
      | width |
      | 375   |
      | 768   |
      | 1280  |

  Scenario: Desktop shows form and summary side-by-side
    Given I am viewing at 1280px viewport width
    When the page renders
    Then the form and order summary are displayed side-by-side

  Scenario: Mobile shows form full width
    Given I am viewing at 375px viewport width
    When the page renders
    Then form fields are full width

  # --- Accessibility ---

  Scenario: All form fields are keyboard navigable
    When I press Tab through the form
    Then all fields, the pickup time selector, and "Place Order" are reachable

  Scenario: Form fields have associated labels
    When I inspect each form field
    Then each has an associated label element

  Scenario: Error messages are linked to fields
    When a validation error appears
    Then it is linked to the field via aria-describedby

  Scenario: Required fields are marked
    When I inspect required fields
    Then they have aria-required="true"

  Scenario: Error text and form labels meet contrast ratios
    When I measure contrast on form elements
    Then error text, button text, and labels meet WCAG 2.1 AA 4.5:1 ratio
```

## Technical Notes

- `use client` page component that reads cart from `useCartStore` and manages form state
- Use `react-hook-form` with zod resolver for form validation, or native form validation
- Phone formatting: strip to digits, validate length, format for display
- Pickup time slots: generated client-side based on current time, store hours, and estimated wait
- The "Place Order" button calls the `placeOrder` server action (S2-07); for this story, it can call a stub that logs and returns success
- Order summary: use shadcn/ui `Collapsible` or `Accordion` component
- Generate an idempotency key (UUID) when the form mounts, send it with the order to prevent double-submit

## Dependencies

- S2-01 (Cart Store -- reads cart items for order summary)
- S2-05 (Cart Page -- customer navigates from cart to checkout)
- S2-09 (Store Hours -- checkout must respect open/closed state)
- S2-10 (Pickup Time Rules -- pickup time selector logic)
- S0-04 (Layout Shell)

## Priority

P0

## Story Points

8
