import { test as base } from 'playwright-bdd';

/**
 * Extended test fixtures for Tengri Tagh BDD tests.
 * Provides shared state across steps within a scenario.
 */
export const test = base.extend<{
  /** Shared state bag for passing data between steps */
  state: Record<string, unknown>;
}>({
  state: async ({}, use) => {
    await use({});
  },
});
