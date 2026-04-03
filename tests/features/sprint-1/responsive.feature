Feature: Responsive Design
  As a customer using any device
  I want the website to display correctly on mobile, tablet, and desktop
  So that I have a great experience regardless of screen size

  # --- Homepage Responsive ---

  Scenario Outline: Homepage renders without overflow at <width>px
    Given the restaurant website is loaded
    And I am viewing the site at <width>px viewport width
    When I navigate to "/"
    Then there should be no horizontal overflow
    And all text should be readable
    And the header and footer should be visible

    Examples:
      | width |
      | 375   |
      | 768   |
      | 1280  |

  Scenario: Homepage hero stacks on mobile
    Given I am viewing the site at 375px viewport width
    When I navigate to "/"
    Then the hero section content should be stacked vertically

  Scenario: Homepage hero is side-by-side on desktop
    Given I am viewing the site at 1280px viewport width
    When I navigate to "/"
    Then the hero section should use a side-by-side layout

  Scenario: Featured dishes scroll on mobile
    Given I am viewing the site at 375px viewport width
    When I navigate to "/"
    And I scroll to the featured dishes section
    Then the dishes should be horizontally scrollable

  Scenario: Featured dishes grid on desktop
    Given I am viewing the site at 1280px viewport width
    When I navigate to "/"
    And I scroll to the featured dishes section
    Then the dishes should be in a 3-column grid

  # --- Menu Page Responsive ---

  Scenario: Menu 2-column grid on mobile
    Given I am viewing the site at 375px viewport width
    When I navigate to "/menu"
    Then menu items should be in a 2-column grid

  Scenario: Menu 3-column grid on desktop
    Given I am viewing the site at 1280px viewport width
    When I navigate to "/menu"
    Then menu items should be in a 3-column grid

  Scenario: Menu category tabs scrollable on mobile
    Given I am viewing the site at 375px viewport width
    When I navigate to "/menu"
    Then the category tabs should be horizontally scrollable

  # --- About Page Responsive ---

  Scenario: About values stack on mobile
    Given I am viewing the site at 375px viewport width
    When I navigate to "/about"
    And I scroll to the values section
    Then the values should be stacked vertically

  Scenario: About values row on desktop
    Given I am viewing the site at 1280px viewport width
    When I navigate to "/about"
    And I scroll to the values section
    Then the values should be in a 3-column row

  # --- Location Page Responsive ---

  Scenario: Location stacks on mobile
    Given I am viewing the site at 375px viewport width
    When I navigate to "/location"
    Then the map and contact info should be stacked vertically

  Scenario: Location side-by-side on desktop
    Given I am viewing the site at 1280px viewport width
    When I navigate to "/location"
    Then the map and contact info should be side-by-side

  # --- Navigation Responsive ---

  Scenario: Desktop shows horizontal nav
    Given I am viewing the site at 1280px viewport width
    When I view any page
    Then the header should show horizontal navigation links
    And the hamburger menu should be hidden

  Scenario: Mobile shows hamburger nav
    Given I am viewing the site at 375px viewport width
    When I view any page
    Then the hamburger menu icon should be visible
    And the horizontal navigation links should be hidden

  # --- Footer Responsive ---

  Scenario: Footer stacks on mobile
    Given I am viewing the site at 375px viewport width
    When I scroll to the footer
    Then the footer sections should be stacked vertically

  Scenario: Footer multi-column on desktop
    Given I am viewing the site at 1280px viewport width
    When I scroll to the footer
    Then the footer sections should be in a multi-column layout

  # --- Cross-Page Responsive ---

  Scenario Outline: No overflow on <path> at <width>px
    Given I am viewing the site at <width>px viewport width
    When I navigate to "<path>"
    Then there should be no horizontal overflow

    Examples:
      | width | path      |
      | 375   | /         |
      | 375   | /menu     |
      | 375   | /about    |
      | 375   | /location |
      | 768   | /         |
      | 768   | /menu     |
      | 768   | /about    |
      | 768   | /location |
      | 1280  | /         |
      | 1280  | /menu     |
      | 1280  | /about    |
      | 1280  | /location |
