# S1-06 Sprint 1 E2E Tests

## User Story

As a developer, I want comprehensive Playwright E2E tests for all Sprint 1 pages, so that I can verify the marketing pages work correctly across viewports and catch regressions before they reach users.

## Description

Write Playwright end-to-end tests covering the Homepage, Menu page, About page, and Location page. Tests should run across Mobile (375px), Tablet (768px), and Desktop (1280px) viewports to verify responsive behavior. Tests should verify content rendering, navigation, links, and critical user interactions.

## Feature File

```gherkin
Feature: Sprint 1 E2E Tests
  As a developer
  I want comprehensive Playwright E2E tests for all Sprint 1 pages
  So that I can catch regressions before they reach users

  # --- Homepage Tests ---

  Scenario: Homepage E2E tests pass
    Given Playwright is configured with the test suite
    When I run "pnpm test:e2e --grep homepage"
    Then all homepage tests pass

  Scenario: Homepage tests verify hero section
    Given the homepage E2E test file exists at "tests/e2e/homepage.spec.ts"
    When the tests execute
    Then they verify the hero section is visible
    And the restaurant name is displayed
    And CTA buttons are present and link correctly

  Scenario: Homepage tests verify featured dishes with Chinese names
    Given the homepage E2E test file exists
    When the tests execute
    Then they verify featured dishes render
    And at least one card contains Chinese characters (unicode range 4e00-9fff)

  Scenario: Homepage tests verify location strip
    Given the homepage E2E test file exists
    When the tests execute
    Then they verify the location strip shows the address

  # --- Menu Page Tests ---

  Scenario: Menu page E2E tests pass
    Given Playwright is configured
    When I run "pnpm test:e2e --grep menu"
    Then all menu tests pass

  Scenario: Menu tests verify category tabs and items
    Given the menu E2E test file exists at "tests/e2e/menu.spec.ts"
    When the tests execute
    Then they verify category tabs render
    And menu items display with English and Chinese names
    And prices are shown correctly
    And POPULAR badges appear on featured items

  Scenario: Menu tests verify responsive grid layout
    Given the menu E2E test file exists
    When the tests execute at different viewports
    Then they verify 2-column grid on Mobile
    And 3-column grid on Desktop

  # --- About Page Tests ---

  Scenario: About page E2E tests pass
    Given Playwright is configured
    When I run "pnpm test:e2e --grep about"
    Then all about tests pass

  Scenario: About tests verify content sections
    Given the about E2E test file exists at "tests/e2e/about.spec.ts"
    When the tests execute
    Then they verify the hero banner is visible
    And cuisine narrative text is present
    And three values are displayed
    And the chef bio section is visible

  # --- Location Page Tests ---

  Scenario: Location page E2E tests pass
    Given Playwright is configured
    When I run "pnpm test:e2e --grep location"
    Then all location tests pass

  Scenario: Location tests verify map and contact info
    Given the location E2E test file exists at "tests/e2e/location.spec.ts"
    When the tests execute
    Then they verify the map iframe is present
    And the address and phone are displayed
    And the hours table has 7 rows
    And the open/closed badge is visible

  # --- Navigation Tests ---

  Scenario: Navigation E2E tests pass
    Given Playwright is configured
    When I run "pnpm test:e2e --grep navigation"
    Then all navigation tests pass

  Scenario: Navigation tests verify header and footer links
    Given the navigation tests exist
    When the tests execute
    Then they verify header links navigate to correct pages
    And footer links navigate correctly
    And the mobile hamburger menu opens and closes

  # --- Cross-Viewport Tests ---

  Scenario Outline: All tests pass in <project> viewport
    Given the Playwright configuration defines the "<project>" project
    When I run "pnpm test:e2e --project=<project>"
    Then all tests pass at <width>x<height> viewport

    Examples:
      | project | width | height |
      | Mobile  | 375   | 667    |
      | Tablet  | 768   | 1024   |
      | Desktop | 1280  | 720    |

  Scenario: Tests verify responsive layout differences
    Given tests run across all viewport projects
    When comparing results
    Then mobile tests verify hamburger nav instead of horizontal nav
    And mobile tests verify 2-column grid instead of 3-column

  # --- Suite Performance ---

  Scenario: Full E2E suite passes with zero failures
    When I run "pnpm test:e2e"
    Then all tests across all viewport projects pass with zero failures

  Scenario: Test suite completes within time budget
    When I run the full Playwright suite
    Then it completes within 60 seconds on a development machine

  # --- Accessibility via E2E ---

  Scenario: Tests use resilient selectors
    Given the E2E test code is inspected
    Then tests use page.getByRole(), page.getByText(), page.getByAltText()
    And tests avoid implementation-detail selectors

  Scenario: Keyboard navigation is tested
    Given navigation E2E tests exist
    When the tests execute
    Then Tab key simulation verifies keyboard accessibility
```

## Technical Notes

- Use Playwright's `test.describe` to group related tests by page
- Use `page.goto('/')`, `page.goto('/menu')`, etc. for navigation
- For responsive testing, use Playwright's viewport projects (Mobile, Tablet, Desktop) defined in `playwright.config.ts`
- Avoid testing implementation details; focus on user-visible behavior
- Use `page.getByRole()`, `page.getByText()`, `page.getByAltText()` for resilient selectors
- For the Google Maps iframe, check for `iframe[src*="google.com/maps"]` or similar
- Consider using `test.beforeEach` for common setup (e.g., navigating to the page)
- For featured dishes, verify at least one card contains both English text and Chinese characters (regex `[\u4e00-\u9fff]`)

## Dependencies

- S1-01 (Homepage)
- S1-02 (Menu Page)
- S1-03 (About Page)
- S1-04 (Location Page)
- S0-06 (Test Configuration -- Playwright config must be set up)

## Priority

P1

## Story Points

5
