# S2-10 Pickup Time Rules

## User Story

As a customer selecting a pickup time, I want only valid time slots to be available, so that I do not choose a time that the restaurant cannot fulfill.

## Description

Implement the business rules for pickup time selection: ASAP calculation based on current time plus estimated wait, 15-minute increment time slots, lead time validation, and cutoff before store closing. The pickup time selector on the checkout page must only show valid, achievable time slots.

## Feature File

```gherkin
Feature: Pickup Time Rules
  As a customer selecting a pickup time
  I want only valid time slots to be available
  So that I do not choose a time that the restaurant cannot fulfill

  # --- ASAP Calculation ---

  Scenario: ASAP shows estimated ready time
    Given the current time is 12:00 PM Eastern
    And siteConfig.estimatedWaitMinutes is 20
    When I look at the ASAP option
    Then it displays "ASAP - Ready around 12:20 PM" (or 12:25 PM if rounded to nearest 5 minutes)

  Scenario: ASAP ready time is rounded up to nearest 5 minutes
    Given the current time is 12:03 PM and wait is 20 minutes
    When the ASAP ready time is calculated
    Then it is rounded up to 12:25 PM

  # --- Scheduled Time Slots ---

  Scenario: First scheduled slot starts after estimated wait
    Given the current time is 12:00 PM and wait is 20 minutes
    When I view the scheduled time slots
    Then the first slot is 12:30 PM (next 15-minute mark after 12:20)

  Scenario: Time slots are in 15-minute increments
    Given the current time is 12:00 PM
    When I view the scheduled time slots
    Then I see slots like 12:30 PM, 12:45 PM, 1:00 PM, 1:15 PM, etc.

  Scenario: Time slots display in readable format
    When I view the time slot options
    Then each is displayed as a readable time (e.g., "12:30 PM", "12:45 PM")

  # --- Closing Time Cutoff ---

  Scenario: Last slot is before the 30-minute closing cutoff
    Given the store closes at 10:00 PM
    When I view the time slots
    Then the last slot is at or before 9:15 PM (last 15-min slot before the 9:30 PM cutoff)

  Scenario: No scheduled slots available near closing time
    Given the current time is 9:25 PM Eastern
    And the store closes at 10:00 PM
    And estimated wait is 20 minutes
    When I view the pickup time options
    Then only ASAP is available (no scheduled slots fit)

  # --- Store Closed ---

  Scenario: No slots when store is closed
    Given the store is currently closed
    When I view the pickup time selector
    Then no ASAP option is available
    And no scheduled time slots are shown
    And a message "Store is currently closed" is displayed

  Scenario: No slots when store closes within estimated wait time
    Given the store closes in 15 minutes
    And estimated wait is 20 minutes
    When I view the pickup time options
    Then no time slots are available

  # --- Before Opening ---

  Scenario: Slots start from opening time when ordering before open
    Given the current time is 9:00 AM Eastern
    And the store opens at 11:00 AM
    And estimated wait is 20 minutes
    When I view the scheduled time slots
    Then the first slot is at or after 11:15 AM (opening + wait, rounded to 15-min)

  # --- Server-Side Validation ---

  Scenario: Server accepts valid pickup time
    Given the current time is 12:30 PM
    And I submit a pickup time of 1:00 PM
    When the placeOrder action validates the time
    Then the order is accepted

  Scenario: Server rejects expired pickup time
    Given a customer submits a pickup time that is 30 minutes in the past
    When the placeOrder action validates the time
    Then it returns "This pickup time is no longer available. Please select a new time."

  Scenario: Server rejects pickup time after cutoff
    Given the store closes at 10:00 PM
    And I submit a pickup time of 9:45 PM
    When the placeOrder action validates the time
    Then the order is rejected with an invalid time error

  Scenario: Server accepts the last valid pickup slot
    Given I select the very last available slot before closing
    When the placeOrder action validates the time
    Then the order is accepted and the pickup time is saved correctly

  # --- Client-Side Auto-Refresh ---

  Scenario: Time slot list refreshes every 60 seconds
    Given I am on the checkout page
    When 60 seconds pass
    Then the time slot list is recalculated
    And expired slots are removed

  Scenario: Stale page submission is caught
    Given I opened the checkout page 45 minutes ago
    And the earliest slot I selected has expired
    When I submit the form
    Then the server rejects with "This pickup time is no longer available"

  # --- Timezone ---

  Scenario: All times use Eastern timezone
    Given the server is in UTC and the client is in PST
    When both display time slots
    Then all slots are shown in Eastern Time

  # --- Edge Cases ---

  Scenario: Estimated wait changes between page load and submission
    Given estimatedWaitMinutes was 20 when I loaded the page
    And it changed to 30 before I submit
    When the server re-validates the pickup time
    Then it uses the current estimatedWaitMinutes value

  Scenario Outline: Time slot generation at various current times
    Given the current time is <current_time> Eastern
    And the store hours are 11:00 AM to 10:00 PM
    And estimated wait is 20 minutes
    When I view the first available scheduled slot
    Then it is <first_slot>

    Examples:
      | current_time | first_slot |
      | 10:30 AM     | 11:15 AM   |
      | 12:00 PM     | 12:30 PM   |
      | 9:00 PM      | 9:30 PM    |

  # --- Responsive ---

  Scenario Outline: Pickup time selector works at all viewports
    Given I am viewing at <width>px viewport width
    When I interact with the pickup time selector
    Then the slots are readable and selectable

    Examples:
      | width |
      | 375   |
      | 768   |
      | 1280  |

  Scenario: Mobile time selector is scrollable
    Given I am viewing at 375px viewport width
    When many time slots are available
    Then the selector is scrollable on the small screen

  # --- Accessibility ---

  Scenario: Time slots are keyboard navigable
    When I Tab to the time slot selector
    Then I can navigate between slots with keyboard (arrow keys or Tab)

  Scenario: Each time slot is announced by screen readers
    When a screen reader reads the time slot options
    Then each slot's time is announced
    And the ASAP option is clearly labeled

  Scenario: Time slot text meets contrast ratios
    When I measure contrast on time slots
    Then selected and unselected states meet WCAG 2.1 AA 4.5:1 ratio
```

## Technical Notes

- Time slot generation function: `getAvailablePickupSlots(now: Date, estimatedWaitMinutes: number, storeCloseTime: string): string[]`
- ASAP ready time: `new Date(now.getTime() + estimatedWaitMinutes * 60000)`, rounded up to nearest 5 min
- 15-min slots: start from `ceil(now + estimatedWaitMinutes, 15min)`, increment by 15 min, stop at `closeTime - 30min`
- Server-side validation: re-run the slot generation logic when the order is submitted and verify the submitted time is in the valid set
- Handle edge case: if estimatedWaitMinutes changes between page load and submission (unlikely but possible)
- The slot generation logic should be a shared utility usable on both client and server
- Consider: what happens if the store extends hours? Slots should reflect the current schedule, not a cached version.

## Dependencies

- S2-09 (Store Hours -- provides open/close times and isStoreOpen)
- S2-06 (Checkout Page -- pickup time selector UI)
- S2-07 (Place Order -- server-side time validation)

## Priority

P0

## Story Points

5
