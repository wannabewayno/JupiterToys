import type { Locator } from '@playwright/test';

export class FormField {
  readonly input: Locator;
  readonly errMessage: Locator;

  constructor(public readonly form: Locator, label: string) {
    this.input = this.form.getByLabel(label);
    this.errMessage = this.form.getByText(new RegExp(`${label}.*.required`, 'i'));
  }

  async clear() {
    await this.input.clear();
  }

  async fill(text = '') {
    await this.input.fill(text);
  }
}