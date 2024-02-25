import { test as base } from '@playwright/test';
import { HomePage } from '../Pages/HomePage';

// Extend the test object to setup the HomePage Page Object for you.
export const test = base.extend<{ homePage: HomePage }>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
});

export { expect } from '@playwright/test';