Feature: Navigation
  As a customer
  I want consistent navigation across all pages
  So that I can easily move between sections of the website

  Background:
    Given the restaurant website is loaded

  # --- Header Navigation ---

  Scenario: Desktop header shows horizontal nav links
    Given I am viewing the site at 1280px viewport width
    When I view the header
    Then I should see horizontal nav links: Menu, About, Location, Order

  Scenario Outline: Header nav link navigates correctly
    Given I am viewing the site at 1280px viewport width
    When I click the "<link>" link in the header
    Then I should be navigated to "<path>"

    Examples:
      | link     | path      |
      | Menu     | /menu     |
      | About    | /about    |
      | Location | /location |

  Scenario: Header is sticky on scroll
    Given a page has enough content to scroll
    When I scroll down the page
    Then the header should remain fixed at the top of the viewport

  # --- Mobile Navigation ---

  Scenario: Hamburger menu shows on mobile
    Given I am viewing the site at 375px viewport width
    When I view the header
    Then a hamburger menu icon should be visible
    And desktop horizontal nav links should be hidden

  Scenario: Mobile nav drawer opens from the right
    Given I am viewing the site at 375px viewport width
    When I tap the hamburger menu icon
    Then a slide-out drawer should appear from the right
    And an overlay backdrop should be displayed

  Scenario: Mobile nav contains all navigation links
    Given the mobile nav drawer is open
    When I view the drawer contents
    Then I should see links for: Home, Menu, About, Location, Order
    And a close button should be visible

  Scenario: Mobile nav closes when a link is tapped
    Given the mobile nav drawer is open
    When I tap the "Menu" link
    Then the drawer should close
    And I should be navigated to "/menu"

  Scenario: Mobile nav closes when overlay is clicked
    Given the mobile nav drawer is open
    When I click the overlay backdrop
    Then the drawer should close

  Scenario: Mobile nav closes when close button is tapped
    Given the mobile nav drawer is open
    When I tap the close button
    Then the drawer should close

  Scenario: Mobile nav traps focus for accessibility
    Given the mobile nav drawer is open
    When I press Tab repeatedly
    Then focus should cycle within the drawer
    And focus should not move to elements behind the drawer

  Scenario: Mobile nav has dialog role
    Given the mobile nav drawer is open
    When I inspect the drawer element
    Then it should have role "dialog" and aria-modal "true"

  # --- Footer Navigation ---

  Scenario: Footer includes navigation links
    When I view the footer
    Then I should see links for Home, Menu, About, and Location

  Scenario Outline: Footer nav link navigates correctly
    When I click the "<link>" link in the footer
    Then I should be navigated to "<path>"

    Examples:
      | link             | path      |
      | Menu             | /menu     |
      | About Us         | /about    |
      | Location & Hours | /location |

  Scenario: Footer social media links open in new tab
    When I inspect the social media links in the footer
    Then each link should have target "_blank" and rel "noopener noreferrer"

  Scenario: Social media links have accessible labels
    When I inspect each social media link in the footer
    Then each should have an aria-label describing the platform
