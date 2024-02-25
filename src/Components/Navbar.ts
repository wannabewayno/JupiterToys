import type { Page, Locator } from '@playwright/test';

export class Navbar {
  private readonly rootLink: Locator;
  private readonly homeLink: Locator;
  private readonly shopLink: Locator;
  private readonly contactLink: Locator;

  constructor(public readonly page: Page) {
    this.rootLink = page.getByRole('link', { name: "jupiter toys" })
    this.homeLink = page.getByRole('link', { name: "home" })
    this.shopLink = page.getByRole('link', { name: "shop" })
    this.contactLink = page.getByRole('link', { name: "contact" });
  }

  async clickOnJupiterToys() {
    await this.rootLink.click();
  }
  
  async clickOnHome() {
    await this.homeLink.click();
  }
  
  async clickOnShop() {
    await this.shopLink.click();
  }

  async clickOnContact() {
    await this.contactLink.click();
  }
}