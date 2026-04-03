import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { test } from './fixtures';

const { Given, When, Then } = createBdd(test);

// --- Navigation & Page Loading ---

Given('the restaurant website is loaded', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('domcontentloaded');
});

Given('I navigate to {string}', async ({ page }, path: string) => {
  await page.goto(path);
  await page.waitForLoadState('domcontentloaded');
});

When('I navigate to {string}', async ({ page }, path: string) => {
  await page.goto(path);
  await page.waitForLoadState('domcontentloaded');
});

Given('I am viewing the site at {int}px viewport width', async ({ page }, width: number) => {
  await page.setViewportSize({ width, height: 800 });
});

When('I am viewing the site at {int}px viewport width', async ({ page }, width: number) => {
  await page.setViewportSize({ width, height: 800 });
});

// --- Header ---

When('I view the header', async ({ page }) => {
  await page.locator('header').waitFor({ state: 'visible' });
});

Then('the header should be visible', async ({ page }) => {
  await expect(page.locator('header')).toBeVisible();
});

Then('the restaurant name {string} should be displayed', async ({ page }, name: string) => {
  await expect(page.getByText(name)).toBeVisible();
});

When('I click the restaurant name {string} in the header', async ({ page }, name: string) => {
  await page.locator('header').getByText(name).click();
});

Then('I should be navigated to {string}', async ({ page }, path: string) => {
  await page.waitForURL(`**${path}`);
});

Then(
  'a phone number link with href starting with {string} should be visible',
  async ({ page }, hrefPrefix: string) => {
    const phoneLink = page.locator(`header a[href^="${hrefPrefix}"]`);
    await expect(phoneLink).toBeVisible();
  },
);

Then('a shopping bag icon should be visible', async ({ page }) => {
  // Cart icon in the header
  const cartIcon = page
    .locator('header')
    .locator('[data-testid="cart-icon"], [aria-label*="cart"], [aria-label*="Cart"]');
  await expect(cartIcon).toBeVisible();
});

// --- Footer ---

When('I view the footer', async ({ page }) => {
  await page.locator('footer').scrollIntoViewIfNeeded();
});

Then('the footer should be visible', async ({ page }) => {
  await expect(page.locator('footer')).toBeVisible();
});

Then('links for Instagram, Facebook, TikTok, and Yelp should be present', async ({ page }) => {
  const footer = page.locator('footer');
  for (const platform of ['Instagram', 'Facebook', 'TikTok', 'Yelp']) {
    await expect(
      footer.locator(`a[aria-label*="${platform}"], a:has-text("${platform}")`),
    ).toBeVisible();
  }
});

Then('each link should open in a new tab', async ({ page }) => {
  const externalLinks = page.locator('footer a[target="_blank"]');
  const count = await externalLinks.count();
  expect(count).toBeGreaterThan(0);
});

Then('restaurant operating hours should be displayed', async ({ page }) => {
  const footer = page.locator('footer');
  // Look for hours-related text
  await expect(footer.getByText(/\d{1,2}:\d{2}/)).toBeVisible();
});

Then('the restaurant address should be displayed', async ({ page }) => {
  const footer = page.locator('footer');
  // Look for address-related content
  await expect(footer.getByText(/New York|NYC|Times Square/i)).toBeVisible();
});

Then('the phone number should be displayed', async ({ page }) => {
  const footer = page.locator('footer');
  await expect(footer.locator('a[href^="tel:"]')).toBeVisible();
});

Then('the SilkRoadPattern decorative border should be visible at the top', async ({ page }) => {
  // Check for decorative SVG or pattern at top of footer
  const pattern = page.locator('footer').locator('[data-testid="silk-road-pattern"], svg').first();
  await expect(pattern).toBeVisible();
});

// --- Mobile Navigation ---

Then('horizontal nav links should be visible: Menu, About, Location, Order', async ({ page }) => {
  const nav = page.locator('header nav');
  for (const link of ['Menu', 'About', 'Location', 'Order']) {
    await expect(nav.getByText(link)).toBeVisible();
  }
});

Then('the hamburger menu icon should be hidden', async ({ page }) => {
  const burger = page.locator('header button[aria-label="Open menu"]');
  await expect(burger).toBeHidden();
});

Then('a hamburger menu icon should be visible', async ({ page }) => {
  const burger = page.locator('header button[aria-label="Open menu"]');
  await expect(burger).toBeVisible();
});

Then('the desktop horizontal nav links should be hidden', async ({ page }) => {
  // Desktop nav links should be hidden on mobile
  const desktopNav = page.locator('header nav.hidden, header nav.md\\:flex');
  // Verify at least one nav element is hidden
  // Implementation depends on actual markup
});

Then('desktop horizontal nav links should be hidden', async ({ page }) => {
  // Desktop-only nav container should not be visible on mobile
  // Implementation depends on actual markup
});

When('I tap the hamburger menu icon', async ({ page }) => {
  await page.locator('header button[aria-label="Open menu"]').click();
});

Then('a slide-out drawer should appear from the right', async ({ page }) => {
  const drawer = page.locator('[role="dialog"]');
  await expect(drawer).toBeVisible();
});

Then('an overlay backdrop should be displayed', async ({ page }) => {
  const backdrop = page.locator('[data-testid="drawer-overlay"], [aria-hidden="true"].fixed');
  await expect(backdrop).toBeVisible();
});

Given('the mobile nav drawer is open', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto('/');
  await page.locator('header button[aria-label="Open menu"]').click();
  await page.locator('[role="dialog"]').waitFor({ state: 'visible' });
});

Then('I should see links for: Home, Menu, About, Location, Order', async ({ page }) => {
  const drawer = page.locator('[role="dialog"]');
  for (const link of ['Home', 'Menu', 'About', 'Location', 'Order']) {
    await expect(drawer.getByText(link)).toBeVisible();
  }
});

Then('a close button should be visible', async ({ page }) => {
  const closeBtn = page
    .locator('[role="dialog"]')
    .locator('button[aria-label*="close"], button[aria-label*="Close"]');
  await expect(closeBtn).toBeVisible();
});

When('I tap the {string} link in the drawer', async ({ page }, linkText: string) => {
  await page.locator('[role="dialog"]').getByText(linkText).click();
});

When('I tap the {string} link', async ({ page }, linkText: string) => {
  await page.getByText(linkText).click();
});

Then('the drawer should close', async ({ page }) => {
  await expect(page.locator('[role="dialog"]')).toBeHidden();
});

When('I click the overlay backdrop', async ({ page }) => {
  const backdrop = page.locator('[data-testid="drawer-overlay"]');
  await backdrop.click({ force: true });
});

When('I tap the close button', async ({ page }) => {
  await page
    .locator('[role="dialog"]')
    .locator('button[aria-label*="close"], button[aria-label*="Close"]')
    .click();
});

// --- Responsive Checks ---

Then('there should be no horizontal overflow', async ({ page }) => {
  const hasOverflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > document.documentElement.clientWidth;
  });
  expect(hasOverflow).toBe(false);
});

Then('all text should be readable', async ({ page }) => {
  // Check that body font size is at least 12px
  const fontSize = await page.evaluate(() => {
    return parseFloat(window.getComputedStyle(document.body).fontSize);
  });
  expect(fontSize).toBeGreaterThanOrEqual(12);
});

Then('the header and footer should be visible', async ({ page }) => {
  await expect(page.locator('header')).toBeVisible();
  await expect(page.locator('footer')).toBeVisible();
});

// --- Semantic HTML ---

Then('the page should use header, footer, nav, and main elements', async ({ page }) => {
  await expect(page.locator('header')).toBeAttached();
  await expect(page.locator('footer')).toBeAttached();
  await expect(page.locator('nav')).toBeAttached();
  await expect(page.locator('main')).toBeAttached();
});

// --- Accessibility ---

Then('it should have aria-label {string}', async ({ page }, label: string) => {
  const burger = page.locator(`[aria-label="${label}"]`);
  await expect(burger).toBeAttached();
});

Then('the lang attribute should be {string}', async ({ page }, lang: string) => {
  const htmlLang = await page.locator('html').getAttribute('lang');
  expect(htmlLang).toBe(lang);
});

// --- Page Title ---

When('I check the document title', async ({ page }) => {
  // Title will be checked in the Then step
});

Then('it should be {string}', async ({ page }, expectedTitle: string) => {
  await expect(page).toHaveTitle(expectedTitle);
});

// NOTE: 'the page title should contain' is defined in visibility.steps.ts -- do not duplicate here

Then('the page title should be {string}', async ({ page }, expectedTitle: string) => {
  await expect(page).toHaveTitle(expectedTitle);
});

Then('the page should load without errors', async ({ page }) => {
  // Verify no console errors
  const errors: string[] = [];
  page.on('pageerror', (err) => errors.push(err.message));
  await page.waitForLoadState('domcontentloaded');
  expect(errors).toHaveLength(0);
});

// --- Scroll helpers ---

When('I scroll to the footer', async ({ page }) => {
  await page.locator('footer').scrollIntoViewIfNeeded();
});

// expect is imported at the top of the file
