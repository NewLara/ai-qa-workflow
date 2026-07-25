import { Page, Locator } from '@playwright/test';

export class EmployeeListPage {
  readonly page: Page;
  readonly pimMenuLink: Locator;
  readonly employeeListLink: Locator;
  readonly searchButton: Locator;
  readonly employeeIdSearchInput: Locator;
  readonly recordFoundText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pimMenuLink = page.getByRole('link', { name: 'PIM' });
    this.employeeListLink = page.getByRole('link', { name: 'Employee List' });
    this.searchButton = page.locator('button[type="submit"]');
    // Scoped by the "Employee Id" label's group — the field itself has no name/id attribute.
    this.employeeIdSearchInput = page.locator('.oxd-input-group', { hasText: 'Employee Id' }).locator('input');
    // Requires the "(N)" count prefix so this doesn't also match the
    // zero-results "No Records Found" empty-state text, which contains the
    // same "Records Found" substring but no parenthesized count.
    this.recordFoundText = page.getByText(/\(\d+\)\s*Records?\s*Found/i);
  }

  async navigateToEmployeeList() {
    await this.pimMenuLink.click();
    await this.employeeListLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async searchByEmployeeId(employeeId: string) {
    await this.employeeIdSearchInput.fill(employeeId);
    await this.searchButton.click();
    await this.page.waitForLoadState('networkidle');
  }
}
