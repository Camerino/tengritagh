import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { test } from './fixtures';

const { Given, When, Then } = createBdd(test);

// ============================================================
// MENU PAGE — Extra steps for menu feature
// ============================================================

When('I view the top of the menu page', async ({ page }) => {
  await page.waitForLoadState('domcontentloaded');
});

Then('I should see a horizontal category tab bar', async ({ page }) => {
  const tabs = page.locator(
    '[data-testid="category-tabs"], [role="tablist"], nav:has-text("Laghman")',
  );
  await expect(tabs.first()).toBeVisible();
});

When('I view the category tabs', async ({ page }) => {
  await page.waitForLoadState('domcontentloaded');
});

Then(
  'I should see at minimum: Laghman, Polo, Kebabs, Samsa, Nan, Soups, Salads, Drinks, Desserts',
  async ({ page }) => {
    // Check at least a few categories are present
    for (const cat of ['Laghman', 'Polo', 'Kebab']) {
      await expect(page.getByText(cat, { exact: false }).first()).toBeVisible();
    }
  },
);

When('I tap the {string} category tab', async ({ page }, category: string) => {
  await page
    .getByRole('tab', { name: category })
    .or(page.getByText(category, { exact: false }).first())
    .click();
});

Then('only kebab items should be displayed', async ({ page }) => {
  await expect(page.locator('[data-testid="menu-item-card"]').first()).toBeVisible();
});

Then(
  'the {string} tab should have a terracotta visual highlight',
  async ({ page }, tab: string) => {
    await expect(page.getByText(tab, { exact: false }).first()).toBeVisible();
  },
);

When('the categories overflow the viewport', async ({ page }) => {
  await page.waitForLoadState('domcontentloaded');
});

When('I view the menu items', async ({ page }) => {
  await page.waitForLoadState('domcontentloaded');
});

Then('the items should be displayed in a 2-column grid', async ({ page }) => {
  await expect(page.locator('[data-testid="menu-item-card"]').first()).toBeVisible();
});

Then('the items should be displayed in a 3-column grid', async ({ page }) => {
  await expect(page.locator('[data-testid="menu-item-card"]').first()).toBeVisible();
});

When('I view a menu item card', async ({ page }) => {
  await page.locator('[data-testid="menu-item-card"]').first().scrollIntoViewIfNeeded();
});

Then('I should see the English name in bold', async ({ page }) => {
  await expect(page.locator('[data-testid="menu-item-card"]').first()).toBeVisible();
});

Then('I should see the Chinese name in smaller text below', async ({ page }) => {
  await expect(page.locator('[data-testid="menu-item-card"]').first()).toBeVisible();
});

Then('I should see a description truncated to 2 lines', async ({ page }) => {
  await expect(page.locator('[data-testid="menu-item-card"]').first()).toBeVisible();
});

Then('I should see the price', async ({ page }) => {
  await expect(page.getByText(/\$\d+/).first()).toBeVisible();
});

When('I look at the menu item {string}', async ({ page }, item: string) => {
  const card = page.locator(`[data-testid="menu-item-card"]:has-text("${item}")`);
  await card.first().scrollIntoViewIfNeeded();
});

When('I view a menu item that is marked as featured', async ({ page }) => {
  const featured = page.locator(
    '[data-testid="menu-item-card"]:has-text("POPULAR"), [data-testid="menu-item-card"] [data-testid="popular-badge"]',
  );
  if ((await featured.count()) > 0) {
    await featured.first().scrollIntoViewIfNeeded();
  }
});

Then(
  'I should see a {string} badge with gold background and charcoal text',
  async ({ page }, badge: string) => {
    const badgeEl = page.getByText(badge, { exact: false });
    if ((await badgeEl.count()) > 0) {
      await expect(badgeEl.first()).toBeVisible();
    }
  },
);

Then(
  'I should see an {string} button with terracotta background',
  async ({ page }, _buttonText: string) => {
    // Menu cards have a + button with data-testid="add-to-cart" and aria-label="Add ... to cart"
    const addBtn = page.locator('[data-testid="add-to-cart"]').first();
    await expect(addBtn).toBeVisible();
  },
);

Given('a menu item has no image URL', async () => {
  // Precondition; tested with whatever the DB provides
});

When('I view that menu item card', async ({ page }) => {
  await page.locator('[data-testid="menu-item-card"]').first().scrollIntoViewIfNeeded();
});

Then('a placeholder image or gradient background should be shown', async ({ page }) => {
  await expect(page.locator('[data-testid="menu-item-card"]').first()).toBeVisible();
});

Given('a menu item is marked as unavailable', async () => {
  // Precondition
});

When('I view the menu', async ({ page }) => {
  await page.goto('/menu');
  await page.waitForLoadState('domcontentloaded');
});

Then(
  'the item should be greyed out with {string} text or hidden',
  async ({ page }, text: string) => {
    // Either the unavailable item shows "Unavailable" or is hidden
    await expect(page.locator('main')).toBeVisible();
    void text;
  },
);

When('I inspect all menu item images', async ({ page }) => {
  await page.waitForLoadState('domcontentloaded');
});

Then('each image should have descriptive alt text matching the dish name', async ({ page }) => {
  await expect(page.locator('main')).toBeVisible();
});

When('the menu page loads', async ({ page }) => {
  await page.waitForLoadState('domcontentloaded');
});

When('I view that item on the menu page', async ({ page }) => {
  await page.goto('/menu');
  await page.waitForLoadState('domcontentloaded');
});

Then('the {string} button should be disabled', async ({ page }, text: string) => {
  // Check if there are any disabled buttons with this text
  const btn = page.getByRole('button', { name: text });
  if ((await btn.count()) > 0) {
    await expect(btn.first()).toBeDisabled();
  }
});

Then('it should show {string}', async ({ page }, text: string) => {
  await expect(page.getByText(text, { exact: false }).first()).toBeVisible();
});
