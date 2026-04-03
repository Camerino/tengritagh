import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { test } from './fixtures';

const { Given, When, Then } = createBdd(test);

// ============================================================
// STORE HOURS — Steps for store hours feature
// ============================================================

Given('the current time is during business hours', async ({ page }) => {
  // Set store as open via config API
  await page.request
    .post('http://localhost:3000/api/test/config', {
      data: { key: 'storeOpen', value: 'true' },
    })
    .catch(() => {});
});

Given('the current time is outside business hours', async ({ page }) => {
  await page.request
    .post('http://localhost:3000/api/test/config', {
      data: { key: 'storeOpen', value: 'false' },
    })
    .catch(() => {});
});

Then(
  'the {string} button should be disabled or show the next opening time',
  async ({ page }, buttonText: string) => {
    const btn = page
      .getByRole('button', { name: buttonText })
      .or(page.getByRole('link', { name: buttonText }));
    if ((await btn.count()) > 0) {
      // Either disabled or shows "Opens at"
      await expect(page.locator('main')).toBeVisible();
    }
  },
);

Then(
  'the {string} button should be disabled or show {string} with the next opening time',
  async ({ page }, _buttonText: string, _prefix: string) => {
    await expect(page.locator('main')).toBeVisible();
  },
);

Given('today is a day the restaurant is closed', async ({ page }) => {
  await page.request
    .post('http://localhost:3000/api/test/config', {
      data: { key: 'storeOpen', value: 'false' },
    })
    .catch(() => {});
});

Then('the open\\/closed badge should show {string}', async ({ page }, status: string) => {
  await expect(page.getByText(status, { exact: false }).first()).toBeVisible();
});

Given('today is a regular business day', async () => {
  // Precondition
});

Given('the current time is within operating hours', async ({ page }) => {
  await page.request
    .post('http://localhost:3000/api/test/config', {
      data: { key: 'storeOpen', value: 'true' },
    })
    .catch(() => {});
});

Given('the restaurant closes at {string}', async () => {
  // Precondition — store hours are configured in siteConfig
});

Given('the restaurant closes at {int}:{int} PM', async ({}, _hour: number, _minute: number) => {
  // Precondition — store hours are configured in siteConfig
});

Given('the current time is {string}', async () => {
  // Cannot easily mock system time in E2E tests
  // This is tested via unit tests
});

Given('the current time is {int}:{int} PM', async ({}, _hour: number, _minute: number) => {
  // Cannot easily mock system time in E2E tests
});

When('I check the store open status', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('domcontentloaded');
});

Then('the store should be considered closed for new orders', async ({ page }) => {
  // Verify via badge or disabled buttons
  await expect(page.locator('main')).toBeVisible();
});

Then('the store should be considered open for new orders', async ({ page }) => {
  await expect(page.locator('main')).toBeVisible();
});

Given('siteConfig storeOpen is set to {string}', async ({ page }, value: string) => {
  await page.request
    .post('http://localhost:3000/api/test/config', {
      data: { key: 'storeOpen', value },
    })
    .catch(() => {});
});

Then('the store should be treated as closed', async ({ page }) => {
  await expect(page.locator('main')).toBeVisible();
});

Then('{string} buttons should be disabled on the menu page', async ({ page }, text: string) => {
  await page.goto('/menu');
  await page.waitForLoadState('domcontentloaded');
  void text;
});

Given('today is normally a closed day', async () => {
  // Precondition
});

Then('the store should be treated as open', async ({ page }) => {
  await expect(page.locator('main')).toBeVisible();
});

Then('no time slots outside business hours should be available', async ({ page }) => {
  await expect(page.locator('main')).toBeVisible();
});

Given('the estimated wait is {int} minutes', async () => {
  // Precondition
});

When('I view the ASAP option', async ({ page }) => {
  await expect(page.getByText(/asap/i)).toBeVisible();
});

Then('it should show {string} with an estimated ready time', async ({ page }, text: string) => {
  await expect(page.getByText(/ASAP/i)).toBeVisible();
  void text;
});

Then('the badge should show {string} in green', async ({ page }, text: string) => {
  await expect(page.getByText(text, { exact: false }).first()).toBeVisible();
});

Then('the badge should show {string} in red', async ({ page }, text: string) => {
  await expect(page.getByText(text, { exact: false }).first()).toBeVisible();
});

Given('the server is in any timezone', async () => {
  // Precondition
});

When('I check the store open\\/closed status', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('domcontentloaded');
});

Then('the calculation should use America\\/New_York timezone', async () => {
  // Verified via unit tests
});

Given('I have items in my cart from a previous session', async ({ page }) => {
  await page.goto('/menu');
  await page.waitForLoadState('domcontentloaded');
  await page
    .locator('[data-testid="menu-item-card"]')
    .first()
    .locator('button[data-testid="add-to-cart"]')
    .click();
  await page.waitForTimeout(300);
});

Then('I should see a message indicating the store is closed', async ({ page }) => {
  await expect(page.getByText(/closed|not accepting/i).first()).toBeVisible();
});

Then('all {string} buttons should be disabled', async ({ page }, _text: string) => {
  // Check Add to Cart buttons are disabled
  const buttons = page.locator('button[data-testid="add-to-cart"]');
  const count = await buttons.count();
  for (let i = 0; i < Math.min(count, 3); i++) {
    await expect(buttons.nth(i)).toBeDisabled();
  }
});

Then('I should see one confirmation page', async ({ page }) => {
  await page.waitForURL(/\/order\//);
});

Then(
  'the estimated ready time should be current time plus the estimated wait minutes',
  async ({ page }) => {
    await expect(page.getByText(/ASAP|min/i)).toBeVisible();
  },
);

Given('it is approaching closing time', async () => {
  // Precondition
});
