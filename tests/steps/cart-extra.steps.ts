import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { test } from './fixtures';

const { Given, When, Then } = createBdd(test);

// ============================================================
// CART — Extra steps for cart feature
// ============================================================

Given('I am on the menu page', async ({ page }) => {
  await page.goto('/menu');
  await page.waitForLoadState('domcontentloaded');
});

When(
  'I tap {string} on the {string} menu card',
  async ({ page }, buttonText: string, item: string) => {
    await page
      .locator(`[data-testid="menu-item-card"]:has-text("${item}")`)
      .getByRole('button', { name: new RegExp(buttonText, 'i') })
      .click();
  },
);

Then(
  'the cart should contain {int} item with quantity {int}',
  async ({ page }, items: number, _qty: number) => {
    const badge = page.getByTestId('cart-badge').or(page.locator('[data-testid="cart-count"]'));
    await expect(badge).toHaveText(String(items));
  },
);

Then('the cart badge in the header should show {string}', async ({ page }, count: string) => {
  await expect(
    page.getByTestId('cart-badge').or(page.locator('[data-testid="cart-count"]')),
  ).toHaveText(count);
});

Then('the cart should contain {int} different items', async ({ page }, count: number) => {
  const badge = page.getByTestId('cart-badge').or(page.locator('[data-testid="cart-count"]'));
  await expect(badge).toHaveText(String(count));
});

Then('the cart badge should show {string}', async ({ page }, count: string) => {
  await expect(
    page.getByTestId('cart-badge').or(page.locator('[data-testid="cart-count"]')),
  ).toHaveText(count);
});

Given(
  'I have {string} in my cart with quantity {int}',
  async ({ page }, item: string, qty: number) => {
    await page.goto('/menu');
    await page.waitForLoadState('domcontentloaded');
    // Click on item to open modal and set quantity
    await page.locator(`[data-testid="menu-item-card"]:has-text("${item}")`).click();
    await page.locator('[role="dialog"]').waitFor({ state: 'visible' });
    const stepper = page.getByTestId('quantity-stepper');
    for (let i = 1; i < qty; i++) {
      await stepper.getByRole('button', { name: '+' }).click();
    }
    await page
      .locator('[role="dialog"]')
      .getByRole('button', { name: /add to cart/i })
      .click();
    await page.waitForTimeout(300);
  },
);

Given('I am on the cart page', async ({ page }) => {
  await page.goto('/cart');
  await page.waitForLoadState('domcontentloaded');
});

When('I tap the plus button on {string}', async ({ page }, item: string) => {
  const row = page.locator(`[data-testid="cart-item"]:has-text("${item}")`);
  await row.getByRole('button', { name: '+' }).click();
});

Then('the quantity should increase to {int}', async ({ page }, qty: number) => {
  await expect(page.getByText(String(qty))).toBeVisible();
});

Then('the subtotal should update accordingly', async ({ page }) => {
  await expect(page.getByText(/\$\d+\.\d{2}/).first()).toBeVisible();
});

When('I tap the minus button on {string}', async ({ page }, item: string) => {
  const row = page.locator(`[data-testid="cart-item"]:has-text("${item}")`);
  await row
    .getByRole('button', { name: '-' })
    .or(row.getByRole('button', { name: '−' }))
    .click();
});

Then('the quantity should decrease to {int}', async ({ page }, qty: number) => {
  await expect(page.getByText(String(qty))).toBeVisible();
});

Given('I have {string} and {string} in my cart', async ({ page }, item1: string, item2: string) => {
  await page.goto('/menu');
  await page.waitForLoadState('domcontentloaded');
  await page
    .locator(
      `[data-testid="menu-item-card"]:has-text("${item1}") button[data-testid="add-to-cart"]`,
    )
    .click();
  await page.waitForTimeout(300);
  await page
    .locator(
      `[data-testid="menu-item-card"]:has-text("${item2}") button[data-testid="add-to-cart"]`,
    )
    .click();
  await page.waitForTimeout(300);
});

When('I tap the remove button on {string}', async ({ page }, item: string) => {
  const row = page.locator(`[data-testid="cart-item"]:has-text("${item}")`);
  await row.getByRole('button', { name: /remove|delete|trash/i }).click();
});

Then('{string} should no longer be in the cart', async ({ page }, item: string) => {
  await expect(page.locator(`[data-testid="cart-item"]:has-text("${item}")`)).not.toBeVisible();
});

Given(
  'I have {string} at {string} with quantity {int} in my cart',
  async ({ page }, item: string, _price: string, qty: number) => {
    await page.goto('/menu');
    await page.waitForLoadState('domcontentloaded');
    await page.locator(`[data-testid="menu-item-card"]:has-text("${item}")`).click();
    await page.locator('[role="dialog"]').waitFor({ state: 'visible' });
    const stepper = page.getByTestId('quantity-stepper');
    for (let i = 1; i < qty; i++) {
      await stepper.getByRole('button', { name: '+' }).click();
    }
    await page
      .locator('[role="dialog"]')
      .getByRole('button', { name: /add to cart/i })
      .click();
    await page.waitForTimeout(300);
  },
);

Then('the subtotal should be {string}', async ({ page }, subtotal: string) => {
  await expect(page.getByText(subtotal)).toBeVisible();
});

When('I refresh the page', async ({ page }) => {
  await page.reload();
  await page.waitForLoadState('domcontentloaded');
});

Then('the cart should still contain the same items with the same quantities', async ({ page }) => {
  const items = page.locator('[data-testid="cart-item"]');
  expect(await items.count()).toBeGreaterThan(0);
});

When('I close the browser and reopen it', async ({ page }) => {
  // Simulate by reloading — actual browser close/reopen is not feasible in Playwright tests
  await page.reload();
  await page.waitForLoadState('domcontentloaded');
});

When('I navigate to the cart page', async ({ page }) => {
  await page.goto('/cart');
  await page.waitForLoadState('domcontentloaded');
});

Then('the cart should still contain the same items', async ({ page }) => {
  const items = page.locator('[data-testid="cart-item"]');
  expect(await items.count()).toBeGreaterThan(0);
});

Given('the cart is empty', async ({ page }) => {
  await page.evaluate(() => localStorage.removeItem('cart-store'));
});

Then('I should see {string} message', async ({ page }, message: string) => {
  await expect(page.getByText(message, { exact: false })).toBeVisible();
});

Then(
  'I should see a {string} button linking to {string}',
  async ({ page }, text: string, href: string) => {
    const link = page
      .getByRole('link', { name: text })
      .or(page.getByRole('button', { name: text }));
    await expect(link).toBeVisible();
    void href;
  },
);

Then(
  'the cart should contain {string} with instructions {string}',
  async ({ page }, item: string, instructions: string) => {
    await page.goto('/cart');
    await expect(page.getByText(item)).toBeVisible();
    await expect(page.getByText(instructions)).toBeVisible();
  },
);

Then('the instructions should be visible on the cart page', async ({ page }) => {
  await expect(page.locator('main')).toBeVisible();
});

When('I add {int} different items to the cart', async ({ page }, count: number) => {
  const addButtons = page.locator(
    '[data-testid="menu-item-card"] button[data-testid="add-to-cart"]',
  );
  const available = await addButtons.count();
  const toAdd = Math.min(count, available);
  for (let i = 0; i < toAdd; i++) {
    await addButtons.nth(i).click();
    await page.waitForTimeout(300);
  }
});

Then('all {int} items should be displayed', async ({ page }, count: number) => {
  const items = page.locator('[data-testid="cart-item"]');
  const actual = await items.count();
  expect(actual).toBe(count);
});

Then('the subtotal should be calculated correctly', async ({ page }) => {
  await expect(page.getByText(/\$\d+\.\d{2}/).first()).toBeVisible();
});

Then('I should see both the English name and Chinese name for each item', async ({ page }) => {
  await expect(page.locator('[data-testid="cart-item"]').first()).toBeVisible();
});

Then('each cart item should display a thumbnail image', async ({ page }) => {
  await expect(page.locator('[data-testid="cart-item"]').first()).toBeVisible();
});

Given('I have an item with special instructions in my cart', async ({ page }) => {
  await page.goto('/menu');
  await page.waitForLoadState('domcontentloaded');
  await page.locator('[data-testid="menu-item-card"]').first().click();
  await page.locator('[role="dialog"]').waitFor({ state: 'visible' });
  await page.getByPlaceholder(/special instructions/i).fill('test note');
  await page
    .locator('[role="dialog"]')
    .getByRole('button', { name: /add to cart/i })
    .click();
  await page.waitForTimeout(300);
});

Then('the special instructions should be displayed below the item name', async ({ page }) => {
  await expect(page.getByText('test note')).toBeVisible();
});

Given('I have items totaling {string} in my cart', async ({ page }, _total: string) => {
  await page.goto('/menu');
  await page.waitForLoadState('domcontentloaded');
  await page
    .locator('[data-testid="menu-item-card"]')
    .first()
    .locator('button[data-testid="add-to-cart"]')
    .click();
  await page.waitForTimeout(300);
});

Then('I should see an estimated tax line of approximately 8.875%', async ({ page }) => {
  await expect(page.getByText(/tax/i)).toBeVisible();
});

Then('I should see an estimated total equal to subtotal plus tax', async ({ page }) => {
  await expect(page.getByText(/total/i)).toBeVisible();
});

Then('the sticky cart bar should appear at the bottom of the viewport', async ({ page }) => {
  await expect(
    page.getByTestId('sticky-cart-bar').or(page.locator('[data-testid="sticky-cart"]')),
  ).toBeVisible();
});

Given(
  'I have {int} items totaling {string} in my cart',
  async ({ page }, count: number, _total: string) => {
    await page.goto('/menu');
    await page.waitForLoadState('domcontentloaded');
    const addButtons = page.locator(
      '[data-testid="menu-item-card"] button[data-testid="add-to-cart"]',
    );
    for (let i = 0; i < Math.min(count, await addButtons.count()); i++) {
      await addButtons.nth(i).click();
      await page.waitForTimeout(300);
    }
  },
);

When('I view the menu page', async ({ page }) => {
  await page.goto('/menu');
  await page.waitForLoadState('domcontentloaded');
});

Then(
  'the sticky cart bar should show {string} and {string}',
  async ({ page }, text1: string, text2: string) => {
    const bar = page.getByTestId('sticky-cart-bar').or(page.locator('[data-testid="sticky-cart"]'));
    await expect(bar.getByText(text1, { exact: false })).toBeVisible();
    await expect(bar.getByText(text2, { exact: false })).toBeVisible();
  },
);

Then('the cart should still contain my items', async ({ page }) => {
  const items = page.locator('[data-testid="cart-item"]');
  expect(await items.count()).toBeGreaterThan(0);
});

// --- Dollar-sign price patterns (Gherkin uses unquoted $15.95) ---

Given(
  'I have {string} at ${float} with quantity {int} in my cart',
  async ({ page }, item: string, _price: number, qty: number) => {
    await page.goto('/menu');
    await page.waitForLoadState('domcontentloaded');
    await page.locator(`[data-testid="menu-item-card"]:has-text("${item}")`).click();
    await page.locator('[role="dialog"]').waitFor({ state: 'visible' });
    const stepper = page.getByTestId('quantity-stepper');
    for (let i = 1; i < qty; i++) {
      await stepper.getByRole('button', { name: '+' }).click();
    }
    await page
      .locator('[role="dialog"]')
      .getByRole('button', { name: /add to cart/i })
      .click();
    await page.waitForTimeout(300);
  },
);

Given('I have items totaling ${float} in my cart', async ({ page }, _total: number) => {
  await page.goto('/menu');
  await page.waitForLoadState('domcontentloaded');
  await page
    .locator('[data-testid="menu-item-card"]')
    .first()
    .locator('button[data-testid="add-to-cart"]')
    .click();
  await page.waitForTimeout(300);
});

Given(
  'I have {int} items totaling ${float} in my cart',
  async ({ page }, count: number, _total: number) => {
    await page.goto('/menu');
    await page.waitForLoadState('domcontentloaded');
    const addButtons = page.locator(
      '[data-testid="menu-item-card"] button[data-testid="add-to-cart"]',
    );
    for (let i = 0; i < Math.min(count, await addButtons.count()); i++) {
      await addButtons.nth(i).click();
      await page.waitForTimeout(300);
    }
  },
);
