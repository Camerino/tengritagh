# S0-06 Test Configuration

## User Story

As a developer, I want Playwright and Vitest configured with smoke tests, so that the team can write and run end-to-end and unit tests from the start of development.

## Description

Set up Playwright for E2E browser testing and Vitest for unit/integration testing. Include configuration files, helper utilities, and initial smoke tests that verify the basic application structure is working. The test infrastructure must support the multi-viewport responsive testing and Docker-based test execution planned for later sprints.

## Feature File

```gherkin
Feature: Test Configuration
  As a developer
  I want Playwright and Vitest configured with smoke tests
  So that the team can write and run tests from the start of development

  # --- Playwright Setup ---

  Scenario: Playwright is configured
    Given the project root directory
    When I check for "playwright.config.ts"
    Then the file exists with a valid Playwright configuration

  Scenario: Playwright defines three viewport projects
    Given the playwright.config.ts exists
    When I inspect the projects configuration
    Then it defines "Mobile" at 375x667
    And it defines "Tablet" at 768x1024
    And it defines "Desktop" at 1280x720

  Scenario: Playwright base URL is configured
    Given the playwright.config.ts exists
    When I inspect the baseURL setting
    Then it is set to "http://localhost:3000"

  Scenario: Playwright auto-starts the dev server
    Given the playwright.config.ts exists
    When I inspect the webServer option
    Then it is configured to auto-start the dev server before tests

  Scenario: Playwright E2E test directory exists
    Given the project structure
    When I check for the "tests/e2e/" directory
    Then it exists

  Scenario: Playwright smoke test passes
    Given the development server is running
    When I run "pnpm test:e2e"
    Then a smoke test navigates to "/" and verifies the page loads

  Scenario: Playwright saves failure screenshots
    Given a Playwright test fails intentionally
    When the test completes
    Then a screenshot is saved to "test-results/"

  Scenario: Playwright generates HTML reports
    Given Playwright tests have been run
    When I check the "playwright-report/" directory
    Then an HTML report is available

  Scenario: Playwright has retry for CI stability
    Given the playwright.config.ts exists
    When I inspect the retries setting
    Then retries is set to at least 1

  # --- Vitest Setup ---

  Scenario: Vitest is configured
    Given the project root directory
    When I check for "vitest.config.ts"
    Then the file exists with a valid Vitest configuration

  Scenario: Vitest supports TypeScript path aliases
    Given the vitest.config.ts exists
    When I inspect the path alias configuration
    Then "@/*" maps to "src/*"

  Scenario: Vitest smoke test passes
    Given the project dependencies are installed
    When I run "pnpm test"
    Then Vitest executes and the smoke test passes

  Scenario: Vitest unit test directory exists
    Given the project structure
    When I check for unit test files
    Then a "tests/unit/" directory exists or "src/**/*.test.ts" pattern is configured

  # --- Viewport-Specific Test Runs ---

  Scenario Outline: Tests run in specific viewport project
    Given the Playwright configuration is set up
    When I run "pnpm test:e2e --project=<project>"
    Then tests execute at <width>x<height> viewport

    Examples:
      | project | width | height |
      | Mobile  | 375   | 667    |
      | Tablet  | 768   | 1024   |
      | Desktop | 1280  | 720    |

  # --- Gitignore ---

  Scenario: Test artifacts are gitignored
    Given the .gitignore file exists
    When I inspect its contents
    Then it includes "test-results/"
    And it includes "playwright-report/"
```

## Technical Notes

- Playwright config should include `retries: 1` for CI stability
- Consider adding a `tests/e2e/helpers/` directory for shared test utilities (e.g., navigation helpers, viewport constants)
- Vitest should use the `@vitejs/plugin-react` or equivalent for JSX support if testing components
- Add `test-results/` and `playwright-report/` to `.gitignore`
- Scripts in package.json:
  - `"test": "vitest run"`
  - `"test:watch": "vitest"`
  - `"test:e2e": "playwright test"`
  - `"test:e2e:ui": "playwright test --ui"`

## Dependencies

- S0-01 (Project Setup)

## Priority

P1

## Story Points

3
