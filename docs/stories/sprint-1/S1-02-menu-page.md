# S1-02 Menu Page

## User Story

As a customer, I want to browse the restaurant's menu organized by category with bilingual names and clear pricing, so that I can decide what to order.

## Description

Build the menu page (`/menu`) with horizontal scrollable category tabs, a responsive grid of menu item cards, bilingual display (English + Chinese names), "POPULAR" badges on signature items, and an "Add to Cart" button on each item. In Sprint 1, the "Add to Cart" button is rendered but non-functional (wired to the cart store in Sprint 2).

## Feature File

```gherkin
Feature: Menu Page
  As a customer
  I want to browse the restaurant's menu organized by category with bilingual names
  So that I can decide what to order

  Background:
    Given I navigate to the menu page "/menu"
    And menu items are seeded in the database

  # --- Category Tabs ---

  Scenario: Category tabs are displayed
    When the menu page loads
    Then a horizontal category tab bar is displayed at the top
    And it includes at minimum: Laghman, Polo, Kebabs, Samsa, Nan, Soups, Salads, Drinks, Desserts

  Scenario: Tapping a category tab filters or scrolls to items
    When I tap the "Kebabs" category tab
    Then only kebab items are displayed or the page scrolls to the kebabs section

  Scenario: Active category tab is visually highlighted
    When I tap the "Kebabs" category tab
    Then the "Kebabs" tab has a terracotta underline or background highlight
    And other tabs are not highlighted

  Scenario: Category tabs scroll horizontally on mobile
    Given I am viewing at 375px viewport width
    When the category tabs overflow the viewport
    Then the tabs are scrollable horizontally

  # --- Menu Item Cards ---

  Scenario: Menu items display in 2-column grid on mobile
    Given I am viewing at 375px viewport width
    When the menu items load
    Then they are displayed in a 2-column grid

  Scenario: Menu items display in 3-column grid on desktop
    Given I am viewing at 1280px viewport width
    When the menu items load
    Then they are displayed in a 3-column grid

  Scenario: Menu item card shows all required information
    When I inspect a menu item card
    Then the card shows an item image
    And the English name is displayed in bold
    And the Chinese name (nameZh) is displayed below in smaller text
    And a description is shown truncated to 2 lines
    And the price is displayed

  Scenario Outline: Bilingual names display correctly
    When I find the menu card for "<english_name>"
    Then the Chinese name "<chinese_name>" is visible below it

    Examples:
      | english_name      | chinese_name |
      | Gouyourou Laghman | 过油肉拌面    |
      | Uyghur Polo       | 手抓饭        |
      | Uyghur Lamb Kawap | 烤羊肉串      |
      | Lamb Samsa        | 烤包子        |

  Scenario: Featured items display POPULAR badge
    Given a menu item has isFeatured set to true
    When the card renders
    Then a "POPULAR" badge is visible with gold background and charcoal text

  Scenario: Price is displayed in dollar format
    Given a menu item has price 1595 (cents)
    When the card renders
    Then the price is displayed as "$15.95"

  Scenario: Add to Cart button is visible but non-functional
    When I inspect a menu item card
    Then an "Add to Cart" button is visible with terracotta background
    When I click the "Add to Cart" button
    Then no cart action occurs
    And no error is thrown

  Scenario: Item images use optimized loading
    When I inspect menu item images
    Then they use next/image with proper aspect ratios

  Scenario: Missing image shows placeholder
    Given a menu item has no imageUrl
    When the card renders
    Then a placeholder image or gradient background is shown

  Scenario: Unavailable items are indicated
    Given a menu item has isAvailable set to false
    When the card renders
    Then the item is either hidden or shown greyed out with "Unavailable" text

  # --- Data & SEO ---

  Scenario: Menu data is fetched server-side
    When the menu page loads
    Then menu items are fetched from the SQLite database via Drizzle queries

  Scenario: Page has correct title
    When I check the document title
    Then it is "Menu | Tengri Tagh Uyghur Cuisine"

  # --- Responsive & Performance ---

  Scenario Outline: Menu page is fully responsive
    Given I am viewing at <width>px viewport width
    When the menu page loads
    Then all content renders correctly without horizontal overflow
    And all text is readable
    And prices are visible

    Examples:
      | width |
      | 375   |
      | 768   |
      | 1280  |

  Scenario: No layout shift on load
    When the menu page loads
    Then the category tabs and menu grid load without layout shift

  Scenario: All menu item images have alt text
    When I inspect all menu item images
    Then each has an alt attribute matching the dish name

  # --- Accessibility ---

  Scenario: Category tabs are keyboard navigable
    When I press Tab to the category tabs
    Then I can navigate between tabs using Tab or arrow keys

  Scenario: Category tabs use proper ARIA roles
    When I inspect the category tab bar
    Then it has role="tablist"
    And each tab has role="tab"

  Scenario: Add to Cart buttons are focusable
    When I press Tab through the page
    Then each "Add to Cart" button is reachable

  Scenario: POPULAR badge is announced by screen readers
    Given a featured item has a "POPULAR" badge
    When a screen reader reads the card
    Then the "POPULAR" designation is announced

  Scenario: Color contrast meets WCAG 2.1 AA on cards
    When I measure contrast ratios on menu cards
    Then item name on card background meets 4.5:1
    And price text meets 4.5:1
    And POPULAR badge text meets 4.5:1
```

## Technical Notes

- Menu page is primarily a Server Component; category tab interaction may use a client component for scroll/filter behavior
- Two approaches for category filtering: (a) client-side filter with all items loaded, or (b) URL-based with `?category=laghman` query param -- prefer (a) for snappier UX
- Menu items fetched with `getMenuItems()` server action or direct Drizzle query in RSC
- "POPULAR" badge position: top-right corner of the card image or next to the item name
- Consider intersection observer for category tab auto-highlighting as user scrolls past sections
- Price display: convert cents to dollars (e.g., 1595 -> "$15.95")

## Dependencies

- S0-01 (Project Setup)
- S0-02 (Design System)
- S0-03 (Database Schema -- menu items and categories must be seeded)
- S0-04 (Layout Shell)

## Priority

P0

## Story Points

8
