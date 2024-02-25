import { test as base } from '@playwright/test';
import { createContactPage } from '../Pages/ContactPage';
import type { ContactPage } from '../Pages/ContactPage';

// Extend the test object to setup the ContactPage Page Object for you.
export const test = base.extend<{ contactPage: ContactPage }>({
  contactPage: async ({ page }, use) => {
    const contactPage = createContactPage(page)
    await use(contactPage);
  },
});

export { expect } from '@playwright/test';