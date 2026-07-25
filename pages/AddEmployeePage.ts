import { Page, Locator } from '@playwright/test';

export class AddEmployeePage {
  readonly page: Page;
  readonly pimMenuLink: Locator;
  readonly addEmployeeLink: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly employeeIdField: Locator;
  readonly submitButton: Locator;
  readonly requiredErrorMessage: Locator;
  readonly characterLimitErrorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pimMenuLink = page.getByRole('link', { name: 'PIM' });
    this.addEmployeeLink = page.getByRole('link', { name: 'Add Employee' });
    this.firstNameInput = page.locator('input[name="firstName"]');
    this.lastNameInput = page.locator('input[name="lastName"]');
    this.employeeIdField = page.locator('input[class*="oxd-input"]').last();
    this.submitButton = page.locator('button[type="submit"]');
    this.requiredErrorMessage = page.locator('text=Required');
    this.characterLimitErrorMessage = page.locator('text=Should not exceed 30 characters');
  }

  async navigateToAddEmployee() {
    await this.pimMenuLink.click();
    await this.page.waitForLoadState('networkidle');
    await this.addEmployeeLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async fillEmployeeForm(firstName: string, lastName: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
  }

  async setEmployeeId(id: string) {
    await this.employeeIdField.clear();
    await this.employeeIdField.fill(id);
  }

  async submitForm() {
    await this.submitButton.click();
    // A successful save routes the SPA away from /addEmployee to the new
    // employee's profile page. networkidle alone can resolve before that
    // client-side route change lands, which lets a caller that immediately
    // navigates elsewhere (e.g. to Employee List) interrupt the save
    // mid-flight. Only call submitForm() when you expect success — negative/
    // validation-failure scenarios should click submitButton directly.
    await this.page.waitForURL((url) => !url.pathname.endsWith('/addEmployee'), { timeout: 15000 }).catch(() => {});
    await this.page.waitForLoadState('networkidle');
  }

  async clearForm() {
    await this.firstNameInput.clear();
    await this.lastNameInput.clear();
  }

  async getEmployeeIdValue(): Promise<string> {
    return await this.employeeIdField.inputValue();
  }
}
