import { Page, Locator } from '@playwright/test';

export class EmployeeListPage {
  readonly page: Page;
  readonly pimMenuLink: Locator;
  readonly employeeListLink: Locator;
  readonly searchButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pimMenuLink = page.getByRole('link', { name: 'PIM' });
    this.employeeListLink = page.getByRole('link', { name: 'Employee List' });
    this.searchButton = page.locator('button[type="submit"]');
  }

  async navigateToEmployeeList() {
    await this.pimMenuLink.click();
    await this.employeeListLink.click();
    await this.page.waitForLoadState('networkidle');
  }
}
