import { mergeTests } from '@playwright/test';
import { test as ContactPage } from './ContactPage';
import { test as HomePage } from './HomePage';
import { test as ShopPage } from './ShopPage';
import { test as CartPage } from './CartPage';

export const test = mergeTests(ContactPage, HomePage, ShopPage, CartPage);
export { expect } from '@playwright/test';