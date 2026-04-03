import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { test } from './fixtures';

const { Given, When, Then } = createBdd(test);

// ============================================================
// ORDER STATUS — Steps for tracking order status
// ============================================================

Then('the order status should be {string}', async ({ page }, status: string) => {
  await expect(page.getByText(status, { exact: false })).toBeVisible();
});

Then('the status tracker should show {string} as active', async ({ page }, step: string) => {
  const tracker = page.getByTestId('status-tracker');
  await expect(tracker.getByText(step)).toBeVisible();
});

When('the order status changes to {string}', async ({ page, state }, status: string) => {
  // Map internal status names to Clover state values
  const statusToCloverState: Record<string, string> = {
    received: 'open',
    preparing: 'preparing',
    ready: 'fulfilled',
    cancelled: 'cancelled',
  };
  const cloverState = statusToCloverState[status.toLowerCase()] ?? status;
  const orderId = state['orderId'] as string;
  if (orderId) {
    await page.request.put(`http://localhost:3001/v3/merchants/TEST_MERCHANT/orders/${orderId}`, {
      data: { state: cloverState },
      headers: { Authorization: 'Bearer test-token' },
    });
  }
});

Then('I should see a notification that my order is ready', async ({ page }) => {
  await expect(page.getByText(/ready/i)).toBeVisible({ timeout: 35000 });
});
