// @ts-check
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://jupiter.cloud.planittesting.com/#/home');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Jupiter Toys/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://jupiter.cloud.planittesting.com/#/home');

  // Click the get started link.
  await page.getByRole('link', { name: 'Contact' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Contact' })).toBeVisible();
});