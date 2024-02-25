import { test as base } from '@playwright/test';
import { createHomePage } from '../Pages/HomePage';
import type { HomePage } from '../Pages/HomePage';

// Extend the test object to setup the HomePage Page Object for you.
export const test = base.extend<{ homePage: HomePage }>({
  homePage: async ({ page }, use) => {
    const homePage = createHomePage(page)
    await use(homePage);
  },
});

export { expect } from '@playwright/test';