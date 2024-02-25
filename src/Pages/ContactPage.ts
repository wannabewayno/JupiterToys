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
  // Components
  private readonly navbar: Navbar;

  // Page Elements
  readonly contactForm: Locator;
  readonly forenameField: FormField;
  readonly surnameField: FormField;
  readonly messageField: FormField;
  readonly emailField: FormField;
  readonly telephoneField: FormField;

  // Submit button
  private readonly submitContactFormButton: Locator;

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
    this.submitContactFormButton = this.contactForm.getByText('Submit');
  }

  async fillContactForm({ email, forename, message, surname, telephone }: ContactFields) {
    await this.fillMandatoryContactFields({ email, forename, message });
    await this.EnterContactSurname(surname);
    await this.EnterContactTelephone(telephone);
  }

  async fillMandatoryContactFields({ forename, email, message }: MandatoryContactFields) {
    await this.EnterContactForename(forename);
    await this.EnterContactEmail(email);
    await this.EnterContactMessage(message);
  }

  async EnterContactForename(forename: string = 'Haywood') {
    await this.forenameField.fill(forename);
  }

  async EnterContactSurname(surname: string = 'Jablomey') {
    await this.surnameField.fill(surname)
  }

  async EnterContactEmail(email: string = 'valid@email.com') {
    await this.emailField.fill(email)
  }

  async EnterContactTelephone(telephone: string = '1300655506') {
    await this.telephoneField.fill(telephone)
  }

  async EnterContactMessage(message: string = 'Shrek is love, shrek is life') {
    await this.messageField.fill(message)
  }

  async SumitContactForm() {
    await this.submitContactFormButton.click();
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