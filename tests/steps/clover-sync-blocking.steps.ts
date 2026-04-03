import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { test } from './fixtures';

const { Given, When, Then } = createBdd(test);

const MOCK_CLOVER = 'http://localhost:3001';

// ============================================================
// CLOVER SYNC BLOCKING — Steps for S4-01
// Steps that verify the blocking Clover sync flow:
//   loading spinner, error messages, retry, and call CTA
// ============================================================

// --- Mock Clover Configuration ---

Given(
  'the mock Clover service fails the first {int} requests then succeeds',
  async ({ page }, count: number) => {
    await page.request.post(`${MOCK_CLOVER}/__admin/config`, {
      data: { failNext: count, statusCode: 500 },
    });
  },
);

Given('the mock Clover service has a {int} second delay', async ({ page }, delay: number) => {
  await page.request.post(`${MOCK_CLOVER}/__admin/config`, {
    data: { delayMs: delay * 1000, delayCount: 100 },
  });
});

// Note: 'the mock Clover service is restored' is already defined in clover.steps.ts

// --- Loading & Syncing UI ---

Then('I should see a loading spinner', async ({ page }) => {
  await expect(page.getByTestId('loading-spinner')).toBeVisible({ timeout: 5000 });
});

Then(
  'within {int} seconds I should see the order confirmation page',
  async ({ page }, seconds: number) => {
    await page.waitForURL(/\/order\//, { timeout: seconds * 1000 });
    await page.waitForLoadState('domcontentloaded');
  },
);

Then(
  'the order should succeed after approximately {int} seconds',
  async ({ page }, seconds: number) => {
    const start = Date.now();
    await page.waitForURL(/\/order\//, { timeout: (seconds + 3) * 1000 });
    const elapsed = (Date.now() - start) / 1000;
    // Allow 1.5 second tolerance for timing
    expect(elapsed).toBeGreaterThanOrEqual(seconds - 1.5);
    expect(elapsed).toBeLessThanOrEqual(seconds + 1.5);
  },
);

// --- Error State ---

Then('after {int} seconds I should see an error message', async ({ page }, seconds: number) => {
  await expect(page.getByTestId('error-message')).toBeVisible({
    timeout: (seconds + 5) * 1000,
  });
});

Then('the error message should contain {string}', async ({ page }, text: string) => {
  const errorEl = page.getByTestId('error-message');
  await expect(errorEl).toContainText(text);
});

Then('the error message should contain the restaurant phone number', async ({ page }) => {
  const errorEl = page.getByTestId('error-message');
  // Match phone in format (555) 123-4567 or 555-123-4567 or similar
  await expect(errorEl).toContainText(/\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/);
});

When('I see the error message', async ({ page }) => {
  await expect(page.getByTestId('error-message')).toBeVisible({ timeout: 20000 });
});

// --- Buttons & Links ---

// Note: 'I should see a "..." button' is already defined in visibility.steps.ts
// Note: 'I should see a "..." link' is already defined as 'I should see a link "..."' in visibility.steps.ts

Then('I should see a {string} button', async ({ page }, text: string) => {
  await expect(page.getByRole('button', { name: text })).toBeVisible();
});

Then('I should see a {string} link', async ({ page }, text: string) => {
  await expect(page.getByRole('link', { name: text })).toBeVisible();
});

Then(
  'the {string} link should have href {string}',
  async ({ page }, linkText: string, href: string) => {
    const link = page.getByRole('link', { name: linkText });
    await expect(link).toHaveAttribute('href', href);
  },
);

// Note: 'the {string} button should be disabled' is already defined in menu-extra.steps.ts

When('I click {string}', async ({ page }, text: string) => {
  // Try button first, then link
  const btn = page.getByRole('button', { name: text });
  const link = page.getByRole('link', { name: text });
  if (await btn.isVisible().catch(() => false)) {
    await btn.click();
  } else {
    await link.click();
  }
});

// --- Order & Database Verification ---

Then('the order should have Clover sync status {string}', async ({ page }, status: string) => {
  const orderId = page.url().split('/order/')[1];
  if (orderId) {
    await expect
      .poll(
        async () => {
          const res = await page.request.get(`/api/orders/${orderId}/status`);
          const data = await res.json();
          return data.cloverSyncStatus;
        },
        { timeout: 15000 },
      )
      .toBe(status);
  } else {
    // If we're not on the confirmation page (e.g. error state), check via API
    await expect
      .poll(
        async () => {
          const res = await page.request.get('/api/orders/latest/status');
          const data = await res.json();
          return data.cloverSyncStatus;
        },
        { timeout: 15000 },
      )
      .toBe(status);
  }
});

Then('the order should exist in the local database', async ({ page }) => {
  const res = await page.request.get('/api/orders/latest/status');
  expect(res.ok()).toBeTruthy();
  const data = await res.json();
  expect(data.id).toBeTruthy();
});

Then('the order status in the database should be {string}', async ({ page }, status: string) => {
  const res = await page.request.get('/api/orders/latest/status');
  const data = await res.json();
  expect(data.status).toBe(status);
});

Then('the Clover sync status should be {string}', async ({ page }, status: string) => {
  const res = await page.request.get('/api/orders/latest/status');
  const data = await res.json();
  expect(data.cloverSyncStatus).toBe(status);
});

// --- Mobile-Specific ---

Then('the error message should be readable on mobile', async ({ page }) => {
  const errorEl = page.getByTestId('error-message');
  await expect(errorEl).toBeVisible();
  const fontSize = await errorEl.evaluate((el) => {
    return parseFloat(window.getComputedStyle(el).fontSize);
  });
  // Minimum readable font size on mobile
  expect(fontSize).toBeGreaterThanOrEqual(14);
});

Then('the {string} link should be tap-friendly', async ({ page }, linkText: string) => {
  const link = page.getByRole('link', { name: linkText });
  await expect(link).toBeVisible();
  const box = await link.boundingBox();
  expect(box).toBeTruthy();
  // Minimum tap target size (44x44 per WCAG)
  expect(box!.height).toBeGreaterThanOrEqual(44);
});
