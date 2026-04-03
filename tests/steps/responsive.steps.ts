import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { test } from './fixtures';

const { Given, Then } = createBdd(test);

// ============================================================
// RESPONSIVE — Steps for testing at different viewports
// ============================================================

const viewports: Record<string, { width: number; height: number }> = {
  mobile: { width: 375, height: 812 },
  iphone: { width: 375, height: 812 },
  tablet: { width: 768, height: 1024 },
  ipad: { width: 768, height: 1024 },
  desktop: { width: 1280, height: 720 },
};

Given('I am using a {string} device', async ({ page }, device: string) => {
  const vp = viewports[device.toLowerCase()] ?? { width: 1280, height: 720 };
  await page.setViewportSize(vp);
});

Then('the hamburger menu should be visible', async ({ page }) => {
  await expect(page.getByTestId('hamburger-menu').or(page.getByLabel(/menu/i))).toBeVisible();
});

Then('the hamburger menu should not be visible', async ({ page }) => {
  await expect(page.getByTestId('hamburger-menu')).not.toBeVisible();
});

Then('the desktop navigation should be visible', async ({ page }) => {
  await expect(page.getByTestId('desktop-nav').or(page.locator('nav.desktop-nav'))).toBeVisible();
});

Then('the element {string} should be visible', async ({ page }, testId: string) => {
  await expect(page.getByTestId(testId)).toBeVisible();
});

Then('the element {string} should not be visible', async ({ page }, testId: string) => {
  await expect(page.getByTestId(testId)).not.toBeVisible();
});
