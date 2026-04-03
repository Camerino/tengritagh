import { createBdd } from 'playwright-bdd';
import { test } from './fixtures';

const { Given, When, Then } = createBdd(test);

// ============================================================
// NAVIGATION — Reusable steps for navigating the site
// ============================================================

Given('I am on the {string} page', async ({ page }, pageName: string) => {
  const routes: Record<string, string> = {
    home: '/',
    homepage: '/',
    menu: '/menu',
    about: '/about',
    location: '/location',
    cart: '/cart',
    checkout: '/checkout',
  };
  const path = routes[pageName.toLowerCase()] ?? `/${pageName.toLowerCase()}`;
  await page.goto(path);
  await page.waitForLoadState('domcontentloaded');
});

Given(
  'I am on the order confirmation page for order {string}',
  async ({ page }, orderId: string) => {
    await page.goto(`/order/${orderId}`);
    await page.waitForLoadState('domcontentloaded');
  },
);

When('I navigate to the {string} page', async ({ page }, pageName: string) => {
  const routes: Record<string, string> = {
    home: '/',
    homepage: '/',
    menu: '/menu',
    about: '/about',
    location: '/location',
    cart: '/cart',
    checkout: '/checkout',
  };
  const path = routes[pageName.toLowerCase()] ?? `/${pageName.toLowerCase()}`;
  await page.goto(path);
});

When('I click the {string} link', async ({ page }, linkText: string) => {
  await page.getByRole('link', { name: linkText }).click();
});

When('I click the {string} button', async ({ page }, buttonText: string) => {
  await page.getByRole('button', { name: buttonText }).click();
});

Then('I should be on the {string} page', async ({ page }, pageName: string) => {
  const routes: Record<string, string> = {
    home: '/',
    homepage: '/',
    menu: '/menu',
    about: '/about',
    location: '/location',
    cart: '/cart',
    checkout: '/checkout',
  };
  const path = routes[pageName.toLowerCase()] ?? `/${pageName.toLowerCase()}`;
  await page.waitForURL(`**${path}`);
});
