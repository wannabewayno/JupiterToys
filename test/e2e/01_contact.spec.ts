import { test, expect } from '../src/Fixtures/AllPages';

/*
  As a user, I find myself on the home page and decide to click on the contact button.
  I am presented with a form. I am impatient and attempt to submit the form without filling out anything.
  I should be presented with errors messages indiciating mandatory fields I need to fill out in order to submit the form.

  After filling out mandatory fields I see that the errors messages have gone away.
 */
test("Navigate to Contact and test Mandatory form fields", async ({ homePage, contactPage }) => {
  // Navigate to the Home Page
  await homePage.navigate();

  // Assert that we are indeed on the home page before continuing.
  expect(homePage.isCurrentlyActive()).toBeTruthy();

  // As a user, click on the conact link
  await homePage.clickOnContact();

  // Assert that we are indeed on the contact page before continuing.
  expect(contactPage.isCurrentlyActive()).toBeTruthy();

  // Submit the form without filling out any fields
  await contactPage.SumitContactForm();


  // Current Mandatory fields are 'forname', 'email' and 'message'
  expect(contactPage.forenameField.errMessage).toBeVisible();
  expect(contactPage.emailField.errMessage).toBeVisible();
  expect(contactPage.messageField.errMessage).toBeVisible();

  // Fill these out.
  await contactPage.fillMandatoryContactFields({
    email: 'valid@email.com', 
    forename: 'Wayne',
    message: 'Hey is this where I can order a Pizza?'
  });

  // Check to make sure they're no longer hanging around.
  expect(contactPage.forenameField.errMessage).toBeHidden();
  expect(contactPage.emailField.errMessage).toBeHidden();
  expect(contactPage.messageField.errMessage).toBeHidden();
});