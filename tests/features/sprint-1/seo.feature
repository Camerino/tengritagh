Feature: SEO and Metadata
  As the restaurant owner
  I want the website to appear in Google search results with rich information
  So that new customers can discover us when searching for Uyghur food near Times Square

  Background:
    Given the restaurant website is loaded

  Scenario Outline: Each page has a unique title
    When I navigate to "<path>"
    Then the page title should contain "<title_fragment>"

    Examples:
      | path      | title_fragment                    |
      | /         | Tengri Tagh Uyghur Cuisine        |
      | /menu     | Menu                              |
      | /about    | Our Story                         |
      | /location | Location                          |

  Scenario Outline: Each page has a meta description
    When I navigate to "<path>"
    Then the meta description should exist
    And the meta description should be between 120 and 160 characters

    Examples:
      | path      |
      | /         |
      | /menu     |
      | /about    |
      | /location |

  Scenario Outline: OpenGraph tags are set on every page
    When I navigate to "<path>"
    Then the page should have an "og:title" meta tag
    And the page should have an "og:description" meta tag
    And the page should have an "og:image" meta tag
    And the page should have an "og:url" meta tag
    And the page should have an "og:type" meta tag

    Examples:
      | path      |
      | /         |
      | /menu     |
      | /about    |
      | /location |

  Scenario: Default OG image is accessible
    When I check the og:image URL on the homepage
    Then the image should be accessible and approximately 1200x630 pixels

  Scenario: Twitter Card tags are set on homepage
    When I navigate to "/"
    Then the page should have twitter:card set to "summary_large_image"
    And the page should have a twitter:title meta tag
    And the page should have a twitter:description meta tag
    And the page should have a twitter:image meta tag

  Scenario: Homepage has Restaurant structured data
    When I inspect the JSON-LD script on the homepage
    Then it should contain "@type" set to "Restaurant"
    And it should contain the restaurant name
    And it should contain an address
    And it should contain a telephone number
    And it should contain servesCuisine including "Uyghur"
    And it should contain openingHoursSpecification
    And it should contain a menu URL

  Scenario: Menu page has structured data with items
    When I inspect the JSON-LD script on "/menu"
    Then it should contain menu item names and prices

  Scenario: robots.txt allows all crawlers
    When I navigate to "/robots.txt"
    Then the file should exist
    And it should allow all crawlers

  Scenario: sitemap.xml lists all public pages
    When I navigate to "/sitemap.xml"
    Then it should list "/"
    And it should list "/menu"
    And it should list "/about"
    And it should list "/location"

  Scenario: HTML lang attribute is set to English
    When I inspect the html element
    Then the lang attribute should be "en"

  Scenario Outline: Canonical URLs are set on each page
    When I navigate to "<path>"
    Then a canonical link element should be present matching the page URL

    Examples:
      | path      |
      | /         |
      | /menu     |
      | /about    |
      | /location |

  Scenario: Chinese dish names in menu page metadata
    When I inspect the meta description on "/menu"
    Then it should include Chinese characters for discoverability
