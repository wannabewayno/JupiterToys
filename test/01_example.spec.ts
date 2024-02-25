import { test, expect } from '../src/Fixtures/HomePage';

test('has title', async ({ homePage }) => {
  // Navigate to the Home Page
  await homePage.navigate();

  // Assert that we are indeed on the home page before continuing.
  expect(homePage.isCurrentlyActive()).toBeTruthy();

  // Expect a title "to contain" a substring.
  await expect(homePage).toHaveTitle(/Jupiter Toys/);

  // Click on the contact link.
  await homePage.clickOnContact();

  // Assert that we are no longer on the home page
  expect(homePage.isCurrentlyActive()).toBeFalsy();
});