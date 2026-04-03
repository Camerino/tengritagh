Feature: Location and Hours Page
  As a customer looking for the restaurant
  I want to see the exact location on a map with hours and contact information
  So that I can find the restaurant and know when it is open

  Background:
    Given the restaurant website is loaded
    And I navigate to "/location"

  Scenario: Location page loads successfully
    Then the page should load without errors

  Scenario: Page title is correct
    When I check the document title
    Then it should be "Location & Hours | Tengri Tagh Uyghur Cuisine"

  Scenario: Google Maps embed is displayed
    When I view the page
    Then I should see a Google Maps embed centered on the restaurant location

  Scenario: Map is full width on mobile
    Given I am viewing the site at 375px viewport width
    When I view the map
    Then the map should be full width

  Scenario: Map is constrained on desktop
    Given I am viewing the site at 1280px viewport width
    When I view the map
    Then the map should be constrained with rounded corners

  Scenario: Map has accessible title
    When I inspect the map iframe
    Then it should have a title attribute for accessibility

  Scenario: Contact info displays address
    When I view the contact info section
    Then I should see the restaurant address

  Scenario: Contact info displays phone
    When I view the contact info section
    Then I should see a phone number as a clickable tel link

  Scenario: Contact info displays email
    When I view the contact info section
    Then I should see an email address

  Scenario: Address opens Google Maps directions
    When I click the restaurant address
    Then Google Maps directions should open in a new tab

  Scenario: Hours table lists all days of the week
    When I view the hours section
    Then I should see operating hours for Monday through Sunday

  Scenario: Current day is highlighted in hours table
    When I view the hours table
    Then today's hours should be visually highlighted

  Scenario: Open/closed badge is displayed
    When I view the page
    Then I should see an open/closed badge reflecting the current status

  Scenario: Estimated wait time banner is shown
    When I view the page
    Then I should see an estimated wait time banner

  Scenario: Desktop layout is side-by-side
    Given I am viewing the site at 1280px viewport width
    When I view the page
    Then the map and contact info should be displayed side-by-side

  Scenario: Mobile layout is stacked
    Given I am viewing the site at 375px viewport width
    When I view the page
    Then the map and contact info should be stacked vertically

  Scenario Outline: Location page is fully responsive
    Given I am viewing the site at <width>px viewport width
    When the location page loads
    Then there should be no horizontal overflow

    Examples:
      | width |
      | 375   |
      | 768   |
      | 1280  |
