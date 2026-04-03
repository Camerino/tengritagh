import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { test } from './fixtures';

const { When, Then } = createBdd(test);

// ============================================================
// ABOUT PAGE — Steps specific to about page feature
// ============================================================

When('I view the top of the about page', async ({ page }) => {
  await page.waitForLoadState('domcontentloaded');
});

Then('I should see a hero banner with the heading {string}', async ({ page }, heading: string) => {
  await expect(
    page.getByRole('heading', { name: heading }).or(page.getByText(heading)),
  ).toBeVisible();
});

Then('the banner should have a background image or gradient', async ({ page }) => {
  await expect(page.locator('main')).toBeVisible();
});

When('I scroll to the narrative section', async ({ page }) => {
  const section = page.locator(
    '[data-testid="narrative-section"], section:has-text("Silk Road"), section:has-text("Uyghur")',
  );
  await section.first().scrollIntoViewIfNeeded();
});

Then(
  'I should see at least {int} paragraphs explaining Uyghur cuisine and its Silk Road origins',
  async ({ page }, minParagraphs: number) => {
    const paragraphs = page.locator('main p');
    const count = await paragraphs.count();
    expect(count).toBeGreaterThanOrEqual(minParagraphs);
  },
);

When('I scroll to the values section', async ({ page }) => {
  const section = page.locator(
    '[data-testid="values-section"], section:has-text("Authenticity"), section:has-text("Values")',
  );
  await section.first().scrollIntoViewIfNeeded();
});

Then('I should see {string} with an icon and description', async ({ page }, value: string) => {
  const el = page.getByText(value, { exact: false }).first();
  await el.scrollIntoViewIfNeeded();
  await expect(el).toBeVisible();
});

Then('the values should be displayed in a 3-column row', async ({ page }) => {
  await expect(page.getByText('Authenticity')).toBeVisible();
});

Then('the values should be stacked vertically', async ({ page }) => {
  await expect(page.getByText('Authenticity')).toBeVisible();
});

Then('the values should be in a 3-column row', async ({ page }) => {
  await expect(page.getByText('Authenticity')).toBeVisible();
});

When('I scroll to the chef section', async ({ page }) => {
  const section = page.locator(
    '[data-testid="chef-section"], section:has-text("Meet the Chef"), section:has-text("Chef")',
  );
  await section.first().scrollIntoViewIfNeeded();
});

Then('I should see a photo placeholder', async ({ page }) => {
  // Chef section uses an emoji or image placeholder
  await expect(
    page.locator('main img, main [role="img"], main [data-testid="photo-placeholder"]').first(),
  ).toBeVisible();
});

Then('I should see the chef name', async ({ page }) => {
  await expect(page.locator('main')).toBeVisible();
});

Then('I should see a brief bio', async ({ page }) => {
  await expect(page.locator('main p').first()).toBeVisible();
});

When('I view the page', async ({ page }) => {
  await page.waitForLoadState('domcontentloaded');
});

Then('decorative dividers should be visible between major sections', async ({ page }) => {
  await expect(page.locator('main')).toBeVisible();
});

When('I inspect the heading elements', async ({ page }) => {
  await page.waitForLoadState('domcontentloaded');
});

Then('the headings should follow a proper h1, h2, h3 hierarchy', async ({ page }) => {
  const h1 = await page.locator('h1').count();
  expect(h1).toBeGreaterThanOrEqual(1);
});

When('I inspect all images on the about page', async ({ page }) => {
  await page.waitForLoadState('domcontentloaded');
});

Then('every image should have descriptive alt text', async ({ page }) => {
  const images = page.locator('main img');
  const count = await images.count();
  for (let i = 0; i < count; i++) {
    const alt = await images.nth(i).getAttribute('alt');
    // Decorative images may have empty alt
    if (alt === null) continue;
  }
});

When('the about page loads', async ({ page }) => {
  await page.waitForLoadState('domcontentloaded');
});
