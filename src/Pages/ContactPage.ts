import type { Page, Locator } from '@playwright/test';
import { BasePage } from '../Classes/BasePage';
import { Navbar } from '../Components/Navbar';
import { FormField } from '../Classes/FormField';

type MandatoryContactFields = {
  email: string,
  forename: string,
  message: string,
}

type NonMandatoryContactFields = {
  surname?: string,
  telephone?: string,
}

type ContactFields = MandatoryContactFields & NonMandatoryContactFields

class ContactPageModel extends BasePage {
  // Shared Components
  private readonly navbar: Navbar;

  // Page Elements
  readonly contactForm: Locator;
  readonly contactFormSuccessMessage: Locator;
  private readonly contactFormSubmitButton: Locator;
  readonly contactFormLoadingIndicator: Locator;

  // Form Fields
  readonly forenameField: FormField;
  readonly surnameField: FormField;
  readonly messageField: FormField;
  readonly emailField: FormField;
  readonly telephoneField: FormField;


  constructor(public readonly page: Page) {
    super(page, '/#/contact');
    // Navbar component
    this.navbar = new Navbar(page);

    // The 'contact' form, it's generically named... but so far the only form on this page.
    this.contactForm = this.page.locator('form');

    // Form fields
    this.forenameField = new FormField(this.contactForm, 'Forename');
    this.surnameField = new FormField(this.contactForm, 'Surname');
    this.messageField = new FormField(this.contactForm, 'Message');
    this.telephoneField = new FormField(this.contactForm, 'Phone');
    this.emailField = new FormField(this.contactForm, 'Email');

    // I've noticed that the Submit button is not a button and the form is generically named.
    // This ensures that we look for a 'submit' thing inside a form
    // Hopefully this future proofs this test until the developers use better a11y standards
    this.contactFormSubmitButton = this.contactForm.getByText('Submit');

    // This element also doesn't have the best a11y. If we're looking for a thanks message, then that's what we're chasing.
    this.contactFormSuccessMessage = this.page.getByText(/thanks/i);

    // This also doesn't have the best a11y, just a div with a class 'modal'. Using the 'sending feedback' text here to be more declaritive.
    this.contactFormLoadingIndicator = this.page.getByText(/sending.*feedback/i);
  }

  async fillContactForm({ email, forename, message, surname, telephone }: ContactFields) {
    await this.fillMandatoryContactFields({ email, forename, message });
    await this.enterContactSurname(surname);
    await this.enterContactTelephone(telephone);
  }

  async fillMandatoryContactFields({ forename, email, message }: MandatoryContactFields) {
    await this.enterContactForename(forename);
    await this.enterContactEmail(email);
    await this.enterContactMessage(message);
  }

  async enterContactForename(forename: string = 'Haywood') {
    await this.forenameField.fill(forename);
  }

  async enterContactSurname(surname: string = 'Jablomey') {
    await this.surnameField.fill(surname)
  }

  async enterContactEmail(email: string = 'valid@email.com') {
    await this.emailField.fill(email)
  }

  async enterContactTelephone(telephone: string = '1300655506') {
    await this.telephoneField.fill(telephone)
  }

  async enterContactMessage(message: string = 'Shrek is love, shrek is life') {
    await this.messageField.fill(message)
  }

  async submitContactForm() {
    await this.contactFormSubmitButton.click();
  }
}

// Union type that combines Playwright's Page with our custom ContactPageModel
export type ContactPage = ContactPageModel & Page;

// We return a proxy that directs all keys not intended for the instance of ContactPage to ContactPage.page
// Allows seemless integration of our custom page model with Playwright's make our tests more read-able for assetians.
export const createContactPage = (page: Page): ContactPage => {
  const contactPageMethods = new ContactPageModel(page);
  return new Proxy(contactPageMethods, {
    get(target, prop) {
      // Attempt to get the property from HomePageModel first
      if (prop in target) return (target as any)[prop];
      // Otherwise, delegate to the Page object
      return (page as any)[prop];
    },
  }) as ContactPage;
}