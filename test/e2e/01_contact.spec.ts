import { test, expect } from "../../src/Fixtures/AllPages";

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

  // As a user, click on the contact link
  await homePage.clickOnContact();

  // Assert that we are indeed on the contact page before continuing.
  expect(contactPage.isCurrentlyActive()).toBeTruthy();

  // Submit the form without filling out any fields
  await contactPage.submitContactForm();


  // Current Mandatory fields are 'forname', 'email' and 'message'
  await expect(contactPage.forenameField.errMessage).toBeVisible();
  await expect(contactPage.emailField.errMessage).toBeVisible();
  await expect(contactPage.messageField.errMessage).toBeVisible();

  // Fill these out.
  await contactPage.fillMandatoryContactFields({
    email: 'valid@email.com', 
    forename: 'Wayne',
    message: 'Hey is this where I can order a Pizza?'
  });

  // Check to make sure they're no longer hanging around.
  await expect(contactPage.forenameField.errMessage).toBeHidden();
  await expect(contactPage.emailField.errMessage).toBeHidden();
  await expect(contactPage.messageField.errMessage).toBeHidden();
});


/*
  As a user, I find myself on the home page and decide to click on the contact button.
  I am presented with a form. I notice the mandatory fields and fill them out.
  I then click on the submit button and wait for the form to upload my message.
  I am greeted with a success feedback so I know my message was delivered.
 */
test.describe('Navigate to Contact and test successful form submission', () => {
  const maxAttempts = 5;
  for (let attempts = 1; attempts <= maxAttempts; attempts++) {
    test(`Navigate to Contact and test successful form submission ${attempts}/${maxAttempts}`, async ({ homePage, contactPage }) => {
      // Navigate to the Home Page
      await homePage.navigate();
    
      // Assert that we are indeed on the home page before continuing.
      expect(homePage.isCurrentlyActive()).toBeTruthy();
    
      // As a user, click on the contact link
      await homePage.clickOnContact();
    
      // Assert that we are indeed on the contact page before continuing.
      expect(contactPage.isCurrentlyActive()).toBeTruthy();
  
      // Fill out the mandatory fields.
      await contactPage.fillMandatoryContactFields({
        email: 'haywood@jablomey.com', 
        forename: 'Haywood',
        message: 'Hey is this where I can order a Pizza?'
      });
    
      // Submit the form.
      await contactPage.submitContactForm();

      // Expect a modal to appear.
      await expect(contactPage.contactFormLoadingIndicator).toBeVisible();

      // Let's wait for the loading indicator to dissappear.
      // Observations have shown that submitting a message can take a long time for the server to respond.
      await expect(contactPage.contactFormLoadingIndicator).toBeHidden({ timeout: 150000 }); 
  
      // We expect to see the success message after the popup has disappeared.
      await expect(contactPage.contactFormSuccessMessage).toBeVisible();
    });
  }
});