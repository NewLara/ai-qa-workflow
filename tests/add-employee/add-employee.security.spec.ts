import { test, expect } from '../../fixtures/baseTest';

/**
 * Add Employee — Security
 *
 * Generated from: ai-testing/test-plans/add-employee-plan.md
 * Application: OrangeHRM Demo
 *
 * Scope: Playwright-only, no external security tooling. Header/cookie checks
 * are informational — this demo app is not expected to be hardened, so they
 * document findings rather than hard-fail the suite.
 */

test.describe('Add Employee - Security', () => {
  test.describe('Authenticated checks', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(process.env.BASE_URL!);
    });

    test('SEC-002 - XSS payload in First Name is not executed', async ({ page, addEmployeePage }) => {
      let dialogFired = false;
      page.on('dialog', async (dialog) => {
        dialogFired = true;
        await dialog.dismiss();
      });

      await addEmployeePage.navigateToAddEmployee();
      const payload = '<script>alert(1)</script>';
      await addEmployeePage.fillEmployeeForm(payload, 'Test');
      await addEmployeePage.submitForm();

      expect(dialogFired).toBe(false);
      // This field has no character restriction (see E2E-007), so the payload
      // is expected to be accepted and echoed back as inert text.
      await expect(page.getByText(payload)).toBeVisible({ timeout: 10000 });
    });

    test('SEC-003 - Session cookie security flags', async ({ page, context }) => {
      await page.waitForLoadState('networkidle');
      const cookies = await context.cookies();
      const sessionCookie = cookies.find((c) => /orangehrm|jsessionid|session/i.test(c.name));

      expect(sessionCookie, 'expected a session cookie to be set after login').toBeTruthy();
      test.info().annotations.push({
        type: 'cookie-flags',
        description: `httpOnly=${sessionCookie?.httpOnly}, secure=${sessionCookie?.secure}, sameSite=${sessionCookie?.sameSite}`,
      });
      expect(sessionCookie?.httpOnly, 'session cookie should be httpOnly').toBe(true);
    });
  });

  test.describe('Unauthenticated access', () => {
    test.use({ storageState: { cookies: [], origins: [] } });

    test('SEC-001 - Unauthenticated access to Add Employee redirects to login', async ({ page }) => {
      await page.goto(`${process.env.BASE_URL}/web/index.php/pim/addEmployee`);
      await expect(page).toHaveURL(/auth\/login/);
    });
  });

  test.describe('Response headers', () => {
    test('SEC-004 - Response security headers (informational)', async ({ request }) => {
      const response = await request.get(process.env.BASE_URL!);
      const headers = response.headers();

      test.info().annotations.push({
        type: 'security-headers',
        description: JSON.stringify({
          'x-frame-options': headers['x-frame-options'] ?? 'MISSING',
          'content-security-policy': headers['content-security-policy'] ?? 'MISSING',
          'x-content-type-options': headers['x-content-type-options'] ?? 'MISSING',
        }),
      });
      // Informational only — not asserted, this demo app is not expected to
      // be hardened. See the annotation above for actual findings.
    });
  });
});
