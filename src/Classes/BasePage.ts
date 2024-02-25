import type { Page } from '@playwright/test';

/**
 * BasePage model for custom Page Objects to extend.
 * Contains core re-usable logic for asserting if the Page Object is active and navigating to the Object.
 */
export class BasePage {
  private path: string;
  constructor(public readonly page: Page, path: string) {
    this.path = path;
  }

  async navigate() {
    await this.page.goto(this.path);
  }

  isCurrentlyActive() {
    return this.page.url().endsWith(this.path);
  }
}