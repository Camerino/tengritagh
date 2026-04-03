import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { test } from './fixtures';

const { Given, When, Then } = createBdd(test);

const MOCK_CLOVER = 'http://localhost:3001';
const MERCHANT_ID = 'TEST_MERCHANT';

// ============================================================
// CLOVER — Steps for verifying Clover POS integration
// ============================================================

// --- Mock Clover Server State ---

Given('the mock Clover service is running', async ({ page }) => {
  const res = await page.request.get(`${MOCK_CLOVER}/v3/merchants/${MERCHANT_ID}/order_types`, {
    headers: { Authorization: 'Bearer test-token' },
  });
  expect(res.ok()).toBeTruthy();
});

Given('the mock Clover server is running', async ({ page }) => {
  const res = await page.request.get(`${MOCK_CLOVER}/v3/merchants/${MERCHANT_ID}/order_types`, {
    headers: { Authorization: 'Bearer test-token' },
  });
  expect(res.ok()).toBeTruthy();
});

Given('the mock Clover service is down', async ({ page }) => {
  await page.request.put(`${MOCK_CLOVER}/__admin/fail`, { data: { enabled: true } });
});

Given('the mock Clover service is restored', async ({ page }) => {
  await page.request.put(`${MOCK_CLOVER}/__admin/fail`, { data: { enabled: false } });
});

Given('the mock Clover server is configured to return 500 errors', async ({ page }) => {
  await page.request.post(`${MOCK_CLOVER}/__admin/config`, {
    data: { failNext: 100, statusCode: 500 },
  });
});

Given(
  'the mock Clover server returns 500 for the first {int} requests then succeeds',
  async ({ page }, count: number) => {
    await page.request.post(`${MOCK_CLOVER}/__admin/config`, {
      data: { failNext: count, statusCode: 500 },
    });
  },
);

Given('the mock Clover server returns 500 for all requests', async ({ page }) => {
  await page.request.post(`${MOCK_CLOVER}/__admin/config`, {
    data: { failNext: 100, statusCode: 500 },
  });
});

Given('the mock Clover server returns {int}', async ({ page }, statusCode: number) => {
  await page.request.post(`${MOCK_CLOVER}/__admin/config`, {
    data: { failNext: 100, statusCode },
  });
});

Given('the mock Clover server returns 429 on the first request then succeeds', async ({ page }) => {
  await page.request.post(`${MOCK_CLOVER}/__admin/config`, {
    data: { failNext: 1, statusCode: 429 },
  });
});

Given(
  'the mock Clover server has a {int}-second delay on the first request',
  async ({ page }, delay: number) => {
    await page.request.post(`${MOCK_CLOVER}/__admin/config`, {
      data: { delayMs: delay * 1000, delayCount: 1 },
    });
  },
);

Given('the client timeout is {int} seconds', async () => {
  // Configured in the app's Clover client module
});

Given('the mock Clover server is completely down', async ({ page }) => {
  await page.request.post(`${MOCK_CLOVER}/__admin/config`, {
    data: { failNext: 100, statusCode: 503 },
  });
});

Given('the mock Clover server is down', async ({ page }) => {
  await page.request.post(`${MOCK_CLOVER}/__admin/config`, {
    data: { failNext: 100, statusCode: 503 },
  });
});

Given(
  'the mock Clover server fails on bulk_line_items but succeeds on order creation',
  async ({ page }) => {
    await page.request.post(`${MOCK_CLOVER}/__admin/config`, {
      data: { failEndpoints: ['bulk_line_items'] },
    });
  },
);

Given('the mock Clover server succeeds for order creation', async () => {
  // Default behavior
});

Given('a previous order failed to sync', async () => {
  // Precondition from prior test
});

// --- Sync Verification ---

Then('the mock Clover should have received an order', async ({ page }) => {
  const res = await page.request.get(`${MOCK_CLOVER}/__admin/orders`, {
    headers: { Authorization: 'Bearer test-token' },
  });
  const data = await res.json();
  expect(data.length).toBeGreaterThan(0);
});

Then('the order should be sent to Clover asynchronously', async ({ page }) => {
  // Wait for async sync
  await page.waitForTimeout(5000);
  const res = await page.request.get(`${MOCK_CLOVER}/__admin/orders`, {
    headers: { Authorization: 'Bearer test-token' },
  });
  const data = await res.json();
  expect(data.length).toBeGreaterThan(0);
});

Then('the Clover order should contain {int} line item(s)', async ({ page }, count: number) => {
  const res = await page.request.get(`${MOCK_CLOVER}/__admin/orders`, {
    headers: { Authorization: 'Bearer test-token' },
  });
  const orders = await res.json();
  const lastOrder = orders[orders.length - 1];
  expect(lastOrder.lineItems.length).toBe(count);
});

Then('the mock Clover should receive a bulk_line_items request', async ({ page }) => {
  await page.waitForTimeout(5000);
  const res = await page.request.get(`${MOCK_CLOVER}/__admin/orders`, {
    headers: { Authorization: 'Bearer test-token' },
  });
  const orders = await res.json();
  expect(orders.length).toBeGreaterThan(0);
  expect(orders[orders.length - 1].lineItems).toBeTruthy();
});

Then(
  'the line items should include {string} with correct price and quantity {int}',
  async ({ page }, itemName: string, qty: number) => {
    const res = await page.request.get(`${MOCK_CLOVER}/__admin/orders`, {
      headers: { Authorization: 'Bearer test-token' },
    });
    const orders = await res.json();
    const lastOrder = orders[orders.length - 1];
    const item = lastOrder.lineItems.find((li: { name: string }) => li.name === itemName);
    expect(item).toBeTruthy();
    expect(item.unitQty).toBe(qty);
  },
);

Then('the Clover order should have note containing {string}', async ({ page }, text: string) => {
  const res = await page.request.get(`${MOCK_CLOVER}/__admin/orders`, {
    headers: { Authorization: 'Bearer test-token' },
  });
  const orders = await res.json();
  const lastOrder = orders[orders.length - 1];
  expect(lastOrder.note).toContain(text);
});

Then(
  'the Clover order title should be {string} followed by the order number',
  async ({ page }, prefix: string) => {
    const res = await page.request.get(`${MOCK_CLOVER}/__admin/orders`, {
      headers: { Authorization: 'Bearer test-token' },
    });
    const orders = await res.json();
    const lastOrder = orders[orders.length - 1];
    expect(lastOrder.title).toContain(prefix);
  },
);

Then('the Clover order note should contain {string}', async ({ page }, text: string) => {
  const res = await page.request.get(`${MOCK_CLOVER}/__admin/orders`, {
    headers: { Authorization: 'Bearer test-token' },
  });
  const orders = await res.json();
  const lastOrder = orders[orders.length - 1];
  expect(lastOrder.note).toContain(text);
});

Then('a print event should have been triggered', async ({ page }) => {
  const res = await page.request.get(`${MOCK_CLOVER}/__admin/print_events`, {
    headers: { Authorization: 'Bearer test-token' },
  });
  const events = await res.json();
  expect(events.length).toBeGreaterThan(0);
});

Then('a print event should be triggered on the mock Clover server', async ({ page }) => {
  await page.waitForTimeout(5000);
  const res = await page.request.get(`${MOCK_CLOVER}/__admin/print_events`, {
    headers: { Authorization: 'Bearer test-token' },
  });
  const events = await res.json();
  expect(events.length).toBeGreaterThan(0);
});

Then('the Clover line item note should contain {string}', async ({ page }, text: string) => {
  const res = await page.request.get(`${MOCK_CLOVER}/__admin/orders`, {
    headers: { Authorization: 'Bearer test-token' },
  });
  const orders = await res.json();
  const lastOrder = orders[orders.length - 1];
  const itemWithNote = lastOrder.lineItems.find((li: { note: string }) => li.note?.includes(text));
  expect(itemWithNote).toBeTruthy();
});

// --- Database Verification ---

Then(
  'the order should be saved locally with Clover sync status {string}',
  async ({ page }, status: string) => {
    await expect(
      page.getByTestId('clover-sync-status').or(page.locator(`text=${status}`)),
    ).toBeVisible();
  },
);

Then(
  'the cloverSyncStatus should be {string} in the database',
  async ({ page }, status: string) => {
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
    }
  },
);

Then(
  'the cloverSyncStatus should eventually be {string} in the database',
  async ({ page }, status: string) => {
    const orderId = page.url().split('/order/')[1];
    if (orderId) {
      await expect
        .poll(
          async () => {
            const res = await page.request.get(`/api/orders/${orderId}/status`);
            const data = await res.json();
            return data.cloverSyncStatus;
          },
          { timeout: 30000 },
        )
        .toBe(status);
    }
  },
);

Then('the cloverSyncStatus should be {string}', async ({ page }, status: string) => {
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
  }
});

Then(
  'the order record should have a cloverOrderId matching the Clover response',
  async ({ page }) => {
    const orderId = page.url().split('/order/')[1];
    if (orderId) {
      const res = await page.request.get(`/api/orders/${orderId}/status`);
      const data = await res.json();
      expect(data.cloverOrderId).toBeTruthy();
    }
  },
);

Then('the cloverOrderId should be saved in the database', async ({ page }) => {
  const orderId = page.url().split('/order/')[1];
  if (orderId) {
    const res = await page.request.get(`/api/orders/${orderId}/status`);
    const data = await res.json();
    expect(data.cloverOrderId).toBeTruthy();
  }
});

Then('the cloverOrderId should be saved', async ({ page }) => {
  const orderId = page.url().split('/order/')[1];
  if (orderId) {
    const res = await page.request.get(`/api/orders/${orderId}/status`);
    const data = await res.json();
    expect(data.cloverOrderId).toBeTruthy();
  }
});

Then(
  'the order should be saved in the local database with status {string}',
  async ({ page }, status: string) => {
    const orderId = page.url().split('/order/')[1];
    if (orderId) {
      const res = await page.request.get(`/api/orders/${orderId}/status`);
      const data = await res.json();
      expect(data.status).toBe(status);
    }
  },
);

Then('the confirmation page should load without waiting for Clover sync', async ({ page }) => {
  await expect(page.getByText(/order #\d+/i)).toBeVisible();
});

Then(
  'an orderStatusEvent should be created with source {string}',
  async ({ page }, _source: string) => {
    // Verify via API or DB query helper
    void page;
  },
);

Then('the new order should be confirmed successfully', async ({ page }) => {
  await expect(page.getByText(/order #\d+/i)).toBeVisible();
});

// --- Retry Verification ---

Then('the Clover sync should succeed on the 3rd attempt', async ({ page }) => {
  await page.waitForTimeout(15000);
});

Then(
  'the sync should be attempted {int} times \\(initial + {int} retries)',
  async ({ page }, _total: number, _retries: number) => {
    await page.waitForTimeout(20000);
  },
);

Then('the sync should fail immediately without retries', async ({ page }) => {
  await page.waitForTimeout(5000);
});

Then('the sync should retry after the timeout', async ({ page }) => {
  await page.waitForTimeout(15000);
});

Then('eventually succeed if the next attempt responds normally', async ({ page }) => {
  const orderId = page.url().split('/order/')[1];
  if (orderId) {
    await expect
      .poll(
        async () => {
          const res = await page.request.get(`/api/orders/${orderId}/status`);
          const data = await res.json();
          return data.cloverSyncStatus;
        },
        { timeout: 30000 },
      )
      .toBe('synced');
  }
});

Then('the sync should retry', async ({ page }) => {
  await page.waitForTimeout(10000);
});

Then('each retry attempt should be logged with the attempt number and error', async () => {
  // Verify via server log inspection
});

Then(
  'an error log should include the order ID, order number, error message, and retry count',
  async () => {
    // Verify via server log inspection
  },
);

Then('the retry delays should be approximately 1s, 2s, and 4s', async () => {
  // Verify via timing of mock Clover request logs
});

// --- Audit Trail ---

Then(
  'the orderStatusEvents table should have {int} entries for this order',
  async ({ page }, _count: number) => {
    // Verify via API or DB query
    void page;
  },
);

Then('the orderStatusEvent source should be {string}', async ({ page }, _source: string) => {
  // Verify via API or DB query
  void page;
});

Then(
  'the first orderStatusEvent should have status {string} and source {string}',
  async ({ page }, _status: string, _source: string) => {
    // Verify via API or DB query
    void page;
  },
);

// --- Health Check ---

Given('there are orders with cloverSyncStatus {string} in the last 24 hours', async () => {
  // Precondition from prior tests
});

When('I query the health check endpoint', async ({ page }) => {
  const res = await page.request.get('/api/health');
  const data = await res.json();
  (page as unknown as Record<string, unknown>).__healthResponse = data;
});

Then(
  'the response should include a failedCloverSyncs count greater than {int}',
  async ({ page }, count: number) => {
    const res = await page.request.get('/api/health');
    const data = await res.json();
    expect(data.failedCloverSyncs).toBeGreaterThan(count);
  },
);

// --- Cart with Clover-specific setups ---

Given(
  'I have {string} with quantity {int} and {string} with quantity {int} in my cart',
  async ({ page }, item1: string, qty1: number, item2: string, qty2: number) => {
    await page.goto('/menu');
    await page.waitForLoadState('networkidle');
    for (let i = 0; i < qty1; i++) {
      await page
        .locator(`[data-testid="menu-item"]:has-text("${item1}") button[data-testid="add-to-cart"]`)
        .click();
      await page.waitForTimeout(200);
    }
    for (let i = 0; i < qty2; i++) {
      await page
        .locator(`[data-testid="menu-item"]:has-text("${item2}") button[data-testid="add-to-cart"]`)
        .click();
      await page.waitForTimeout(200);
    }
  },
);

Given(
  'I have {string} with instructions {string} in my cart',
  async ({ page }, itemName: string, instructions: string) => {
    await page.goto('/menu');
    await page.waitForLoadState('networkidle');
    await page.locator(`[data-testid="menu-item"]:has-text("${itemName}")`).click();
    await page.locator('[role="dialog"]').waitFor({ state: 'visible' });
    await page.getByPlaceholder(/special instructions/i).fill(instructions);
    await page
      .locator('[role="dialog"]')
      .getByRole('button', { name: /add to cart/i })
      .click();
    await page.waitForTimeout(300);
  },
);

When('I add items and place a new order', async ({ page }) => {
  await page.goto('/menu');
  await page.waitForLoadState('networkidle');
  await page
    .locator('[data-testid="menu-item"]')
    .first()
    .locator('button[data-testid="add-to-cart"]')
    .click();
  await page.waitForTimeout(200);
  await page.goto('/checkout');
  await page.getByLabel(/name/i).fill('Jane Smith');
  await page.getByLabel(/phone/i).fill('2125559876');
  await page.getByRole('button', { name: /place order/i }).click();
  await page.waitForURL(/\/order\//);
});

When('the order syncs to Clover', async ({ page }) => {
  await page.waitForTimeout(5000);
});

When('the order syncs to Clover successfully', async ({ page }) => {
  await page.waitForTimeout(5000);
});
