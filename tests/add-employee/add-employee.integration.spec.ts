import { test, expect } from '../../fixtures/baseTest';

/**
 * Add Employee — Integration
 *
 * Generated from: ai-testing/test-plans/add-employee-plan.md
 * Application: OrangeHRM Demo
 */

test.describe('Add Employee - Integration', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(process.env.BASE_URL!);
  });

  test('INT-001 - Newly added employee appears in Employee List', async ({ page, addEmployeePage, employeeListPage }) => {
    await addEmployeePage.navigateToAddEmployee();
    const employeeId = await addEmployeePage.getEmployeeIdValue();
    await addEmployeePage.fillEmployeeForm('Priya', 'Natarajan');
    await addEmployeePage.submitForm();

    await employeeListPage.navigateToEmployeeList();
    await employeeListPage.searchByEmployeeId(employeeId);

    await expect(employeeListPage.recordFoundText).toContainText('1');
    await expect(page.getByText('Priya')).toBeVisible();
  });
});
