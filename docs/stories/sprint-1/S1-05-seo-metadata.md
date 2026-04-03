# S1-05 SEO & Metadata

## User Story

As the restaurant owner, I want the website to appear in Google search results with rich information (name, hours, cuisine type, location), so that new customers can discover us when searching for Uyghur food or restaurants near Times Square.

## Description

Implement SEO metadata across all pages using the Next.js Metadata API, including OpenGraph tags for social sharing and structured data (JSON-LD) for Google's rich results. Each page should have a unique title and description. The restaurant structured data should include name, address, cuisine type, hours, phone number, and menu URL.

## Feature File

```gherkin
Feature: SEO and Metadata
  As the restaurant owner
  I want the website to appear in Google search results with rich information
  So that new customers can discover us when searching for Uyghur food near Times Square

  # --- Page Titles ---

  Scenario Outline: Each page has a unique title
    Given I navigate to "<path>"
    When I check the document title
    Then it is "<expected_title>"

    Examples:
      | path      | expected_title                                                          |
      | /         | Tengri Tagh Uyghur Cuisine \| Authentic Uyghur Food Near Times Square   |
      | /menu     | Menu \| Tengri Tagh Uyghur Cuisine                                      |
      | /about    | About \| Tengri Tagh Uyghur Cuisine                                     |
      | /location | Location & Hours \| Tengri Tagh Uyghur Cuisine                          |

  # --- Meta Descriptions ---

  Scenario: Each page has a unique meta description
    Given I navigate to each public page
    When I inspect the meta name="description" tag
    Then each page has a unique description between 120 and 160 characters

  Scenario: Menu page metadata includes Chinese dish names
    Given I navigate to "/menu"
    When I inspect the meta description
    Then it includes Chinese dish names for search discoverability (e.g., "大盘鸡", "烤包子", "手抓饭")

  # --- OpenGraph Tags ---

  Scenario Outline: OpenGraph tags are set on each page
    Given I navigate to "<path>"
    When I inspect the OpenGraph meta tags
    Then og:title is present
    And og:description is present
    And og:image is present
    And og:url is present
    And og:type is present

    Examples:
      | path      |
      | /         |
      | /menu     |
      | /about    |
      | /location |

  Scenario: OG image is accessible and correctly sized
    Given I navigate to "/"
    When I load the og:image URL
    Then the image loads successfully
    And it is approximately 1200x630 pixels

  # --- Twitter Card Tags ---

  Scenario: Twitter Card tags are present
    Given I navigate to "/"
    When I inspect the Twitter Card meta tags
    Then twitter:card is set to "summary_large_image"
    And twitter:title is present
    And twitter:description is present
    And twitter:image is present

  # --- Structured Data (JSON-LD) ---

  Scenario: Homepage has Restaurant structured data
    Given I navigate to "/"
    When I inspect the script tag with type="application/ld+json"
    Then it contains valid JSON-LD with @type "Restaurant"
    And it includes the restaurant name
    And it includes the address
    And it includes the telephone number
    And it includes the url
    And it includes servesCuisine with "Uyghur", "Chinese", "Central Asian"
    And it includes openingHoursSpecification
    And it includes the menu URL
    And it includes priceRange
    And it includes an image

  Scenario: Menu page includes structured data for menu items
    Given I navigate to "/menu"
    When I inspect the structured data
    Then it includes Menu or ItemList structured data with menu item names and prices

  # --- robots.txt and sitemap ---

  Scenario: robots.txt allows all crawlers
    When I navigate to "/robots.txt"
    Then the file exists
    And it allows all crawlers

  Scenario: sitemap.xml lists all public pages
    When I navigate to "/sitemap.xml"
    Then the file exists
    And it lists "/", "/menu", "/about", and "/location"

  # --- HTML Lang & Canonical ---

  Scenario: HTML lang attribute is set
    Given I navigate to "/"
    When I inspect the html tag
    Then lang="en" is present

  Scenario Outline: Canonical URLs are set on each page
    Given I navigate to "<path>"
    When I inspect the link rel="canonical" tag
    Then the canonical URL matches the page URL

    Examples:
      | path      |
      | /         |
      | /menu     |
      | /about    |
      | /location |
```

## Technical Notes

- Use Next.js `metadata` export in each page's `layout.tsx` or `page.tsx` for per-page metadata
- Use `generateMetadata()` for dynamic metadata if needed
- JSON-LD structured data: render a `<script type="application/ld+json">` in the page component
- Reference: https://schema.org/Restaurant for the structured data schema
- OpenGraph image: create a static 1200x630 image or use Next.js OG image generation
- `robots.txt` and `sitemap.xml` can be placed in `src/app/` using Next.js route handlers or static files in `public/`
- Test structured data with Google's Rich Results Test tool

## Dependencies

- S1-01 (Homepage -- page exists to add metadata to)
- S1-02 (Menu Page)
- S1-03 (About Page)
- S1-04 (Location Page)

## Priority

P1

## Story Points

3
