import type { Page, Locator } from '@playwright/test';

export class HomePage {
  private readonly contactLink: Locator;

  constructor(public readonly page: Page) {
    this.contactLink = this.page.getByRole('link', { name: 'contact' });
  }

  async navigate() {
    await this.page.goto('/#/home');
  }

  isCurrentlyActive() {
    return this.page.url().endsWith('/#/home');
  }

  async clickOnContactLink() {
    await this.contactLink.click();
  }
}