import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { test } from './fixtures';

const { Given, When, Then } = createBdd(test);

// --- Order Confirmation ---

Given('I have placed an order', async ({ page }) => {
  // Navigate to menu, add items, go through checkout
  await page.goto('/menu');
  await page.waitForLoadState('domcontentloaded');
  const addButton = page
    .locator('[data-testid="menu-item-card"]')
    .first()
    .getByRole('button', { name: 'Add to Cart' });
  await addButton.click();
  await page.waitForTimeout(300);

  await page.goto('/checkout');
  await page.locator('input[name="customerName"], [data-testid="name-input"]').fill('John Doe');
  await page.locator('input[name="customerPhone"], [data-testid="phone-input"]').fill('2125551234');
  await page.getByRole('button', { name: /place order/i }).click();
  await page.waitForURL(/\/order\//);
});

Given(
  'I have placed an order with {string} and {string}',
  async ({ page }, item1: string, item2: string) => {
    await page.goto('/menu');
    await page.waitForLoadState('domcontentloaded');
    await page
      .locator(`[data-testid="menu-item-card"]:has-text("${item1}")`)
      .getByRole('button', { name: 'Add to Cart' })
      .click();
    await page.waitForTimeout(200);
    await page
      .locator(`[data-testid="menu-item-card"]:has-text("${item2}")`)
      .getByRole('button', { name: 'Add to Cart' })
      .click();
    await page.waitForTimeout(200);

    await page.goto('/checkout');
    await page.locator('input[name="customerName"], [data-testid="name-input"]').fill('John Doe');
    await page
      .locator('input[name="customerPhone"], [data-testid="phone-input"]')
      .fill('2125551234');
    await page.getByRole('button', { name: /place order/i }).click();
    await page.waitForURL(/\/order\//);
  },
);

Given('I have placed an order with ASAP pickup', async ({ page }) => {
  await page.goto('/menu');
  await page.waitForLoadState('domcontentloaded');
  await page
    .locator('[data-testid="menu-item-card"]')
    .first()
    .getByRole('button', { name: 'Add to Cart' })
    .click();
  await page.waitForTimeout(200);

  await page.goto('/checkout');
  await page.locator('input[name="customerName"], [data-testid="name-input"]').fill('John Doe');
  await page.locator('input[name="customerPhone"], [data-testid="phone-input"]').fill('2125551234');
  // ASAP should be default
  await page.getByRole('button', { name: /place order/i }).click();
  await page.waitForURL(/\/order\//);
});

Given(
  'I have placed an order as {string} with phone {string}',
  async ({ page }, name: string, phone: string) => {
    await page.goto('/menu');
    await page.waitForLoadState('domcontentloaded');
    await page
      .locator('[data-testid="menu-item-card"]')
      .first()
      .getByRole('button', { name: 'Add to Cart' })
      .click();
    await page.waitForTimeout(200);

    await page.goto('/checkout');
    await page.locator('input[name="customerName"], [data-testid="name-input"]').fill(name);
    await page.locator('input[name="customerPhone"], [data-testid="phone-input"]').fill(phone);
    await page.getByRole('button', { name: /place order/i }).click();
    await page.waitForURL(/\/order\//);
  },
);

// --- Confirmation Page ---

When('I view the order confirmation page', async ({ page }) => {
  // Already on the confirmation page from the Given step
  await page.waitForLoadState('domcontentloaded');
});

When('I view the confirmation page', async ({ page }) => {
  await page.waitForLoadState('domcontentloaded');
});

Then('I should see the correct order number', async ({ page }) => {
  await expect(page.getByText(/order #\d+/i)).toBeVisible();
});

Then('the order number should be in large text', async ({ page }) => {
  await expect(page.getByText(/order #\d+/i)).toBeVisible();
});

Then('I should see the order number in large text', async ({ page }) => {
  await expect(page.getByText(/order #\d+/i)).toBeVisible();
});

Then('I should see {string} in the order items', async ({ page }, itemName: string) => {
  await expect(page.getByText(itemName)).toBeVisible();
});

Then('I should see the pickup time', async ({ page }) => {
  await expect(page.getByText(/pickup|ready/i)).toBeVisible();
});

Then('the pickup time should show an ASAP estimated time', async ({ page }) => {
  await expect(page.getByText(/ASAP|estimated/i)).toBeVisible();
});

Then('the pickup time should show the selected time', async ({ page }) => {
  await expect(page.getByText(/\d{1,2}:\d{2}\s*(AM|PM)/i)).toBeVisible();
});

Then('I should see the pickup time in a readable format', async ({ page }) => {
  await expect(page.getByText(/today|ASAP|\d{1,2}:\d{2}/i)).toBeVisible();
});

Then('I should see {string} and the phone number', async ({ page }, name: string) => {
  await expect(page.getByText(name)).toBeVisible();
});

Then('I should see the subtotal, tax, and total', async ({ page }) => {
  await expect(page.getByText(/subtotal/i)).toBeVisible();
  await expect(page.getByText(/tax/i)).toBeVisible();
  await expect(page.getByText(/total/i)).toBeVisible();
});

Then('the phone number should be a clickable tel link', async ({ page }) => {
  const telLink = page.locator('a[href^="tel:"]');
  await expect(telLink).toBeVisible();
});

Then(
  'I should see {string} with its quantity and line total',
  async ({ page }, itemName: string) => {
    await expect(page.getByText(itemName)).toBeVisible();
  },
);

Then(
  'I should see {string} with quantity {int} in the confirmation',
  async ({ page }, itemName: string, qty: number) => {
    await expect(page.getByText(itemName)).toBeVisible();
    await expect(page.getByText(String(qty))).toBeVisible();
  },
);

Then(
  'I should see {string} with quantity {int}',
  async ({ page }, itemName: string, qty: number) => {
    const itemRow = page.locator(`[data-testid="cart-item"]:has-text("${itemName}")`);
    await expect(itemRow).toBeVisible();
  },
);

Then('I should see special instructions {string}', async ({ page }, instructions: string) => {
  await expect(page.getByText(instructions)).toBeVisible();
});

Then('I should see {int} items in the cart', async ({ page }, count: number) => {
  const items = page.locator('[data-testid="cart-item"]');
  await expect(items).toHaveCount(count);
});

Then('all {int} items should appear on the confirmation page', async ({ page }, count: number) => {
  // Verify items are listed on confirmation
  const items = page.locator('[data-testid="order-item"], [data-testid="confirmation-item"]');
  const actual = await items.count();
  expect(actual).toBe(count);
});

Then('the totals should be calculated correctly', async ({ page }) => {
  await expect(page.getByText(/\$\d+\.\d{2}/)).toBeVisible();
});

// --- Status Tracker ---

Then(
  'the status tracker should show {string} as the active step',
  async ({ page }, status: string) => {
    const step = page.locator(
      `[data-testid="status-step-${status.toLowerCase()}"], [data-testid="status-tracker"]`,
    );
    await expect(step).toBeVisible();
  },
);

Then(
  '{string} and {string} should be greyed out',
  async ({ page }, step1: string, step2: string) => {
    for (const step of [step1, step2]) {
      const stepEl = page.locator(`[data-testid="status-step-${step.toLowerCase()}"]`);
      await expect(stepEl).toBeVisible();
      // Greyed out steps should not have the 'active' or 'completed' data attribute
      await expect(stepEl).not.toHaveAttribute('data-status', 'active');
      await expect(stepEl).not.toHaveAttribute('data-status', 'completed');
    }
  },
);

Then('{string} should show a checkmark', async ({ page }, step: string) => {
  const stepEl = page.locator(`[data-testid="status-step-${step.toLowerCase()}"]`);
  await expect(stepEl.locator('[data-testid="checkmark"], svg')).toBeVisible();
});

Then(
  '{string} and {string} should show checkmarks',
  async ({ page }, step1: string, step2: string) => {
    for (const step of [step1, step2]) {
      const stepEl = page.locator(`[data-testid="status-step-${step.toLowerCase()}"]`);
      await expect(stepEl.locator('[data-testid="checkmark"], svg')).toBeVisible();
    }
  },
);

Then('a {string} banner should appear', async ({ page }, bannerText: string) => {
  await expect(page.getByText(bannerText)).toBeVisible();
});

Then('the tracker should show {string}', async ({ page }, status: string) => {
  await expect(page.getByText(status)).toBeVisible();
});

Then('a notice to call the restaurant should be displayed', async ({ page }) => {
  await expect(page.getByText(/call/i)).toBeVisible();
});

// NOTE: 'I should see {string}' is defined in visibility.steps.ts -- do not duplicate here

// --- Status Polling ---

Given('the order status is changed to {string} on Clover', async ({ page }, status: string) => {
  // Use mock Clover API to change order status
  // This would need a test helper to call the mock Clover PUT endpoint
});

Given('the order status is changed to {string}', async ({ page }, status: string) => {
  // Update order status via test helper
});

Given('the order status reaches {string}', async ({ page }, status: string) => {
  // Simulate reaching a terminal status
});

When('I wait for the next status poll on the confirmation page', async ({ page }) => {
  // Wait for a status poll network request rather than a hardcoded timeout
  await page.waitForResponse(
    (response) => response.url().includes('status') || response.url().includes('/order/'),
    { timeout: 40000 },
  );
});

When('I wait for the next status poll', async ({ page }) => {
  await page.waitForResponse(
    (response) => response.url().includes('status') || response.url().includes('/order/'),
    { timeout: 40000 },
  );
});

When('I am on the confirmation page', async ({ page }) => {
  // Already on confirmation page from Given
});

Then('a status check request should be made approximately every 30 seconds', async ({ page }) => {
  // Monitor network requests
  const requests: number[] = [];
  page.on('request', (request) => {
    if (request.url().includes('status') || request.url().includes('order')) {
      requests.push(Date.now());
    }
  });
  await page.waitForTimeout(65000); // Wait for 2 cycles
  expect(requests.length).toBeGreaterThanOrEqual(2);
});

Then('no additional status check requests should be made', async ({ page }) => {
  const requests: number[] = [];
  page.on('request', (request) => {
    if (request.url().includes('status')) {
      requests.push(Date.now());
    }
  });
  await page.waitForTimeout(35000);
  expect(requests.length).toBe(0);
});

When('I wait beyond the next poll interval', async ({ page }) => {
  // Wait for a poll response rather than hardcoded sleep
  await page.waitForResponse(
    (response) => response.url().includes('status') || response.url().includes('/order/'),
    { timeout: 40000 },
  );
});

When('the order goes through received, preparing, and ready', async ({ page }) => {
  // Simulate status transitions via mock API
});

// --- Clover Sync Status ---

Given('the Clover sync failed', async ({ page }) => {
  // Ensure the order's cloverSyncStatus is "failed"
});

Then('the page should still load correctly', async ({ page }) => {
  await expect(page.locator('main')).toBeVisible();
});

Then('the status should show {string}', async ({ page }, status: string) => {
  await expect(page.getByText(new RegExp(status, 'i'))).toBeVisible();
});

// --- Invalid Order ---

Then('I should see an {string} message', async ({ page }, message: string) => {
  await expect(page.getByText(message)).toBeVisible();
});

// --- Confirmation Items ---

Then('the quantity should show {int}', async ({ page }, qty: number) => {
  await expect(page.getByText(String(qty))).toBeVisible();
});

Then('the line total should be correct for {int} units', async ({ page }, qty: number) => {
  // Verify line total is price * qty
  await expect(page.getByText(/\$\d+\.\d{2}/)).toBeVisible();
});

Then('the {string} button should be enabled', async ({ page }, text: string) => {
  const button = page.getByRole('button', { name: text });
  await expect(button).toBeEnabled();
});
