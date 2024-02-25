import type { Page, Locator } from '@playwright/test';
import { BasePage } from '../Classes/BasePage';
import { Navbar } from '../Components/Navbar';

class HomePageModel extends BasePage {
  private readonly navbar: Navbar;

  constructor(public readonly page: Page) {
    super(page, '/#/home');
    this.navbar = new Navbar(page);
  }

  async clickOnContact() {
    await this.navbar.clickOnContact();
  }
}

// Union type that combines Playwright's Page with our custom HomePageModel
export type HomePage = HomePageModel & Page;

// We return a proxy that directs all keys not intended for the instance of ContactPage to ContactPage.page
// Allows seemless integration of our custom page model with Playwright's make our tests more read-able for assetians.
export const createHomePage = (page: Page): HomePage => {
  const homePageMethods = new HomePageModel(page);
  return new Proxy(homePageMethods, {
    get(target, prop) {
      // Attempt to get the property from HomePageModel first
      if (prop in target) return (target as any)[prop];
      // Otherwise, delegate to the Page object
      return (page as any)[prop];
    },
  }) as HomePage;
}