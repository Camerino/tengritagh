import { test, expect } from '@playwright/test';

test.describe('Smoke Tests', () => {
  test('homepage loads and shows restaurant name', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=Tengri Tagh')).toBeVisible();
  });

  test('homepage has navigation links', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('nav a[href="/menu"]').first()).toBeVisible();
  });

  test('homepage has order for pickup CTA', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=Order for Pickup').first()).toBeVisible();
  });

  test('footer is visible with hours', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('footer')).toBeVisible();
    await expect(page.locator('footer')).toContainText('Hours');
  });

  test('page has correct title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Tengri Tagh/);
  });
});
