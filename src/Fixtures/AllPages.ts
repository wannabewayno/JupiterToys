import { mergeTests } from '@playwright/test';
import { test as ContactPage } from './ContactPage';
import { test as HomePage } from './HomePage';

export const test = mergeTests(ContactPage, HomePage);
export { expect } from '@playwright/test';