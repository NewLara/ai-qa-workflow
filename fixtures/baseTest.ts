import { test as base, expect } from '@playwright/test';
import { AddEmployeePage } from '../pages/AddEmployeePage';
import { EmployeeListPage } from '../pages/EmployeeListPage';

type TestFixtures = {
  addEmployeePage: AddEmployeePage;
  employeeListPage: EmployeeListPage;
};

export const test = base.extend<TestFixtures>({
  addEmployeePage: async ({ page }, use) => {
    const addEmployeePage = new AddEmployeePage(page);
    await use(addEmployeePage);
  },

  employeeListPage: async ({ page }, use) => {
    const employeeListPage = new EmployeeListPage(page);
    await use(employeeListPage);
  },
});

export { expect };
