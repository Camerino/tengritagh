Feature: Menu Page
  As a customer
  I want to browse the restaurant's menu organized by category with bilingual names and clear pricing
  So that I can decide what to order

  Background:
    Given the restaurant website is loaded
    And I navigate to "/menu"

  # --- Category Tabs ---

  Scenario: Category tab bar is displayed
    When I view the top of the menu page
    Then I should see a horizontal category tab bar

  Scenario: All categories are loaded from database
    When I view the category tabs
    Then I should see at minimum: Laghman, Polo, Kebabs, Samsa, Nan, Soups, Salads, Drinks, Desserts

  Scenario: Tapping a category filters menu items
    When I tap the "Kebabs" category tab
    Then only kebab items should be displayed

  Scenario: Active category tab is highlighted
    When I tap the "Polo" category tab
    Then the "Polo" tab should have a terracotta visual highlight

  Scenario: Category tabs scroll horizontally on mobile
    Given I am viewing the site at 375px viewport width
    When the categories overflow the viewport
    Then the category tabs should be horizontally scrollable

  # --- Menu Item Cards ---

  Scenario: Menu items in 2-column grid on mobile
    Given I am viewing the site at 375px viewport width
    When I view the menu items
    Then the items should be displayed in a 2-column grid

  Scenario: Menu items in 3-column grid on desktop
    Given I am viewing the site at 1280px viewport width
    When I view the menu items
    Then the items should be displayed in a 3-column grid

  Scenario: Menu card shows bilingual names and details
    When I view a menu item card
    Then I should see the English name in bold
    And I should see the Chinese name in smaller text below
    And I should see a description truncated to 2 lines
    And I should see the price

  Scenario Outline: Menu items show correct Chinese names
    When I look at the menu item "<english_name>"
    Then I should see the Chinese name "<chinese_name>"

    Examples:
      | english_name               | chinese_name |
      | Gouyourou Laghman          | 过油肉拌面   |
      | Suoman                     | 炒面         |
      | Big Plate Chicken Laghman  | 大盘鸡拌面   |
      | Uyghur Polo                | 手抓饭       |
      | Lamb Samsa                 | 烤包子       |
      | Plain Nan                  | 馕           |

  Scenario: Featured items display POPULAR badge
    When I view a menu item that is marked as featured
    Then I should see a "POPULAR" badge with gold background and charcoal text

  Scenario: Add to Cart button is rendered on each card
    When I view a menu item card
    Then I should see an "Add to Cart" button with terracotta background

  Scenario: Placeholder shown for items without image
    Given a menu item has no image URL
    When I view that menu item card
    Then a placeholder image or gradient background should be shown

  Scenario: Unavailable items are indicated
    Given a menu item is marked as unavailable
    When I view the menu
    Then the item should be greyed out with "Unavailable" text or hidden

  # --- General ---

  Scenario: Page title is correct
    When I check the document title
    Then it should be "Menu | Tengri Tagh Uyghur Cuisine"

  Scenario: All menu item images have alt text
    When I inspect all menu item images
    Then each image should have descriptive alt text matching the dish name

  Scenario Outline: Menu page is fully responsive
    Given I am viewing the site at <width>px viewport width
    When the menu page loads
    Then there should be no horizontal overflow
    And all content should be readable

    Examples:
      | width |
      | 375   |
      | 768   |
      | 1280  |
