import type { Page, Locator } from '@playwright/test';
import { BasePage } from '../Classes/BasePage';
import { Navbar } from '../Components/Navbar';
import { Cart } from '../Classes/Cart';


class CartPageModel extends BasePage {
  // Shared Components
  private readonly navbar: Navbar;

  // Page Components
  readonly cart: Cart;

  // Page Elements

  constructor(public readonly page: Page) {
    super(page, '/#/cart');

    // Navbar component
    this.navbar = new Navbar(page);

    // Page Components
    // ? Note Our cart is currently a table, this will need updating if the developers move away from tables.
    this.cart = new Cart(this.page.getByRole('table'));
  }

  getCartObject() {
    return this.cart.toObject();
  }
}

// Union type that combines Playwright's Page with our custom CartPageModel
export type CartPage = CartPageModel & Page;

// We return a proxy that directs all keys not intended for the instance of CartPage to CartPage.page
// Allows seemless integration of our custom page model with Playwright's make our tests more read-able for assetians.
export const createCartPage = (page: Page): CartPage => {
  const cartPage = new CartPageModel(page);
  return new Proxy(cartPage, {
    get(target, prop) {
      // Attempt to get the property from HomePageModel first
      if (prop in target) return (target as any)[prop];
      // Otherwise, delegate to the Page object
      return (page as any)[prop];
    },
  }) as CartPage;
}