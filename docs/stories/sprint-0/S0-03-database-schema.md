# S0-03 Database Schema

## User Story

As a developer, I want a fully defined database schema with seed data, so that the application has a structured data layer with real Uyghur menu items from day one.

## Description

Set up Drizzle ORM with SQLite (better-sqlite3), define all database tables, create migration scripts, and write a seed script that populates the database with real Uyghur dishes including Chinese names (nameZh). The schema must support the full ordering flow planned for Sprint 2-3.

## Feature File

```gherkin
Feature: Database Schema
  As a developer
  I want a fully defined database schema with seed data
  So that the application has a structured data layer with real Uyghur menu items from day one

  Scenario: Schema push creates the database
    Given Drizzle ORM is installed with SQLite (better-sqlite3) driver
    When I run "pnpm db:push"
    Then a database file is created at "./data/tengritagh.db"
    And all tables are created successfully

  Scenario: Categories table has correct columns
    Given the database schema is applied
    When I inspect the "categories" table
    Then it has columns: id (nanoid PK), name, slug, description, sortOrder, imageUrl, createdAt

  Scenario: Menu items table has correct columns including Chinese names
    Given the database schema is applied
    When I inspect the "menuItems" table
    Then it has columns: id (nanoid PK), categoryId (FK), name, nameZh, slug, description, price (integer cents), imageUrl, isAvailable (boolean), isFeatured (boolean), sortOrder, createdAt

  Scenario: Orders table has correct columns
    Given the database schema is applied
    When I inspect the "orders" table
    Then it has columns: id (nanoid PK), orderNumber (sequential integer), customerName, customerPhone, customerEmail, pickupTime, kitchenNote, status, subtotalCents, cloverOrderId, cloverSyncStatus, createdAt, updatedAt
    And the status column supports values: received, preparing, ready, picked_up, cancelled
    And the cloverSyncStatus column supports values: pending, retrying, synced, failed

  Scenario: Order items table has denormalized fields
    Given the database schema is applied
    When I inspect the "orderItems" table
    Then it has columns: id (nanoid PK), orderId (FK), menuItemId (FK), name (denormalized), priceCents (denormalized), quantity, specialInstructions, createdAt

  Scenario: Order status events table exists for audit trail
    Given the database schema is applied
    When I inspect the "orderStatusEvents" table
    Then it has columns: id (nanoid PK), orderId (FK), status, source, createdAt
    And the source column supports values: web, clover, staff

  Scenario: Site config table exists for key-value settings
    Given the database schema is applied
    When I inspect the "siteConfig" table
    Then it has columns: key (PK), value (text)

  Scenario: Seed script runs without errors
    Given the database schema is applied
    When I run "pnpm db:seed"
    Then the seed script completes without errors
    And data is inserted into categories and menuItems tables

  Scenario: Seed data includes sufficient categories
    Given the seed script has been run
    When I query the categories table
    Then at least 9 categories exist including: Laghman, Polo, Kebabs, Samsa, Nan, Soups, Salads, Drinks, Desserts

  Scenario: Seed data includes bilingual menu items
    Given the seed script has been run
    When I query the menuItems table
    Then at least 20 menu items exist across all categories
    And every menu item has a non-empty nameZh value

  Scenario Outline: Bilingual menu items have correct Chinese names
    Given the seed script has been run
    When I query the menuItem with name "<english_name>"
    Then the nameZh field is "<chinese_name>"

    Examples:
      | english_name           | chinese_name |
      | Gouyourou Laghman      | 过油肉拌面    |
      | Suoman Laghman         | 梭蛮拌面      |
      | Big Plate Chicken Noodle | 大盘鸡      |
      | Uyghur Polo            | 手抓饭        |
      | Uyghur Lamb Kawap      | 烤羊肉串      |
      | Lamb Samsa             | 烤包子        |
      | Uyghur Nan Bread       | 馕           |

  Scenario: Featured items are marked for homepage carousel
    Given the seed script has been run
    When I query menuItems where isFeatured is true
    Then at least 4 items are returned

  Scenario: Prices are stored in cents
    Given the seed script has been run
    When I query all menuItems prices
    Then all price values are integers (e.g., 1595 for $15.95)

  Scenario: Primary keys use nanoid format
    Given the seed script has been run
    When I query any table row
    Then the id field is a short alphanumeric nanoid string

  Scenario: Site config has default values
    Given the seed script has been run
    When I query the siteConfig table
    Then a row with key "estimatedWaitMinutes" and value "20" exists
    And a row with key "storeOpen" and value "true" exists

  Scenario: Foreign key constraints are enforced
    Given the database schema is applied
    When I attempt to insert an orderItem with an invalid orderId
    Then the insert fails with a foreign key constraint error

  Scenario: Seed script is idempotent
    Given the seed script has been run once
    When I run "pnpm db:seed" a second time
    Then no duplicate data is created
    And no errors occur
```

## Technical Notes

- Use nanoid for primary keys (short, URL-safe IDs)
- Prices in cents avoid floating-point issues
- Denormalized name/price on orderItems preserves order history even if menu changes
- Place schema definitions in `src/db/schema.ts`
- Place seed script in `src/db/seed.ts`
- Database file location: `./data/tengritagh.db` (gitignored)
- Add `db:push` and `db:seed` scripts to package.json

## Dependencies

- S0-01 (Project Setup)

## Priority

P0

## Story Points

5
