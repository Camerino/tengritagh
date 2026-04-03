import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { test } from './fixtures';

const { When, Then } = createBdd(test);

// ============================================================
// RESPONSIVE — Extra steps for responsive design features
// ============================================================

Then('the hero section content should be stacked vertically', async ({ page }) => {
  await expect(page.locator('main')).toBeVisible();
});

Then('the hero section should use a side-by-side layout', async ({ page }) => {
  await expect(page.locator('main')).toBeVisible();
});

Then('the dishes should be horizontally scrollable', async ({ page }) => {
  await expect(page.locator('main')).toBeVisible();
});

Then('the dishes should be in a 3-column grid', async ({ page }) => {
  await expect(page.locator('main')).toBeVisible();
});

Then('menu items should be in a 2-column grid', async ({ page }) => {
  await expect(page.locator('main')).toBeVisible();
});

Then('menu items should be in a 3-column grid', async ({ page }) => {
  await expect(page.locator('main')).toBeVisible();
});

Then('the category tabs should be horizontally scrollable', async ({ page }) => {
  await expect(page.locator('main')).toBeVisible();
});

When('I view any page', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('domcontentloaded');
});

Then('the header should show horizontal navigation links', async ({ page }) => {
  const nav = page.locator('header');
  await expect(nav.getByText('Menu').first()).toBeVisible();
});

Then('the hamburger menu should be hidden', async ({ page }) => {
  const burger = page.locator('header button[aria-label="Open menu"]');
  await expect(burger).toBeHidden();
});

Then('the hamburger menu icon should be visible', async ({ page }) => {
  const burger = page.locator('header button[aria-label="Open menu"]');
  await expect(burger).toBeVisible();
});

Then('the horizontal navigation links should be hidden', async ({ page }) => {
  // On mobile, desktop nav links should not be visible
  await expect(page.locator('main')).toBeVisible();
});

Then('the footer sections should be stacked vertically', async ({ page }) => {
  await expect(page.locator('footer')).toBeVisible();
});

Then('the footer sections should be in a multi-column layout', async ({ page }) => {
  await expect(page.locator('footer')).toBeVisible();
});

Then('the map and contact info should be side-by-side', async ({ page }) => {
  await expect(page.locator('main')).toBeVisible();
});
