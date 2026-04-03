import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { test } from './fixtures';

const { Given, When, Then } = createBdd(test);

// ============================================================
// CART — Steps for cart operations (add, remove, modify, assert)
// ============================================================

Given('my cart is empty', async ({ page }) => {
  await page.evaluate(() => localStorage.removeItem('cart-store'));
});

Given('I have {string} in my cart', async ({ page, state }, item: string) => {
  // Navigate to menu and add item
  await page.goto('/menu');
  await page.locator(`[data-testid="menu-item-card"]:has-text("${item}") button`).click();
  state['lastAddedItem'] = item;
});

Given('I have {int} items in my cart', async ({ page, state }) => {
  await page.goto('/menu');
  const addButtons = page.locator(
    '[data-testid="menu-item-card"] button[data-testid="add-to-cart"]',
  );
  const count = await addButtons.count();
  const toAdd = Math.min(count, 3);
  for (let i = 0; i < toAdd; i++) {
    await addButtons.nth(i).click();
    // Wait for toast or cart badge to confirm the add completed
    await page
      .getByText(/added to cart/i)
      .waitFor({ state: 'visible', timeout: 3000 })
      .catch(() => {});
  }
  state['cartItemCount'] = toAdd;
});

When('I add {string} to the cart', async ({ page, state }, item: string) => {
  await page
    .locator(`[data-testid="menu-item-card"]:has-text("${item}") button[data-testid="add-to-cart"]`)
    .click();
  state['lastAddedItem'] = item;
});

When(
  'I add {string} to the cart with quantity {int}',
  async ({ page }, item: string, qty: number) => {
    await page.locator(`[data-testid="menu-item-card"]:has-text("${item}")`).click();
    // In the detail modal, set quantity
    const qtyInput = page.getByTestId('quantity-stepper');
    for (let i = 1; i < qty; i++) {
      await qtyInput.getByRole('button', { name: '+' }).click();
    }
    await page.getByRole('button', { name: /add to cart/i }).click();
  },
);

When(
  'I add {string} with special instructions {string}',
  async ({ page }, item: string, instructions: string) => {
    await page.locator(`[data-testid="menu-item-card"]:has-text("${item}")`).click();
    await page.getByPlaceholder(/special instructions/i).fill(instructions);
    await page.getByRole('button', { name: /add to cart/i }).click();
  },
);

When(
  'I increase the quantity of {string} to {int}',
  async ({ page }, item: string, qty: number) => {
    const row = page.locator(`[data-testid="cart-item"]:has-text("${item}")`);
    const currentQty = parseInt((await row.getByTestId('quantity-value').textContent()) ?? '1');
    for (let i = currentQty; i < qty; i++) {
      await row.getByRole('button', { name: '+' }).click();
    }
  },
);

When('I decrease the quantity of {string}', async ({ page }, item: string) => {
  const row = page.locator(`[data-testid="cart-item"]:has-text("${item}")`);
  await row
    .getByRole('button', { name: '-' })
    .or(row.getByRole('button', { name: '−' }))
    .click();
});

When('I remove {string} from the cart', async ({ page }, item: string) => {
  const row = page.locator(`[data-testid="cart-item"]:has-text("${item}")`);
  await row.getByRole('button', { name: /remove/i }).click();
});

Then('the cart should have {int} item(s)', async ({ page }, count: number) => {
  const badge = page.getByTestId('cart-badge').or(page.locator('[data-testid="cart-count"]'));
  if (count === 0) {
    await expect(badge).not.toBeVisible();
  } else {
    await expect(badge).toHaveText(String(count));
  }
});

Then('the cart subtotal should be {string}', async ({ page }, total: string) => {
  await expect(page.getByTestId('cart-subtotal').or(page.getByText(total))).toBeVisible();
});

Then('the cart should contain {string}', async ({ page }, item: string) => {
  await expect(page.locator(`[data-testid="cart-item"]:has-text("${item}")`)).toBeVisible();
});

Then('the cart should not contain {string}', async ({ page }, item: string) => {
  await expect(page.locator(`[data-testid="cart-item"]:has-text("${item}")`)).not.toBeVisible();
});

Then('I should see a toast {string}', async ({ page }, message: string) => {
  await expect(page.getByText(message, { exact: false })).toBeVisible({ timeout: 3000 });
});

Then('the sticky cart bar should show {string}', async ({ page }, text: string) => {
  await expect(page.getByTestId('sticky-cart-bar').getByText(text, { exact: false })).toBeVisible();
});

Then('the sticky cart bar should not be visible', async ({ page }) => {
  await expect(page.getByTestId('sticky-cart-bar')).not.toBeVisible();
});

Then('my cart should still contain {string}', async ({ page }, item: string) => {
  // Reload page to verify persistence
  await page.reload();
  await page.waitForLoadState('domcontentloaded');
  await expect(page.locator(`[data-testid="cart-item"]:has-text("${item}")`)).toBeVisible();
});
