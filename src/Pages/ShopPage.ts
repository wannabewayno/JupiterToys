import type { Page, Locator } from '@playwright/test';
import { BasePage } from '../Classes/BasePage';
import { Navbar } from '../Components/Navbar';
import { Product } from '../Classes/Product';

class ShopPageModel extends BasePage {
  // Shared Components
  private readonly navbar: Navbar;

  readonly fluffyBunny: Product;
  readonly stuffedFrog: Product;
  readonly valentineBear: Product;

  constructor(public readonly page: Page) {
    super(page, '/#/shop');

    // Navbar component
    this.navbar = new Navbar(page);

    // Products on Page
    this.fluffyBunny = new Product(page, 'Fluffy Bunny')
    this.stuffedFrog = new Product(page, 'Stuffed Frog')
    this.valentineBear = new Product(page, 'Valentine Bear')
  }

  async clickOnCart() {
    await this.navbar.clickOnCart();
  }

  getNumberOfCartItems() {
    return this.navbar.getNumberOfCartItems();
  }
}

// Union type that combines Playwright's Page with our custom ShopPageModel
export type ShopPage = ShopPageModel & Page;

// We return a proxy that directs all keys not intended for the instance of ShopPage to ShopPage.page
// Allows seemless integration of our custom page model with Playwright's make our tests more read-able for assetians.
export const createShopPage = (page: Page): ShopPage => {
  const shopPage = new ShopPageModel(page);
  return new Proxy(shopPage, {
    get(target, prop) {
      // Attempt to get the property from HomePageModel first
      if (prop in target) return (target as any)[prop];
      // Otherwise, delegate to the Page object
      return (page as any)[prop];
    },
  }) as ShopPage;
}