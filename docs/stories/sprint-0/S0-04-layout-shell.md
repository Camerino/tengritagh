# S0-04 Layout Shell

## User Story

As a customer, I want a consistent header, footer, and navigation across all pages, so that I can easily find the restaurant's phone number, navigate between pages, and access my cart.

## Description

Build the shared layout components that wrap every page: a Header with logo, phone number, cart icon, and hamburger menu; a Footer with social media links, hours, navigation, and a Silk Road geometric border; and a MobileNav slide-out drawer for mobile navigation. These components must be responsive, accessible, and reflect the Uyghur cultural design aesthetic.

## Feature File

```gherkin
Feature: Layout Shell
  As a customer
  I want a consistent header, footer, and navigation across all pages
  So that I can easily find the restaurant's phone number, navigate between pages, and access my cart

  Background:
    Given the restaurant website is loaded

  # --- Header ---

  Scenario: Logo links to homepage
    Given the header is visible
    When I click the restaurant name "Tengri Tagh"
    Then I am navigated to the homepage "/"

  Scenario: Restaurant name displays in Playfair Display font
    Given the header is visible
    When I inspect the logo text
    Then the font-family is "Playfair Display"

  Scenario: Phone number is displayed and clickable
    Given the header is visible
    When I inspect the phone number link
    Then the href starts with "tel:"

  Scenario: Cart icon is visible with badge
    Given the header is visible
    When I look at the cart area
    Then a shopping bag icon is visible
    And the badge shows "0" or is hidden when the cart is empty

  Scenario: Header is sticky on scroll
    Given a page has enough content to scroll
    When I scroll down the page
    Then the header remains fixed at the top of the viewport

  # --- Desktop Navigation ---

  Scenario: Desktop navigation shows horizontal links
    Given I am viewing the site at 1280px viewport width
    When I look at the header
    Then horizontal nav links are visible: Menu, About, Location, Order
    And the hamburger menu icon is hidden

  # --- Mobile Navigation ---

  Scenario: Hamburger menu shows on mobile
    Given I am viewing the site at 375px viewport width
    When I look at the header
    Then a hamburger menu icon is visible
    And the desktop horizontal nav links are hidden

  Scenario: MobileNav opens from the right
    Given I am viewing the site at 375px viewport width
    When I tap the hamburger menu icon
    Then a slide-out drawer appears from the right
    And an overlay backdrop is displayed behind the drawer

  Scenario: MobileNav contains all navigation links
    Given the MobileNav drawer is open
    When I look at the drawer contents
    Then I see links for: Home, Menu, About, Location, Order
    And a close button is visible

  Scenario: MobileNav closes when a link is tapped
    Given the MobileNav drawer is open
    When I tap the "Menu" link
    Then the drawer closes
    And I am navigated to "/menu"

  Scenario: MobileNav closes when overlay is clicked
    Given the MobileNav drawer is open
    When I click the overlay backdrop
    Then the drawer closes

  Scenario: MobileNav closes when close button is tapped
    Given the MobileNav drawer is open
    When I tap the close (X) button
    Then the drawer closes

  Scenario: MobileNav traps focus for accessibility
    Given the MobileNav drawer is open
    When I press Tab repeatedly
    Then focus cycles within the drawer
    And focus does not move to elements behind the drawer

  # --- Footer ---

  Scenario: Footer displays social media links
    Given the footer is visible
    When I inspect the social media section
    Then links for Instagram, Facebook, TikTok, and Yelp are present
    And each link opens in a new tab with rel="noopener noreferrer"

  Scenario: Footer shows restaurant hours
    Given the footer is visible
    When I look at the hours section
    Then restaurant operating hours are displayed in a readable format

  Scenario: Footer includes navigation links
    Given the footer is visible
    When I inspect the footer navigation
    Then links for Home, Menu, About, and Location are present

  Scenario: Footer displays address and phone
    Given the footer is visible
    When I look at the contact section
    Then the restaurant address is displayed
    And the phone number is displayed

  Scenario: Footer has Silk Road decorative border
    Given the footer is visible
    When I look at the top edge of the footer
    Then the SilkRoadPattern geometric decorative border is visible

  # --- Responsive Layout ---

  Scenario Outline: Layout renders correctly across viewports
    Given I am viewing the site at <width>px viewport width
    When the page renders
    Then the header, content area, and footer are all visible
    And there is no horizontal overflow

    Examples:
      | width |
      | 375   |
      | 768   |
      | 1280  |

  Scenario: Footer stacks vertically on mobile
    Given I am viewing the site at 375px viewport width
    When I look at the footer
    Then the footer sections are stacked vertically

  Scenario: Footer uses multi-column layout on desktop
    Given I am viewing the site at 1280px viewport width
    When I look at the footer
    Then the footer sections are arranged in a multi-column layout

  # --- Accessibility ---

  Scenario: Hamburger button has accessible label
    Given I am viewing the site at 375px viewport width
    When I inspect the hamburger menu button
    Then it has aria-label="Open menu"

  Scenario: MobileNav has dialog role
    Given the MobileNav drawer is open
    When I inspect the drawer element
    Then it has role="dialog" and aria-modal="true"

  Scenario: Social media links have accessible labels
    Given the footer is visible
    When I inspect each social media link
    Then each has an aria-label describing the platform (e.g., "Instagram")

  Scenario: Navigation uses semantic HTML
    Given the page is rendered
    When I inspect the HTML structure
    Then the page uses <header>, <footer>, <nav>, and <main> elements
```

## Technical Notes

- Header, Footer, and MobileNav are Server Components with client-side interactivity only where needed (hamburger toggle uses `use client`)
- Cart icon badge count will be wired to Zustand cart store in Sprint 2; for now render a static badge or hide when count is 0
- Social media icons: use Lucide icons or simple SVGs
- MobileNav should use CSS transitions for the slide animation (transform: translateX)
- Use semantic HTML: `<header>`, `<footer>`, `<nav>`, `<main>`
- Phone number links: `<a href="tel:+15551234567">`
- External links (social media) should have `target="_blank"` and `rel="noopener noreferrer"`

## Dependencies

- S0-01 (Project Setup)
- S0-02 (Design System -- for fonts, colors, SilkRoadPattern component)

## Priority

P0

## Story Points

5
