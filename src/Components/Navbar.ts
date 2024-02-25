import type { Page, Locator } from '@playwright/test';

export class Navbar {
  private readonly rootLink: Locator;
  private readonly homeLink: Locator;
  private readonly shopLink: Locator;
  private readonly contactLink: Locator;
  private readonly cartLink: Locator;

  constructor(public readonly page: Page) {
    this.rootLink = page.getByRole('link', { name: "jupiter toys" })
    this.homeLink = page.getByRole('link', { name: "home" })
    this.shopLink = page.getByRole('link', { name: "shop" })
    this.contactLink = page.getByRole('link', { name: "contact" });
    this.cartLink = page.getByRole('link', { name: "cart" });
  }

  async clickOnJupiterToys() {
    await this.rootLink.click();
  }

  async clickOnCart() {
    /*
      Client side routing doesn't make a network call
      The only way we can be sure that the page has loaded if some key DOM elements are visible.
      Key elements are conditionally based off the user's cart being empty or having items.

      We try and wait for either of these to be visible. The first one to be visible wins.
      We're not interested in if the user has anything in their cart...
      just that routing to the cart works as expected and we can continue interacting with the page.
    */
    await this.cartLink.click()
      .then(() => Promise.race([
        this.page.getByRole('link', { name: 'Start Shopping' }).waitFor({ state: 'visible' }),
        this.page.getByRole('link', { name: 'Check Out' }).waitFor({ state: 'visible' }),
      ]));
  }

  async getNumberOfCartItems(): Promise<number> {
    const cartItemElement = await this.cartLink.getByText(/\d+/);
    const items = await cartItemElement.innerText();
    return Number(items);
  }
  
  async clickOnHome() {
    await this.homeLink.click();
  }
  
  async clickOnShop() {
    await this.shopLink.click();
  }

  async clickOnContact() {
    return this.contactLink.click().then(() => this.page.locator('form').waitFor({ state: 'visible' }));
  }
}