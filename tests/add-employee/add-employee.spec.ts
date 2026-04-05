import { test, expect } from '@playwright/test';

test.describe('Add Employee in PIM Module', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(process.env.BASE_URL!);
    await page.fill('[name="username"]', process.env.TEST_USERNAME!);
    await page.fill('[name="password"]', process.env.TEST_PASSWORD!);
    await page.click('[type="submit"]');
  });

  test('TC-001 - Successfully add employee with all required fields', async ({ page }) => {
    await page.getByRole('link', { name: 'PIM' }).click();
    await page.getByRole('link', { name: 'Add Employee' }).click();

    const employeeIdField = page.locator('[name*="employeeId"]').first();
    await expect(employeeIdField).not.toBeEmpty();

    await page.fill('[name="firstName"]', 'Sarah');
    await page.fill('[name="lastName"]', 'Johnson');
    await page.click('[type="submit"]');

    await expect(page.locator('text=Sarah Johnson')).toBeVisible();
  });

  test('TC-002 - Verify newly added employee appears in Employee List', async ({ page }) => {
    await page.getByRole('link', { name: 'PIM' }).click();
    await page.getByRole('link', { name: 'Employee List' }).click();

    await page.fill('[placeholder*="Employee Id"]', '0401');
    await page.click('[type="submit"]');

    await expect(page.locator('text=(1) Record Found')).toBeVisible();
    await expect(page.locator('text=Sarah Johnson')).toBeVisible();
    await expect(page.locator('text=0401')).toBeVisible();
  });

  test('TC-003 - Navigate to Add Employee form from PIM menu', async ({ page }) => {
    await page.getByRole('link', { name: 'PIM' }).click();
    await page.getByRole('link', { name: 'Add Employee' }).click();

    const employeeIdField = page.locator('[name*="employeeId"]').first();
    await expect(employeeIdField).not.toBeEmpty();

    const firstNameField = page.locator('[name="firstName"]');
    await expect(firstNameField).toBeEmpty();

    const lastNameField = page.locator('[name="lastName"]');
    await expect(lastNameField).toBeEmpty();
  });

  test('TC-004 - Verify validation when submitting form with all empty fields', async ({ page }) => {
    await page.getByRole('link', { name: 'PIM' }).click();
    await page.getByRole('link', { name: 'Add Employee' }).click();

    await page.locator('[name="firstName"]').clear();
    await page.locator('[name="lastName"]').clear();
    await page.click('[type="submit"]');

    await expect(page.locator('text=Required').first()).toBeVisible();
    await expect(page.locator('text=Required').nth(1)).toBeVisible();
  });

  test('TC-005 - Verify validation when Last Name is missing', async ({ page }) => {
    await page.getByRole('link', { name: 'PIM' }).click();
    await page.getByRole('link', { name: 'Add Employee' }).click();

    await page.fill('[name="firstName"]', 'John');
    await page.locator('[name="lastName"]').clear();
    await page.click('[type="submit"]');

    await expect(page.locator('text=Required')).toBeVisible();
  });

  test('TC-006 - Verify duplicate Employee ID validation', async ({ page }) => {
    await page.getByRole('link', { name: 'PIM' }).click();
    await page.getByRole('link', { name: 'Add Employee' }).click();

    await page.fill('[name="firstName"]', 'Michael');
    await page.fill('[name="lastName"]', 'Smith');
    await page.fill('[name*="employeeId"]', '0401');
    await page.click('[type="submit"]');

    await expect(page.locator('text=Employee Id already exists')).toBeVisible();
  });

  test('TC-007 - Verify Last Name field character length validation', async ({ page }) => {
    await page.getByRole('link', { name: 'PIM' }).click();
    await page.getByRole('link', { name: 'Add Employee' }).click();

    const longString = 'a'.repeat(58);
    await page.fill('[name="firstName"]', 'Test');
    await page.fill('[name="lastName"]', longString);
    await page.click('[type="submit"]');

    await expect(page.locator('text=Should not exceed 30 characters')).toBeVisible();
  });

  test('TC-008 - Verify special characters are allowed in name fields (Known Issue)', async ({ page }) => {
    // Known Issue: Medium severity - Special characters should be restricted but are currently accepted
    await page.getByRole('link', { name: 'PIM' }).click();
    await page.getByRole('link', { name: 'Add Employee' }).click();

    await page.fill('[name="firstName"]', '@#$%&*');
    await page.fill('[name="lastName"]', 'Test');
    await page.click('[type="submit"]');

    await expect(page.locator('text=@#$%&* Test')).toBeVisible();
  });

  test('TC-009 - Verify auto-generated Employee ID is displayed on form load', async ({ page }) => {
    await page.getByRole('link', { name: 'PIM' }).click();
    await page.getByRole('link', { name: 'Add Employee' }).click();

    const employeeIdField = page.locator('[name*="employeeId"]').first();
    await expect(employeeIdField).not.toBeEmpty();
  });

  test('TC-010 - Verify First Name field character length boundary (30 characters)', async ({ page }) => {
    await page.getByRole('link', { name: 'PIM' }).click();
    await page.getByRole('link', { name: 'Add Employee' }).click();

    const exactlyThirtyChars = 'a'.repeat(31);
    await page.fill('[name="firstName"]', exactlyThirtyChars);
    await page.fill('[name="lastName"]', 'Test');
    await page.click('[type="submit"]');

    await expect(page.locator('text=Should not exceed 30 characters')).toBeVisible();
  });
});
