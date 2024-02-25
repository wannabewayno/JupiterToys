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
// Allows seemless integration of Custom HomePage and Page for test read-ability.
export type HomePage = HomePageModel & Page;

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