# S1-03 About Page

## User Story

As a curious customer, I want to learn about the story of Uyghur cuisine and the people behind Tengri Tagh, so that I feel a deeper connection to the food and culture.

## Description

Build the About page (`/about`) with a hero banner, a narrative section on Uyghur cuisine and its Silk Road roots, a values section highlighting Authenticity, Community, and Tradition, and a chef/owner bio section. The page should be rich in cultural storytelling and visually consistent with the design system.

## Feature File

```gherkin
Feature: About Page
  As a curious customer
  I want to learn about the story of Uyghur cuisine and the people behind Tengri Tagh
  So that I feel a deeper connection to the food and culture

  Background:
    Given I navigate to the about page "/about"

  Scenario: About page loads without errors
    When the page renders
    Then no errors are displayed
    And all sections are visible

  Scenario: Page has correct title
    When I check the document title
    Then it is "About | Tengri Tagh Uyghur Cuisine"

  Scenario: Hero banner is displayed
    When I look at the top of the page
    Then a hero banner with a background image or gradient is visible
    And the heading "Our Story" is displayed

  Scenario: Cuisine narrative explains Uyghur food and Silk Road origins
    When I scroll to the narrative section
    Then at least 2-3 paragraphs of culturally accurate content about Uyghur cuisine are displayed
    And the Silk Road origins are mentioned

  Scenario: Three values are displayed
    When I scroll to the values section
    Then three values are visible: Authenticity, Community, and Tradition
    And each value has an icon or illustration
    And each value has a brief description

  Scenario: Values display in 3-column row on desktop
    Given I am viewing at 1280px viewport width
    When I scroll to the values section
    Then the three values are arranged in a row (3-column layout)

  Scenario: Values stack vertically on mobile
    Given I am viewing at 375px viewport width
    When I scroll to the values section
    Then the three values are stacked vertically

  Scenario: Chef/owner section is displayed
    When I scroll to the chef/owner section
    Then a photo placeholder is visible
    And the chef/owner name is displayed
    And a brief bio about their background and passion is visible

  Scenario: Decorative elements separate sections
    When I scroll through the page
    Then decorative elements (DecorativeDivider or similar) are visible between major sections

  Scenario: Heading hierarchy is proper
    When I inspect the heading structure
    Then headings follow h1 > h2 > h3 hierarchy
    And no heading levels are skipped

  Scenario: All images have alt text
    When I inspect all images on the page
    Then every image has a descriptive alt attribute

  Scenario Outline: About page is fully responsive
    Given I am viewing at <width>px viewport width
    When the page renders
    Then all content is readable without horizontal scroll
    And sections have appropriate spacing

    Examples:
      | width |
      | 375   |
      | 768   |
      | 1280  |

  # --- Accessibility ---

  Scenario: All links and interactive elements are keyboard accessible
    When I press Tab through the page
    Then all links and interactive elements are reachable

  Scenario: Headings are properly structured for screen readers
    When a screen reader navigates the page
    Then headings are encountered in logical order
    And images have descriptive alt text

  Scenario: Decorative elements are hidden from screen readers
    When I inspect decorative elements
    Then each has aria-hidden="true"

  Scenario: Color contrast meets WCAG 2.1 AA
    When I measure contrast ratios
    Then body text on background meets 4.5:1
    And heading text meets 3:1 for large text
```

## Technical Notes

- This is primarily a static content page; can be a pure Server Component
- Content can be hardcoded for V1 (no CMS needed)
- Hero banner: consider using a warm-toned image of Uyghur food/culture or a gradient using terracotta/burgundy
- Values section: use Lucide icons or simple custom SVGs for each value
- Chef/owner photo: use a placeholder image for now (can be replaced with real photo later)
- Ensure Silk Road narrative is culturally respectful and accurate
- Use `<article>` semantic element for the main content

## Dependencies

- S0-01 (Project Setup)
- S0-02 (Design System)
- S0-04 (Layout Shell)

## Priority

P1

## Story Points

3
