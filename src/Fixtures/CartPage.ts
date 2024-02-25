import { test as base } from '@playwright/test';
import { createCartPage } from '../Pages/CartPage';
import type { CartPage } from '../Pages/CartPage';

// Extend the test object to setup the CartPage Page Object for you.
export const test = base.extend<{ cartPage: CartPage }>({
  cartPage: async ({ page }, use) => {
    const cartPage = createCartPage(page)
    await use(cartPage);
  },
});

export { expect } from '@playwright/test';