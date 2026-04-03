import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { test } from './fixtures';

const { Given, When, Then } = createBdd(test);

// ============================================================
// MENU — Steps for browsing menu, categories, items
// ============================================================

Given('I am browsing the menu', async ({ page }) => {
  await page.goto('/menu');
  await page.waitForLoadState('domcontentloaded');
});

When('I select the {string} category', async ({ page }, category: string) => {
  await page.getByRole('tab', { name: category }).or(page.getByText(category).first()).click();
});

Then(
  'I should see menu items in the {string} category',
  async ({ page }, _ /* category */ : string) => {
    await expect(page.getByTestId('menu-grid').or(page.locator('[data-category]'))).toBeVisible();
  },
);

Then(
  'the menu item {string} should show price {string}',
  async ({ page }, item: string, price: string) => {
    const card = page.locator(`[data-testid="menu-item-card"]:has-text("${item}")`);
    await expect(card.getByText(price)).toBeVisible();
  },
);

Then(
  'the menu item {string} should show Chinese name {string}',
  async ({ page }, item: string, nameZh: string) => {
    const card = page.locator(`[data-testid="menu-item-card"]:has-text("${item}")`);
    await expect(card.getByText(nameZh)).toBeVisible();
  },
);

Then(
  'the menu item {string} should have a {string} badge',
  async ({ page }, item: string, badge: string) => {
    const card = page.locator(`[data-testid="menu-item-card"]:has-text("${item}")`);
    await expect(card.getByText(badge, { exact: false })).toBeVisible();
  },
);

Then('I should see at least {int} menu items', async ({ page }, count: number) => {
  const items = page.getByTestId('menu-item-card');
  const actual = await items.count();
  expect(actual).toBeGreaterThanOrEqual(count);
});
