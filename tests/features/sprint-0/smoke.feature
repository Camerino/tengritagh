Feature: Smoke Tests
  As a developer
  I want basic smoke tests to verify the site loads correctly
  So that I know the application infrastructure is working

  Background:
    Given the restaurant website is loaded

  # --- Site Loads ---

  Scenario: Homepage loads successfully
    When I navigate to "/"
    Then the page should load without errors
    And the HTTP status should be 200

  Scenario: Development server responds
    When I navigate to "/"
    Then the page should respond within 5 seconds

  Scenario: Production build succeeds
    Given the project dependencies are installed with pnpm
    When I run "pnpm build"
    Then the build completes with zero TypeScript or build errors

  # --- Header ---

  Scenario: Header is visible on every page
    When I navigate to "/"
    Then the header should be visible
    And the restaurant name "Tengri Tagh" should be displayed

  Scenario: Header logo links to homepage
    When I click the restaurant name "Tengri Tagh" in the header
    Then I should be navigated to "/"

  Scenario: Header phone number is displayed
    When I view the header
    Then a phone number link with href starting with "tel:" should be visible

  Scenario: Header cart icon is visible
    When I view the header
    Then a shopping bag icon should be visible

  # --- Footer ---

  Scenario: Footer is visible on every page
    When I navigate to "/"
    Then the footer should be visible

  Scenario: Footer shows social media links
    When I view the footer
    Then links for Instagram, Facebook, TikTok, and Yelp should be present
    And each link should open in a new tab

  Scenario: Footer shows restaurant hours
    When I view the footer
    Then restaurant operating hours should be displayed

  Scenario: Footer shows address and phone
    When I view the footer
    Then the restaurant address should be displayed
    And the phone number should be displayed

  Scenario: Footer has decorative border
    When I view the footer
    Then the SilkRoadPattern decorative border should be visible at the top

  # --- Navigation ---

  Scenario: Desktop navigation links are visible
    Given I am viewing the site at 1280px viewport width
    When I view the header
    Then horizontal nav links should be visible: Menu, About, Location, Order
    And the hamburger menu icon should be hidden

  Scenario: Mobile hamburger menu is visible
    Given I am viewing the site at 375px viewport width
    When I view the header
    Then a hamburger menu icon should be visible
    And the desktop horizontal nav links should be hidden

  Scenario: Mobile nav drawer opens
    Given I am viewing the site at 375px viewport width
    When I tap the hamburger menu icon
    Then a slide-out drawer should appear from the right
    And I should see links for: Home, Menu, About, Location, Order

  Scenario: Mobile nav closes on link tap
    Given the mobile nav drawer is open
    When I tap the "Menu" link in the drawer
    Then the drawer should close
    And I should be navigated to "/menu"

  # --- Semantic HTML ---

  Scenario: Page uses semantic HTML elements
    When I inspect the HTML structure
    Then the page should use header, footer, nav, and main elements

  # --- Responsive ---

  Scenario Outline: No horizontal overflow at any viewport
    Given I am viewing the site at <width>px viewport width
    When the page loads
    Then there should be no horizontal overflow

    Examples:
      | width |
      | 375   |
      | 768   |
      | 1280  |

  # --- Accessibility ---

  Scenario: Hamburger button has accessible label
    Given I am viewing the site at 375px viewport width
    When I inspect the hamburger menu button
    Then it should have aria-label "Open menu"

  Scenario: HTML lang attribute is set
    When I inspect the html element
    Then the lang attribute should be "en"
