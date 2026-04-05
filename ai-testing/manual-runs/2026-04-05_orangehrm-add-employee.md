# Manual Test Report — OrangeHRM Add Employee

**Date:** 2026-04-05
**Tester:** Playwright MCP Agent
**Environment:** https://opensource-demo.orangehrmlive.com
**Scenario:** Testing the Add Employee feature in OrangeHRM PIM module including happy path, negative tests, and edge cases

## Steps & Results

| Step | Action | Expected | Actual | Status |
|---|---|---|---|---|
| 1 | Navigate to login page | Login page loads | Login page loaded successfully | ✅ Pass |
| 2 | Login with valid credentials (Admin/admin123) | Dashboard loads | Dashboard loaded successfully | ✅ Pass |
| 3 | Navigate to PIM > Add Employee | Add Employee form displays | Form displayed with auto-generated Employee ID (0401) | ✅ Pass |
| 4 | Submit form with all fields empty | Required field errors appear | "Required" errors displayed for First Name and Last Name fields | ✅ Pass |
| 5 | Enter only First Name ("John"), leave Last Name empty, submit | Last Name required error appears | "Required" error displayed on Last Name field only | ✅ Pass |
| 6 | Add complete employee (First: Sarah, Last: Johnson, ID: 0401) | Employee saved, profile page loads | Employee created successfully, profile page loaded showing "Sarah Johnson" with ID 0401 | ✅ Pass |
| 7 | Navigate to Employee List and search for ID 0401 | Employee appears in list | Found "(1) Record Found" showing Sarah Johnson with ID 0401 | ✅ Pass |
| 8 | Try to add duplicate employee ID (First: Michael, Last: Smith, ID: 0401) | Error message about duplicate ID | "Employee Id already exists" error displayed, form submission prevented | ✅ Pass |
| 9 | Enter special characters in First Name (@#$%&*), valid Last Name (Test), submit | Observe behavior | Employee created successfully with special characters in name - NO VALIDATION | ⚠️ Finding |
| 10 | Enter very long Last Name (58 characters), submit | Observe validation | "Should not exceed 30 characters" error displayed, submission prevented | ✅ Pass |

---

## Issues Found

### Finding 1: Special Characters Allowed in Name Fields
- **Severity:** Medium
- **Description:** The First Name and Last Name fields accept special characters (@#$%&*) without validation or error messages
- **Steps to Reproduce:**
  1. Navigate to PIM > Add Employee
  2. Enter "@#$%&*" in First Name field
  3. Enter "Test" in Last Name field
  4. Click Save
- **Expected:** Field validation should reject special characters or show warning
- **Actual:** Employee created successfully with name "@#$%&* Test" (Employee ID: 0402)
- **Screenshot:** N/A (accepted without error)
- **Recommendation:** Consider adding validation to restrict special characters in name fields for data integrity

---

## Screenshots

- `test-results/screenshots/01-validation-empty-fields.png` — Required field validation when all fields empty
- `test-results/screenshots/02-validation-missing-lastname.png` — Required validation on Last Name when only First Name provided
- `test-results/screenshots/03-duplicate-employee-id.png` — Duplicate Employee ID validation error message
- `test-results/screenshots/04-long-lastname-validation.png` — Character length validation on Last Name field (30 char max)

---

## Summary

The Add Employee feature was tested with 10 test scenarios covering happy path, negative tests, and edge cases. **9 out of 10 tests passed** with expected behavior. One finding was identified: the system accepts special characters in name fields without validation, which may impact data quality. All critical validations (required fields, duplicate ID check, length limits) are working correctly. The feature is functional and meets basic requirements, but consideration should be given to adding input validation for special characters.

**Overall Result:** Pass with 1 Medium Finding
