import { test, expect } from '../src/Fixtures/HomePage';

test('has title', async ({ homePage }) => {
  // Navigate to the Home Page
  await homePage.navigate();

  // Assert that we are indeed on the home page before continuing.
  expect(homePage.isCurrentlyActive()).toBeTruthy();

  // Expect a title "to contain" a substring.
  await expect(homePage).toHaveTitle(/Jupiter Toys/);

  // Click on the contact link.
  console.log("About to click.")
  await homePage.clickOnContact();
  console.log("clicked and navigated.")

  // Assert that we are no longer on the home page
  expect(homePage.isCurrentlyActive()).toBeFalsy();
});

test('test', async ({ page }) => {
  await page.goto('https://jupiter.cloud.planittesting.com/#/home');
  await page.getByRole('link', { name: 'Contact' }).click();
  await page.getByPlaceholder('John', { exact: true }).click();
  await page.getByPlaceholder('John', { exact: true }).fill('Hey there');
  await page.getByPlaceholder('Example', { exact: true }).click();
  await page.getByPlaceholder('Example', { exact: true }).fill('lol');
  await page.getByPlaceholder('john.example@planit.net.au').click();
  await page.getByPlaceholder('john.example@planit.net.au').fill('valid@email.com');
  await page.getByText('Forename * Surname Email *').click();
  await page.getByPlaceholder('Tell us about it..').click();
  await page.getByPlaceholder('Tell us about it..').fill('Hey there');
  await page.locator('form[name="form"]').click();
});