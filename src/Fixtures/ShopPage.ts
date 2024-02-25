import { test as base } from '@playwright/test';
import { createShopPage } from '../Pages/ShopPage';
import type { ShopPage } from '../Pages/ShopPage';

// Extend the test object to setup the ShopPage Page Object for you.
export const test = base.extend<{ shopPage: ShopPage }>({
  shopPage: async ({ page }, use) => {
    const shopPage = createShopPage(page)
    await use(shopPage);
  },
});

export { expect } from '@playwright/test';