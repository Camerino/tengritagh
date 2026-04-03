import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { test } from './fixtures';

const { Then } = createBdd(test);

// ============================================================
// VISIBILITY — Generic steps for asserting what's on screen
// ============================================================

Then('I should see {string}', async ({ page }, text: string) => {
  await expect(page.getByText(text, { exact: false }).first()).toBeVisible();
});

Then('I should not see {string}', async ({ page }, text: string) => {
  await expect(page.getByText(text, { exact: false })).not.toBeVisible();
});

Then('I should see a {string} heading', async ({ page }, text: string) => {
  await expect(page.getByRole('heading', { name: text })).toBeVisible();
});

Then(
  'I should see the text {string} in the {string} section',
  async ({ page }, text: string, section: string) => {
    const sectionEl = page
      .locator(`[data-testid="${section}"], section:has-text("${section}")`)
      .first();
    await expect(sectionEl.getByText(text, { exact: false })).toBeVisible();
  },
);

Then('I should see an image with alt text {string}', async ({ page }, alt: string) => {
  await expect(page.getByAltText(alt)).toBeVisible();
});

Then('I should see a link {string}', async ({ page }, text: string) => {
  await expect(page.getByRole('link', { name: text })).toBeVisible();
});

Then('I should see a button {string}', async ({ page }, text: string) => {
  await expect(page.getByRole('button', { name: text })).toBeVisible();
});

Then('the button {string} should be disabled', async ({ page }, text: string) => {
  await expect(page.getByRole('button', { name: text })).toBeDisabled();
});

Then('the button {string} should be enabled', async ({ page }, text: string) => {
  await expect(page.getByRole('button', { name: text })).toBeEnabled();
});

Then('I should see {int} {string} elements', async ({ page }, count: number, testId: string) => {
  await expect(page.getByTestId(testId)).toHaveCount(count);
});

Then('the page title should contain {string}', async ({ page }, title: string) => {
  await expect(page).toHaveTitle(new RegExp(title, 'i'));
});
