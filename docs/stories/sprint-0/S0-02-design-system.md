# S0-02 Design System

## User Story

As a developer, I want a consistent design system with defined color tokens, typography, and component styles, so that all pages share a cohesive visual identity reflecting Uyghur cultural aesthetics.

## Description

Configure the design system including Tailwind CSS color tokens, typography (Playfair Display for headings, Inter for body text), and shadcn/ui component customization. The design tokens must reflect the warm, culturally rich palette defined in the project plan. All shadcn/ui components should be themed to match.

## Feature File

```gherkin
Feature: Design System
  As a developer
  I want a consistent design system with defined color tokens and typography
  So that all pages share a cohesive visual identity reflecting Uyghur cultural aesthetics

  Background:
    Given the project is set up with Tailwind CSS v4

  Scenario Outline: Custom color tokens are defined
    When I inspect the Tailwind CSS configuration
    Then the color token "<token>" is defined with hex value "<hex>"

    Examples:
      | token      | hex     |
      | terracotta | #C75B39 |
      | burgundy   | #6B1D2A |
      | gold       | #D4A84B |
      | cream      | #FFF8F0 |
      | charcoal   | #2D2926 |

  Scenario: Playfair Display is loaded for headings
    Given a page is loaded in the browser
    When I inspect any heading element (h1-h6)
    Then the font-family is "Playfair Display"

  Scenario: Inter is loaded for body text
    Given a page is loaded in the browser
    When I inspect the body text
    Then the font-family is "Inter"

  Scenario: No flash of unstyled or invisible text
    Given a page is loaded with network throttling enabled
    When the page renders
    Then there is no visible flash of unstyled or invisible text (FOUT/FOIT)

  Scenario: shadcn/ui Button renders with themed colors
    Given a Button component from shadcn/ui is rendered
    When I inspect its styles
    Then the background color is terracotta
    And the text color is cream

  Scenario: Button hover state provides feedback
    Given a Button component from shadcn/ui is rendered
    When I hover over the button
    Then the button shows visual hover feedback with a darker shade or opacity change

  Scenario: Focus ring uses gold for accessibility
    Given a focusable element is on the page
    When I press Tab to focus on it
    Then a gold (#D4A84B) focus ring appears around the element

  Scenario: CSS custom properties are defined
    Given the globals.css file exists
    When I inspect the CSS custom properties
    Then light theme color variables are defined matching the design palette

  Scenario: EtlesPattern SVG component renders
    Given the EtlesPattern component is imported from "src/components/decorative/"
    When I render the component
    Then an SVG pattern displays with green and orange ikat motifs

  Scenario: SilkRoadPattern SVG component renders
    Given the SilkRoadPattern component is imported from "src/components/decorative/"
    When I render the component
    Then an SVG geometric border pattern inspired by Central Asian architecture displays

  Scenario: DecorativeDivider component renders
    Given the DecorativeDivider component exists
    When I render the component
    Then a decorative divider element is visible for section separation

  Scenario: Decorative SVGs are hidden from screen readers
    Given decorative SVG components (EtlesPattern, SilkRoadPattern) are rendered
    When I inspect their attributes
    Then each has aria-hidden="true"

  Scenario Outline: Color contrast meets WCAG 2.1 AA
    Given text is rendered with foreground "<foreground>" on background "<background>"
    When I measure the contrast ratio
    Then the ratio meets or exceeds 4.5:1

    Examples:
      | foreground | background |
      | charcoal   | cream      |
      | cream      | terracotta |

  Scenario Outline: Design system is responsive across viewports
    Given a page with design system elements is loaded
    When I view it at <width>px viewport width
    Then font sizes remain readable
    And patterns scale appropriately

    Examples:
      | width |
      | 375   |
      | 768   |
      | 1280  |
```

## Technical Notes

- Use `next/font/google` for font loading to avoid FOUT/FOIT
- shadcn/ui uses CSS variables for theming; update `globals.css` with HSL values matching the palette
- EtlesPattern should be an SVG with repeating ikat motifs in green (#4A7C59) and orange (#D4763C) tones
- SilkRoadPattern should use geometric shapes inspired by Central Asian architectural motifs
- Consider creating a `src/lib/design-tokens.ts` exporting color values for use in non-Tailwind contexts (e.g., SVGs)

## Dependencies

- S0-01 (Project Setup)

## Priority

P0

## Story Points

5
