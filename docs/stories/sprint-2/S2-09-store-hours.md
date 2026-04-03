# S2-09 Store Hours Logic

## User Story

As a customer, I want to be prevented from placing an order when the restaurant is closed, so that I do not expect food that cannot be prepared.

## Description

Implement store hours logic that determines whether the restaurant is currently open or closed, and gates the ordering flow accordingly. When the store is closed, the menu page shows an "Order for Pickup" button as disabled with a "We're currently closed" message, and the checkout page blocks submission. Store hours are defined as a schedule (different hours for each day of the week) and use Eastern Time.

## Feature File

```gherkin
Feature: Store Hours Logic
  As a customer
  I want to be prevented from placing an order when the restaurant is closed
  So that I do not expect food that cannot be prepared

  # --- isStoreOpen Utility ---

  Scenario: Store is open during business hours
    Given today is Tuesday
    And the current time is 12:00 PM Eastern
    And the store hours for Tuesday are 11:00 AM to 10:00 PM
    When I call isStoreOpen()
    Then it returns true

  Scenario: Store is closed outside business hours
    Given today is Tuesday
    And the current time is 11:00 PM Eastern
    When I call isStoreOpen()
    Then it returns false

  Scenario: Store is closed on closed day
    Given today is Monday
    And Monday is configured as a closed day
    And the current time is 12:00 PM Eastern
    When I call isStoreOpen()
    Then it returns false

  Scenario: Store closes 30 minutes before actual closing time for new orders
    Given today is Tuesday
    And the store closes at 10:00 PM
    And the current time is 9:35 PM Eastern
    When I call isStoreOpen()
    Then it returns false (within 30-minute order cutoff)

  Scenario: Store is still open just before the 30-minute cutoff
    Given today is Tuesday
    And the store closes at 10:00 PM
    And the current time is 9:25 PM Eastern
    When I call isStoreOpen()
    Then it returns true

  # --- Manual Override ---

  Scenario: Manual override forces store closed during business hours
    Given siteConfig.storeOpen is "false"
    And today is Tuesday at 12:00 PM (normally open)
    When I call isStoreOpen()
    Then it returns false

  Scenario: Manual override forces store open on closed day
    Given siteConfig.storeOpen is "true"
    And today is Monday (normally closed)
    When I call isStoreOpen()
    Then it returns true

  # --- Different Hours Per Day ---

  Scenario Outline: Store hours vary by day of week
    Given today is <day>
    And the current time is 12:00 PM Eastern
    When I call isStoreOpen()
    Then it returns <expected>

    Examples:
      | day       | expected |
      | Monday    | false    |
      | Tuesday   | true     |
      | Wednesday | true     |
      | Thursday  | true     |
      | Friday    | true     |
      | Saturday  | true     |
      | Sunday    | true     |

  # --- Timezone ---

  Scenario: Time comparisons use America/New_York timezone
    Given the server runs in UTC
    And it is 5:00 PM UTC (12:00 PM Eastern in winter / 1:00 PM in summer)
    When I call isStoreOpen()
    Then the result is based on Eastern Time, not UTC

  # --- UI Impact: Homepage ---

  Scenario: Homepage CTA is disabled when store is closed
    Given the store is currently closed
    When I visit the homepage
    Then the "Order for Pickup" button is disabled or shows "Opens at [time]"

  Scenario: Homepage CTA is enabled when store is open
    Given the store is currently open
    When I visit the homepage
    Then the "Order for Pickup" button is enabled and clickable

  # --- UI Impact: Menu Page ---

  Scenario: Add to Cart buttons are disabled when store is closed
    Given the store is currently closed
    When I visit the menu page
    Then all "Add to Cart" buttons are disabled
    And a message "Ordering opens at [time]" is shown

  Scenario: Add to Cart buttons are enabled when store is open
    Given the store is currently open
    When I visit the menu page
    Then "Add to Cart" buttons are enabled

  # --- UI Impact: Checkout ---

  Scenario: Checkout blocks submission when store is closed
    Given the store is currently closed
    When I navigate to the checkout page
    Then order submission is blocked
    And a message "We're currently closed. We open at [time]." is displayed

  # --- UI Impact: Location Strip & Page ---

  Scenario: Open badge shown when store is open
    Given the store is currently open
    When I visit the homepage location strip or the location page
    Then an "Open" badge is shown in green

  Scenario: Closed badge shown when store is closed
    Given the store is currently closed
    When I visit the homepage location strip or the location page
    Then a "Closed" badge is shown in red

  # --- Responsive ---

  Scenario Outline: Closed state displays correctly at all viewports
    Given the store is currently closed
    And I am viewing at <width>px viewport width
    When I visit the menu page
    Then the closed message is visible
    And disabled buttons are clearly indicated

    Examples:
      | width |
      | 375   |
      | 768   |
      | 1280  |

  # --- Accessibility ---

  Scenario: Disabled buttons are not focusable or announced as disabled
    Given the store is closed
    When I Tab through the menu page
    Then disabled "Add to Cart" buttons are either not focusable or announced as disabled

  Scenario: Closed message is announced by screen readers
    Given the store is closed
    When a screen reader reads the menu page
    Then the closed status message is announced

  Scenario: Closed badge and disabled buttons meet contrast ratios
    Given the store is closed
    When I measure contrast on closed-state elements
    Then all text meets WCAG 2.1 AA 4.5:1 ratio
```

## Technical Notes

- Store hours configuration: define in a constants file or siteConfig rows. Example:
  ```typescript
  const STORE_HOURS: Record<number, { open: string; close: string } | null> = {
    0: { open: '11:00', close: '22:00' }, // Sunday
    1: null, // Monday - closed
    2: { open: '11:00', close: '22:00' }, // Tuesday
    // ...
  };
  ```
- Use `Intl.DateTimeFormat` with `timeZone: 'America/New_York'` for timezone handling
- The `isStoreOpen()` function should be usable in both server and client contexts
- The 30-minute cutoff before closing means if the store closes at 10pm, last order acceptance is 9:30pm
- The `siteConfig.storeOpen` override is checked first; if it is "false", return closed immediately
- Consider edge cases: hours that span midnight (e.g., open 11am, close 2am next day)

## Dependencies

- S0-03 (Database Schema -- siteConfig table)
- S2-02 (Add to Cart -- buttons to be disabled when closed)
- S2-06 (Checkout Page -- submission blocked when closed)

## Priority

P0

## Story Points

5
