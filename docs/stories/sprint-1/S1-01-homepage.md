# S1-01 Homepage

## User Story

As a hungry customer near Times Square, I want a visually stunning homepage that showcases Uyghur cuisine and makes it easy to order food or browse the menu, so that I feel excited about the food and can quickly place a pickup order.

## Description

Build the full homepage with all planned sections: hero with etles pattern stripe and animated chef GIF, featured dishes carousel with bilingual names, "Freshly Made for Every Order" section with animated GIFs, Google reviews, third-party order platform links, about teaser, and location strip. The homepage is the primary landing page and must communicate the restaurant's identity, location, and food quality within seconds.

## Feature File

```gherkin
Feature: Homepage
  As a hungry customer near Times Square
  I want a visually stunning homepage that showcases Uyghur cuisine
  So that I feel excited about the food and can quickly place a pickup order

  Background:
    Given I navigate to the homepage "/"

  # --- Hero Section ---

  Scenario: Hero section displays etles pattern stripe
    When the hero section loads
    Then a horizontal etles (atlas silk) pattern stripe is visible in the upper portion
    And it uses the EtlesPattern SVG component

  Scenario: Animated chef GIF is displayed
    When the hero section loads
    Then an animated GIF of a chef hand-pulling noodles is visible
    And it is displayed in a circular frame in the top-left area

  Scenario: Uyghur script is displayed as decorative element
    When the hero section loads
    Then the text "تەڭرىتاغ" is visible as a decorative element

  Scenario: Restaurant name is displayed in Playfair Display
    When the hero section loads
    Then "Tengri Tagh Uyghur Cuisine" is displayed
    And the heading uses Playfair Display font

  Scenario: Times Square location link is visible
    When the hero section loads
    Then "Near Times Square, NYC" text is visible and clickable

  Scenario: Times Square location link opens Google Maps
    When I click "Near Times Square, NYC"
    Then Google Maps opens in a new tab

  Scenario: Order for Pickup CTA navigates to menu
    When I click the "Order for Pickup" button
    Then I am navigated to "/menu"

  Scenario: View Menu CTA navigates to menu
    When I click the "View Menu" button
    Then I am navigated to "/menu"

  Scenario: Food photos are displayed below CTAs
    When the hero section loads
    Then photos of laghman and kawap are visible below the CTA buttons

  Scenario: Hero section is responsive on mobile
    Given I am viewing at 375px viewport width
    When the hero section loads
    Then the hero content stacks vertically

  Scenario: Hero section uses side-by-side layout on desktop
    Given I am viewing at 1280px viewport width
    When the hero section loads
    Then the hero content is arranged side-by-side

  # --- Featured Dishes Section ---

  Scenario: Featured dishes are displayed from database
    When I scroll to the featured dishes section
    Then 4 to 6 featured menu items are displayed
    And they are fetched from the database where isFeatured is true

  Scenario: Featured dish cards show bilingual names and price
    When I scroll to the featured dishes section
    Then each dish card shows an image, English name, Chinese name (nameZh), and price

  Scenario Outline: Featured dish displays correct Chinese name
    When I scroll to the featured dishes section
    Then a dish card for "<english_name>" displays Chinese name "<chinese_name>"

    Examples:
      | english_name      | chinese_name |
      | Gouyourou Laghman | 过油肉拌面    |
      | Uyghur Polo       | 手抓饭        |

  Scenario: Featured dishes scroll horizontally on mobile
    Given I am viewing at 375px viewport width
    When I scroll to the featured dishes section
    Then the dishes are scrollable horizontally

  Scenario: Featured dishes display as 3-column grid on desktop
    Given I am viewing at 1280px viewport width
    When I scroll to the featured dishes section
    Then the dishes are displayed in a 3-column grid

  # --- Freshly Made Section ---

  Scenario: Freshly Made section is displayed
    When I scroll to the Freshly Made section
    Then the heading "Freshly Made for Every Order" is visible

  Scenario: Freshly Made animated GIFs are displayed
    When I scroll to the Freshly Made section
    Then animated GIF circles are visible showing hand-pulling noodles, enjoying food, and family cooking
    And the GIFs are displayed in circular frames with consistent sizing

  Scenario: Freshly Made messaging emphasizes key values
    When I scroll to the Freshly Made section
    Then messaging about "every order freshly made" is present
    And messaging about "noodles hand-pulled per order" is present
    And messaging about "family-operated" is present

  # --- Google Reviews Section ---

  Scenario: Google reviews are displayed
    When I scroll to the Google reviews section
    Then 3 to 4 reviews are displayed
    And each review shows a star rating, reviewer name, review text, and date

  Scenario: Reviews show as carousel on mobile
    Given I am viewing at 375px viewport width
    When I scroll to the reviews section
    Then the reviews are displayed in a carousel format

  Scenario: Reviews show as grid on desktop
    Given I am viewing at 1280px viewport width
    When I scroll to the reviews section
    Then the reviews are displayed in a grid layout

  Scenario: Google reviews are cached for 24 hours
    When the page loads
    Then the reviews are fetched server-side from Google Places API
    And they are cached with a 24-hour revalidation period

  Scenario: Reviews section degrades gracefully when API is unavailable
    Given the Google Places API is unavailable
    When the page loads
    Then the reviews section is hidden or shows a fallback message
    And the rest of the page renders without errors

  # --- Order Platforms Section ---

  Scenario: Third-party order platforms are displayed
    When I scroll to the "Also Order From" section
    Then branded buttons/links for DoorDash, Uber Eats, and Grubhub are displayed

  Scenario: Platform links open in new tabs
    When I click the DoorDash link
    Then the restaurant's DoorDash page opens in a new tab

  # --- About Teaser Section ---

  Scenario: About teaser content is displayed
    When I scroll to the about teaser section
    Then a brief paragraph about Uyghur cuisine is visible

  Scenario: Learn More link navigates to about page
    When I scroll to the about teaser section
    And I click the "Learn More" link
    Then I am navigated to "/about"

  # --- Location Strip ---

  Scenario: Location strip displays restaurant info
    When I scroll to the location strip
    Then a map thumbnail is visible
    And the restaurant address is visible
    And a phone number is visible
    And restaurant hours are shown
    And an open/closed badge is visible

  Scenario: Location strip address links to Google Maps
    When I scroll to the location strip
    And I click the restaurant address
    Then Google Maps opens in a new tab

  Scenario: Location strip phone number is clickable
    When I scroll to the location strip
    And I inspect the phone number
    Then it is a clickable tel: link

  Scenario: Open/closed badge reflects current status
    When I scroll to the location strip
    Then the open/closed badge reflects the current status from siteConfig

  # --- Performance & Accessibility ---

  Scenario: No layout shift on page load
    When the homepage loads
    Then the Cumulative Layout Shift (CLS) is less than 0.1

  Scenario: Page loads within performance budget
    Given I am on a mobile device with 3G throttling
    When the homepage loads
    Then the Largest Contentful Paint (LCP) is less than 2.5 seconds

  Scenario: All images have alt text
    When I inspect all img elements on the homepage
    Then every image has a non-empty alt attribute

  Scenario Outline: Homepage is fully responsive
    Given I am viewing at <width>px viewport width
    When the homepage loads
    Then all sections render correctly without horizontal overflow
    And all text is readable

    Examples:
      | width |
      | 375   |
      | 768   |
      | 1280  |

  Scenario: Sections use semantic HTML with aria labels
    When I inspect the page structure
    Then each major section uses a <section> element
    And each section has an aria-labelledby attribute

  Scenario: Keyboard navigation works for all interactive elements
    When I press Tab through the page
    Then all CTA buttons, links, and carousel controls are reachable
    And the carousel is navigable with arrow keys

  Scenario: Color contrast meets WCAG 2.1 AA
    When I measure contrast ratios
    Then CTA button text on terracotta background meets 4.5:1
    And body text on cream background meets 4.5:1
```

## Technical Notes

- Hero section: use `next/image` for optimized food photos, preload the chef GIF
- Featured dishes: Server Component that queries the database for `isFeatured: true` items
- Google Reviews: use Server Component with `fetch` and `next: { revalidate: 86400 }` for 24h caching; store API key in `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` (or a server-only key)
- Animated GIFs: consider using `next/image` with `unoptimized` prop for GIFs, or use `<img>` directly
- Location strip: open/closed logic reads `siteConfig.storeOpen` from the database
- "Order for Pickup" CTA links to `/menu` in Sprint 1; will link to `/menu` with cart focus in Sprint 2
- Use semantic HTML: `<section>` with `aria-labelledby` for each major section

## Dependencies

- S0-01 (Project Setup)
- S0-02 (Design System -- colors, fonts, EtlesPattern)
- S0-03 (Database Schema -- featured items query, siteConfig)
- S0-04 (Layout Shell -- Header/Footer wrap the page)

## Priority

P0

## Story Points

13
