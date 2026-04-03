Feature: Homepage
  As a hungry customer near Times Square
  I want a visually stunning homepage that showcases Uyghur cuisine
  So that I feel excited about the food and can quickly place a pickup order

  Background:
    Given the restaurant website is loaded

  # --- Hero Section ---

  Scenario: Etles pattern stripe is visible in hero
    When I view the hero section
    Then I should see a horizontal etles pattern stripe

  Scenario: Chef GIF is displayed in circular frame
    When I view the hero section
    Then I should see an animated GIF of a chef hand-pulling noodles in a circular frame

  Scenario: Uyghur script is displayed as decoration
    When I view the hero section
    Then I should see the Uyghur script text as a decorative element

  Scenario: Restaurant name in Playfair Display font
    When I view the hero section
    Then I should see "Tengri Tagh Uyghur Cuisine" in Playfair Display font

  Scenario: Times Square link opens Google Maps
    When I click "Near Times Square, NYC" in the hero section
    Then Google Maps should open in a new tab

  Scenario: Order for Pickup CTA links to menu
    When I click the "Order for Pickup" button in the hero
    Then I should be navigated to "/menu"

  Scenario: View Menu CTA links to menu
    When I click the "View Menu" button in the hero
    Then I should be navigated to "/menu"

  Scenario: Food photos displayed below CTAs
    When I view the hero section
    Then I should see food photos of laghman and kawap

  Scenario: Hero stacks vertically on mobile
    Given I am viewing the site at 375px viewport width
    When I view the hero section
    Then the hero layout should be stacked vertically

  Scenario: Hero is side-by-side on desktop
    Given I am viewing the site at 1280px viewport width
    When I view the hero section
    Then the hero layout should be side-by-side

  # --- Featured Dishes Section ---

  Scenario: Featured dishes are displayed from database
    When I scroll to the featured dishes section
    Then I should see between 3 and 6 featured menu items

  Scenario: Featured dish cards show bilingual names and price
    When I scroll to the featured dishes section
    Then each featured dish card should show an image
    And each card should show the English name
    And each card should show the Chinese name
    And each card should show the price

  Scenario Outline: Featured dish shows correct Chinese name
    When I view the featured dish "<english_name>"
    Then I should see the Chinese name "<chinese_name>"

    Examples:
      | english_name               | chinese_name |
      | Big Plate Chicken Laghman  | 大盘鸡拌面   |
      | Uyghur Polo                | 手抓饭       |
      | Lamb Samsa                 | 烤包子       |

  Scenario: Featured dishes scroll horizontally on mobile
    Given I am viewing the site at 375px viewport width
    When I scroll to the featured dishes section
    Then the featured dishes should be horizontally scrollable

  Scenario: Featured dishes in 3-column grid on desktop
    Given I am viewing the site at 1280px viewport width
    When I scroll to the featured dishes section
    Then the featured dishes should be displayed in a 3-column grid

  # --- Freshly Made Section ---

  Scenario: Freshly Made heading is displayed
    When I scroll to the freshly made section
    Then I should see the heading "Freshly Made for Every Order"

  Scenario: Freshly Made GIF circles are visible
    When I scroll to the freshly made section
    Then I should see animated GIF circles in circular frames with consistent sizing

  # --- Google Reviews Section ---

  Scenario: Google reviews are displayed
    When I scroll to the reviews section
    Then I should see 3 to 4 Google reviews
    And each review should show a star rating, reviewer name, review text, and date

  Scenario: Reviews carousel on mobile
    Given I am viewing the site at 375px viewport width
    When I scroll to the reviews section
    Then the reviews should be displayed in a carousel format

  Scenario: Reviews grid on desktop
    Given I am viewing the site at 1280px viewport width
    When I scroll to the reviews section
    Then the reviews should be displayed in a grid layout

  Scenario: Reviews graceful degradation
    Given the Google Places API is unavailable
    When the homepage loads
    Then the reviews section should be hidden or show a fallback

  # --- Order Platforms Section ---

  Scenario: Third-party platform links are displayed
    When I scroll to the order platforms section
    Then I should see branded links for "DoorDash", "Uber Eats", and "Grubhub"

  Scenario: Platform links open in new tab
    When I click the "DoorDash" platform link
    Then it should open in a new tab with the correct URL

  # --- About Teaser Section ---

  Scenario: About teaser paragraph is displayed
    When I scroll to the about teaser section
    Then I should see a brief paragraph about Uyghur cuisine

  Scenario: Learn More link navigates to about page
    When I click the "Learn More" link in the about teaser
    Then I should be navigated to "/about"

  # --- Location Strip ---

  Scenario: Location strip shows essential info
    When I scroll to the location strip
    Then I should see a map thumbnail
    And I should see the restaurant address
    And I should see a phone number
    And I should see restaurant hours
    And I should see an open/closed badge

  Scenario: Location strip address opens Google Maps
    When I click the address in the location strip
    Then Google Maps should open in a new tab

  Scenario: Location strip phone is a tel link
    When I inspect the phone number in the location strip
    Then the phone link href should start with "tel:"

  Scenario: Open/closed badge reflects store status
    When I view the location strip
    Then the open/closed badge should reflect the current status from siteConfig

  # --- General ---

  Scenario: All images have alt text
    When I inspect all images on the homepage
    Then every image should have a non-empty alt attribute

  Scenario Outline: Homepage is fully responsive
    Given I am viewing the site at <width>px viewport width
    When the homepage loads
    Then there should be no horizontal overflow
    And all text should be readable

    Examples:
      | width |
      | 375   |
      | 768   |
      | 1280  |
