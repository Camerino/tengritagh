# S0-01 Project Setup

## User Story

As a developer, I want a properly scaffolded Next.js 14 project with TypeScript strict mode, pnpm, and Tailwind CSS v4, so that the team has a solid foundation to build upon.

## Description

Initialize the project repository with Next.js 14 using the App Router, TypeScript in strict mode, pnpm as the package manager, and Tailwind CSS v4 for styling. The project structure must follow the conventions outlined in CLAUDE.md and support the multi-agent development workflow.

## Feature File

```gherkin
Feature: Project Setup
  As a developer
  I want a properly scaffolded Next.js 14 project
  So that the team has a solid foundation to build upon

  Scenario: Development server starts successfully
    Given the project dependencies are installed with pnpm
    When I run "pnpm dev"
    Then the development server starts on localhost:3000 without errors

  Scenario: Production build succeeds
    Given the project dependencies are installed with pnpm
    When I run "pnpm build"
    Then the build completes with zero TypeScript or build errors

  Scenario: TypeScript strict mode is enabled
    Given the project is initialized
    When I inspect tsconfig.json
    Then "strict" is set to true

  Scenario: Linting passes on scaffolded code
    Given the project dependencies are installed with pnpm
    When I run "pnpm lint"
    Then ESLint reports no errors

  Scenario: Tailwind CSS is active
    Given a component uses Tailwind CSS classes
    When the development server renders the component
    Then the Tailwind styles are applied correctly

  Scenario: Path aliases resolve correctly
    Given a module is imported using the "@/" prefix
    When the import is resolved
    Then it maps to the "src/" directory correctly

  Scenario: Environment variables are documented
    Given the project root directory
    When I check for ".env.example"
    Then the file exists with DATABASE_URL, CLOVER_*, and NEXT_PUBLIC_* variables documented

  Scenario: Required directory structure exists
    Given the project is initialized
    When I verify the directory structure
    Then the following directories exist:
      | directory         |
      | src/app/          |
      | src/components/   |
      | src/components/ui/|
      | src/db/           |
      | src/types/        |
      | src/lib/          |
      | tests/e2e/        |

  Scenario: Package manager is pnpm
    Given the project root directory
    When I check for lock files
    Then "pnpm-lock.yaml" exists
    And "package-lock.json" does not exist
    And "yarn.lock" does not exist

  Scenario: Git ignores generated and sensitive files
    Given the project has a ".gitignore" file
    When I inspect its contents
    Then it includes "node_modules"
    And it includes ".next"
    And it includes ".env"
    And it includes "data/*.db"
```

## Technical Notes

- Use `npx create-next-app@latest` with `--ts --tailwind --eslint --app --src-dir --use-pnpm`
- Tailwind v4 configuration should include the custom color tokens (terracotta, burgundy, gold, cream, charcoal) as placeholders; full design system setup is in S0-02
- Add path aliases in tsconfig.json: `@/*` maps to `src/*`
- Install shadcn/ui CLI and initialize it (actual component customization is S0-02)

## Dependencies

None (first story)

## Priority

P0

## Story Points

3
