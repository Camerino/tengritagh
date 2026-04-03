import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { test } from './fixtures';

const { When, Then } = createBdd(test);

// ============================================================
// FORM — Reusable steps for filling forms and inputs
// ============================================================

When('I fill in {string} with {string}', async ({ page }, label: string, value: string) => {
  await page.getByLabel(label, { exact: false }).fill(value);
});

When('I clear the {string} field', async ({ page }, label: string) => {
  await page.getByLabel(label, { exact: false }).clear();
});

When('I select {string} from {string}', async ({ page }, option: string, label: string) => {
  await page.getByLabel(label, { exact: false }).selectOption({ label: option });
});

When('I check {string}', async ({ page }, label: string) => {
  await page.getByLabel(label, { exact: false }).check();
});

When(
  'I type {string} in the {string} field',
  async ({ page }, text: string, placeholder: string) => {
    await page.getByPlaceholder(placeholder).fill(text);
  },
);

Then(
  'the {string} field should have value {string}',
  async ({ page }, label: string, value: string) => {
    await expect(page.getByLabel(label, { exact: false })).toHaveValue(value);
  },
);

Then('the {string} field should be empty', async ({ page }, label: string) => {
  await expect(page.getByLabel(label, { exact: false })).toHaveValue('');
});

Then('I should see a validation error {string}', async ({ page }, message: string) => {
  await expect(page.getByText(message, { exact: false })).toBeVisible();
});

Then('I should see no validation errors', async ({ page }) => {
  await expect(page.locator('[data-testid="error"], .error-message, [role="alert"]')).toHaveCount(
    0,
  );
});
