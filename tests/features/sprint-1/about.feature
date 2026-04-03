Feature: About Page
  As a curious customer
  I want to learn about the story of Uyghur cuisine and the people behind Tengri Tagh
  So that I feel a deeper connection to the food and culture

  Background:
    Given the restaurant website is loaded
    And I navigate to "/about"

  Scenario: About page loads successfully
    Then the page should load without errors

  Scenario: Page title is correct
    When I check the document title
    Then it should be "Our Story | Tengri Tagh Uyghur Cuisine"

  Scenario: Hero banner is displayed
    When I view the top of the about page
    Then I should see a hero banner with the heading "Our Story"
    And the banner should have a background image or gradient

  Scenario: Cuisine narrative is present
    When I scroll to the narrative section
    Then I should see at least 2 paragraphs explaining Uyghur cuisine and its Silk Road origins

  Scenario: Values section displays Authenticity
    When I scroll to the values section
    Then I should see "Authenticity" with an icon and description

  Scenario: Values section displays Community
    When I scroll to the values section
    Then I should see "Community" with an icon and description

  Scenario: Values section displays Tradition
    When I scroll to the values section
    Then I should see "Tradition" with an icon and description

  Scenario: Values in 3-column layout on desktop
    Given I am viewing the site at 1280px viewport width
    When I scroll to the values section
    Then the values should be displayed in a 3-column row

  Scenario: Values stack vertically on mobile
    Given I am viewing the site at 375px viewport width
    When I scroll to the values section
    Then the values should be stacked vertically

  Scenario: Chef/owner section is displayed
    When I scroll to the chef section
    Then I should see a photo placeholder
    And I should see the chef name
    And I should see a brief bio

  Scenario: Decorative elements between sections
    When I view the page
    Then decorative dividers should be visible between major sections

  Scenario: Proper heading hierarchy
    When I inspect the heading elements
    Then the headings should follow a proper h1, h2, h3 hierarchy

  Scenario: All images have alt text
    When I inspect all images on the about page
    Then every image should have descriptive alt text

  Scenario Outline: About page is fully responsive
    Given I am viewing the site at <width>px viewport width
    When the about page loads
    Then there should be no horizontal overflow
    And all text should be readable

    Examples:
      | width |
      | 375   |
      | 768   |
      | 1280  |
