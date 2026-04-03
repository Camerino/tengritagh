# S1-04 Location & Hours Page

## User Story

As a customer looking for the restaurant, I want to see the exact location on a map with hours and contact information, so that I can find the restaurant and know when it is open.

## Description

Build the Location page (`/location`) with an embedded Google Map showing the restaurant's location near Times Square, a contact info card with address, phone, and email, a formatted hours table showing daily operating hours, and an estimated wait time banner pulled from siteConfig. The page should make it easy for both walk-in visitors and pickup customers to find the restaurant.

## Feature File

```gherkin
Feature: Location and Hours Page
  As a customer looking for the restaurant
  I want to see the exact location on a map with hours and contact information
  So that I can find the restaurant and know when it is open

  Background:
    Given I navigate to the location page "/location"

  Scenario: Location page loads without errors
    When the page renders
    Then no errors are displayed

  Scenario: Page has correct title
    When I check the document title
    Then it is "Location & Hours | Tengri Tagh Uyghur Cuisine"

  # --- Google Map ---

  Scenario: Google Maps embed is displayed
    When the page loads
    Then a Google Maps iframe is visible showing the restaurant location
    And the map is centered on the restaurant pin

  Scenario: Map is responsive on mobile
    Given I am viewing at 375px viewport width
    When I look at the map
    Then it is full width

  Scenario: Map is constrained on desktop
    Given I am viewing at 1280px viewport width
    When I look at the map
    Then it is constrained with rounded corners

  Scenario: Map iframe has accessible title
    When I inspect the Google Maps iframe
    Then it has a title attribute like "Tengri Tagh Uyghur Cuisine on Google Maps"

  # --- Contact Information ---

  Scenario: Contact info card displays all details
    When I look at the contact info card
    Then the restaurant address is displayed
    And the phone number is displayed
    And the email is displayed

  Scenario: Address links to Google Maps directions
    When I click the restaurant address
    Then Google Maps directions open in a new tab

  Scenario: Phone number is a clickable tel link
    When I inspect the phone number
    Then the href starts with "tel:"

  # --- Hours Table ---

  Scenario: Hours table lists all 7 days
    When I look at the hours section
    Then operating hours for each day of the week (Monday through Sunday) are listed

  Scenario: Current day hours are visually highlighted
    When I look at the hours table
    Then today's row is visually distinct with bold text or an accent color

  Scenario: Open/closed badge reflects current status
    When I look at the page
    Then an open/closed badge is displayed
    And it reflects the actual open/closed status based on current time and hours

  # --- Wait Time ---

  Scenario: Estimated wait time banner is displayed
    When I look at the page
    Then a banner shows "Estimated wait: ~20 minutes"
    And the value is sourced from siteConfig.estimatedWaitMinutes

  # --- Responsive Layout ---

  Scenario: Desktop shows map and contact side-by-side
    Given I am viewing at 1280px viewport width
    When the page renders
    Then the map and contact info are displayed side-by-side

  Scenario: Mobile stacks map and contact vertically
    Given I am viewing at 375px viewport width
    When the page renders
    Then the map and contact info are stacked vertically

  Scenario Outline: Location page is fully responsive
    Given I am viewing at <width>px viewport width
    When the page renders
    Then all content is readable
    And the hours table does not overflow horizontally

    Examples:
      | width |
      | 375   |
      | 768   |
      | 1280  |

  # --- Accessibility ---

  Scenario: Map iframe is keyboard focusable
    When I press Tab through the page
    Then the map iframe is focusable

  Scenario: Hours table has proper headers
    When I inspect the hours table
    Then it uses proper table headers for screen readers

  Scenario: Open/closed badge is announced by screen readers
    When a screen reader reads the badge
    Then the open or closed status is announced

  Scenario: All text meets WCAG 2.1 AA contrast
    When I measure contrast ratios on the page
    Then all text meets 4.5:1 ratio against its background
```

## Technical Notes

- Google Maps embed uses an `<iframe>` with the Maps Embed API (no JavaScript SDK needed for V1)
- Map API key: `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` environment variable
- Hours data can be hardcoded for V1 or stored in siteConfig; hardcoded is simpler
- Open/closed logic: compare current EST time against the hours for today's day-of-week
- Estimated wait time: read `siteConfig.estimatedWaitMinutes` from the database
- Use `<dl>` (definition list) or `<table>` for hours display
- Consider using `Intl.DateTimeFormat` for timezone-aware current-day highlighting

## Dependencies

- S0-01 (Project Setup)
- S0-02 (Design System)
- S0-03 (Database Schema -- siteConfig for estimatedWaitMinutes)
- S0-04 (Layout Shell)

## Priority

P1

## Story Points

3
