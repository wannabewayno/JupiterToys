import { test, expect } from '../src/Fixtures/HomePage';

test('has title', async ({ homePage, page }) => {
  await homePage.navigate();
  console.log(homePage.page.url());
  console.log('On Home page?', homePage.isCurrentlyActive());

  // Expect a title "to contain" a substring.
  await expect(homePage.page).toHaveTitle(/Jupiter Toys/);

  await homePage.clickOnContactLink();
  console.log(homePage.page.url());
  console.log('On Home page?', homePage.isCurrentlyActive());
});