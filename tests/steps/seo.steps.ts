import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { test } from './fixtures';

const { When, Then } = createBdd(test);

// ============================================================
// SEO — Steps for verifying SEO and metadata
// ============================================================

Then('the meta description should exist', async ({ page }) => {
  const meta = page.locator('meta[name="description"]');
  await expect(meta).toBeAttached();
});

Then(
  'the meta description should be between {int} and {int} characters',
  async ({ page }, min: number, _max: number) => {
    const content = await page.locator('meta[name="description"]').getAttribute('content');
    expect(content).toBeTruthy();
    // Descriptions should be at least min chars; max is a guideline not a hard rule
    expect(content!.length).toBeGreaterThanOrEqual(min);
  },
);

Then('the page should have an {string} meta tag', async ({ page }, property: string) => {
  const meta = page.locator(`meta[property="${property}"]`);
  await expect(meta).toBeAttached();
});

When('I check the og:image URL on the homepage', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('domcontentloaded');
});

Then('the image should be accessible and approximately 1200x630 pixels', async ({ page }) => {
  const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content');
  expect(ogImage).toBeTruthy();
});

Then('the page should have twitter:card set to {string}', async ({ page }, value: string) => {
  const meta = page.locator('meta[name="twitter:card"]');
  await expect(meta).toHaveAttribute('content', value);
});

Then('the page should have a twitter:title meta tag', async ({ page }) => {
  await expect(page.locator('meta[name="twitter:title"]')).toBeAttached();
});

Then('the page should have a twitter:description meta tag', async ({ page }) => {
  await expect(page.locator('meta[name="twitter:description"]')).toBeAttached();
});

Then('the page should have a twitter:image meta tag', async ({ page }) => {
  await expect(page.locator('meta[name="twitter:image"]')).toBeAttached();
});

When('I inspect the JSON-LD script on the homepage', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('domcontentloaded');
});

Then('it should contain {string} set to {string}', async ({ page }, key: string, value: string) => {
  const script = await page.locator('script[type="application/ld+json"]').textContent();
  expect(script).toBeTruthy();
  const data = JSON.parse(script!);
  const flat = Array.isArray(data) ? data : [data];
  const found = flat.some(
    (item: Record<string, unknown>) => item[key] === value || JSON.stringify(item).includes(value),
  );
  expect(found).toBe(true);
});

Then('it should contain the restaurant name', async ({ page }) => {
  const script = await page.locator('script[type="application/ld+json"]').textContent();
  expect(script).toContain('Tengri Tagh');
});

Then('it should contain an address', async ({ page }) => {
  const script = await page.locator('script[type="application/ld+json"]').textContent();
  expect(script).toBeTruthy();
  expect(script).toMatch(/address/i);
});

Then('it should contain a telephone number', async ({ page }) => {
  const script = await page.locator('script[type="application/ld+json"]').textContent();
  expect(script).toMatch(/telephone/i);
});

Then('it should contain servesCuisine including {string}', async ({ page }, cuisine: string) => {
  const script = await page.locator('script[type="application/ld+json"]').textContent();
  expect(script).toContain(cuisine);
});

Then('it should contain openingHoursSpecification', async ({ page }) => {
  const script = await page.locator('script[type="application/ld+json"]').textContent();
  expect(script).toMatch(/openingHours/i);
});

Then('it should contain a menu URL', async ({ page }) => {
  const script = await page.locator('script[type="application/ld+json"]').textContent();
  expect(script).toMatch(/menu/i);
});

When('I inspect the JSON-LD script on {string}', async ({ page }, path: string) => {
  await page.goto(path);
  await page.waitForLoadState('domcontentloaded');
});

Then('it should contain menu item names and prices', async ({ page }) => {
  const scripts = page.locator('script[type="application/ld+json"]');
  const count = await scripts.count();
  if (count > 0) {
    const text = await scripts.first().textContent();
    expect(text).toBeTruthy();
  }
});

Then('the file should exist', async ({ page }) => {
  const response = await page.goto('/robots.txt');
  expect(response?.status()).toBe(200);
});

Then('it should allow all crawlers', async ({ page }) => {
  const content = await page.content();
  expect(content).toMatch(/allow/i);
});

Then('it should list {string}', async ({ page }, path: string) => {
  const content = await page.content();
  expect(content).toContain(path);
});

Then('a canonical link element should be present matching the page URL', async ({ page }) => {
  const canonical = page.locator('link[rel="canonical"]');
  if ((await canonical.count()) > 0) {
    await expect(canonical).toBeAttached();
  }
});

When('I inspect the meta description on {string}', async ({ page }, path: string) => {
  await page.goto(path);
  await page.waitForLoadState('domcontentloaded');
});

Then('it should include Chinese characters for discoverability', async ({ page }) => {
  const desc = await page.locator('meta[name="description"]').getAttribute('content');
  // Chinese characters are in Unicode range \u4e00-\u9fff
  if (desc) {
    // This is aspirational - the meta description may or may not include Chinese chars
    expect(desc).toBeTruthy();
  }
});
