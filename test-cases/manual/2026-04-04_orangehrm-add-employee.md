# Manual Test Report — OrangeHRM Add Employee Feature
**Date:** 2026-04-04
**Tester:** Playwright MCP Agent
**Environment:** https://opensource-demo.orangehrmlive.com
**Scenario:** Manual testing of the Add Employee feature in the OrangeHRM PIM module, including happy path, negative tests, and edge cases

## Steps & Results

| Step | Action | Expected | Actual | Status |
|---|---|---|---|---|
| 1 | Navigate to OrangeHRM and verify login | Application loads and user is logged in | Successfully logged in as "alla Alanazi" | ✅ Pass |
| 2 | Navigate to PIM > Add Employee | Add Employee form loads | Form loaded with First Name, Last Name, and Employee ID fields | ✅ Pass |
| 3 | **Happy Path 1:** Add employee with valid data (First: John, Last: Smith, ID: 0423) | Employee is saved and profile page loads | Employee created successfully, redirected to Personal Details page for empNumber/221 | ✅ Pass |
| 4 | **Happy Path 2:** Search for newly added employee in Employee List | Employee "John Smith" appears in search results | Search found "(1) Record Found" with Employee ID 0423, First Name: John, Last Name: Smith | ✅ Pass |
| 5 | **Negative Test 1:** Submit form with all fields empty (cleared Employee ID) | Required field errors appear | "Required" validation errors displayed under First Name and Last Name fields | ✅ Pass |
| 6 | **Negative Test 2:** Submit with only First Name (Jane), leave Last Name empty | Error appears on Last Name field | "Required" validation error displayed under Last Name field only | ✅ Pass |
| 7 | **Negative Test 3:** Submit with duplicate Employee ID (0423) with new name (Bob Johnson) | Duplicate Employee ID error appears | "Employee Id already exists" error message displayed under Employee Id field | ✅ Pass |
| 8 | **Edge Case 1:** Enter special characters in First Name (@#$%^&*) with Last Name: TestUser | System should validate or accept based on business rules | System accepted special characters, employee created with empNumber/222 and Employee ID 0424 | ⚠️ Pass with Observation |
| 9 | **Edge Case 2:** Enter very long string (70+ chars) in Last Name field | System should enforce character limit | "Should not exceed 30 characters" error message displayed, form not submitted | ✅ Pass |

---

## Issues Found

### Observation 1: Special Characters Allowed in Name Fields
- **Severity:** Low (Business Rule Clarification Needed)
- **Description:** The system accepts special characters (@#$%^&*) in the First Name field without validation errors
- **Element Affected:** First Name field in Add Employee form
- **URL:** https://opensource-demo.orangehrmlive.com/web/index.php/pim/addEmployee
- **Expected vs Actual:** Depending on business requirements, name fields may need validation to allow only letters, spaces, hyphens, and apostrophes. Currently, all special characters are accepted.
- **Evidence:** Employee created with First Name "@#$%^&*" and Employee ID 0424 (empNumber/222)

---

## Summary

All 9 test scenarios were executed successfully. The Add Employee feature demonstrates solid core functionality with proper validation for required fields, duplicate Employee ID detection, and field length limits (30 characters for Last Name). One observation was noted regarding special character validation in name fields, which should be reviewed against business requirements. No blocking issues were found. The feature is functional and ready for use with the recommendation to clarify business rules for special character handling in employee name fields.

**Overall Result:** ✅ PASS (with 1 observation for business rule clarification)
