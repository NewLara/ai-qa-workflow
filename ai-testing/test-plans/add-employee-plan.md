# Test Plan — Add Employee
**Date:** 2026-07-24
**Feature:** PIM > Add Employee (OrangeHRM PIM module)
**Environment:** https://opensource-demo.orangehrmlive.com

## Source of Evidence
Live interactive browser exploration (clicks/typing) was unavailable this
session — `claude-in-chrome` navigation and screenshots worked, but input
events were not reaching the page (confirmed via a JS `mousedown`-listener
test and a `Tab`-key focus test that both showed zero events received).
Read-only DOM inspection (`elementFromPoint`, `getBoundingClientRect`) at
`/web/index.php/pim/addEmployee` confirmed the current form structure
matches what's below. Documented behavior for validation/negative/edge
scenarios is carried forward from this same project's own prior verified
run: `ai-testing/manual-runs/2026-04-05_orangehrm-add-employee.md` and
`ai-testing/manual-test-cases/orangehrm-add-employee-test-cases.md` (both in
git history — removed from the working tree when the old Cursor workflow
was retired, not because they were wrong). Treat this plan as carried-forward
+ re-confirmed, not freshly re-clicked-through — the generator/runner will
be the first stage to actually execute these again end-to-end.

## E2E Scenarios

**E2E-001**
- **Title:** Successfully add employee with all required fields
- **Type:** Happy Path
- **Preconditions:** Logged in as Admin, on PIM > Add Employee
- **Steps:**
  1. Enter "Sarah" in First Name
  2. Enter "Johnson" in Last Name
  3. Click Save
- **Expected Result:** Employee is created; the resulting page displays "Sarah" and "Johnson"

**E2E-002**
- **Title:** Navigate to Add Employee form and verify initial state
- **Type:** Happy Path
- **Preconditions:** Logged in as Admin
- **Steps:**
  1. Click PIM > Add Employee
  2. Observe the form
- **Expected Result:** First Name and Last Name fields are empty; Employee ID field is pre-populated with an auto-generated value

**E2E-003**
- **Title:** Verify validation when submitting with all fields empty
- **Type:** Negative
- **Preconditions:** On Add Employee form
- **Steps:**
  1. Leave First Name and Last Name empty
  2. Click Save
- **Expected Result:** "Required" errors appear under both First Name and Last Name; form is not submitted

**E2E-004**
- **Title:** Verify validation when Last Name is missing
- **Type:** Negative
- **Preconditions:** On Add Employee form
- **Steps:**
  1. Enter "John" in First Name
  2. Leave Last Name empty
  3. Click Save
- **Expected Result:** "Required" error appears only under Last Name; form is not submitted

**E2E-005**
- **Title:** Duplicate Employee ID validation
- **Type:** Negative
- **Preconditions:** An employee with a known Employee ID already exists
- **Steps:**
  1. Enter a valid First/Last Name
  2. Set Employee ID to one that already exists
  3. Click Save
- **Expected Result:** "Employee Id already exists" error appears, submission prevented — **caveat:** the original manual run observed this error correctly, but the original automated spec later found it inconsistent in this demo environment (IDs appeared to auto-increment past manually-set duplicates) and skipped the test. Generator should implement it but keep the same caution — skip with a documented comment if it proves flaky rather than leaving a false failure.

**E2E-006**
- **Title:** Last Name character length validation
- **Type:** Negative
- **Preconditions:** On Add Employee form
- **Steps:**
  1. Enter "Test" in First Name
  2. Enter a 58-character string in Last Name
  3. Click Save
- **Expected Result:** "Should not exceed 30 characters" error appears under Last Name; submission prevented

**E2E-007**
- **Title:** Special characters in First Name are accepted (Known Issue)
- **Type:** Edge Case
- **Preconditions:** On Add Employee form
- **Steps:**
  1. Enter "@#$%&*" in First Name
  2. Enter "Test" in Last Name
  3. Click Save
- **Expected Result:** Employee is created with the literal special characters in the name — no validation error. This is a known data-quality issue (Medium severity), not a test bug; keep the test but comment why.

**E2E-008**
- **Title:** First Name character length boundary
- **Type:** Edge Case
- **Preconditions:** On Add Employee form
- **Steps:**
  1. Enter a 31-character string in First Name
  2. Enter "Test" in Last Name
  3. Click Save
- **Expected Result:** "Should not exceed 30 characters" error appears. Note: the exact boundary (does exactly 30 characters pass?) was not conclusively isolated in prior evidence — generator should test the 31-character over-limit case as the primary assertion and may add a 30-character within-limit case if it can confirm the field's real maxlength from the DOM.

## Security Scenarios

**SEC-001**
- **Title:** Unauthenticated access to Add Employee redirects to login
- **Type:** Security — auth guard
- **Steps:** With no session/storageState, navigate directly to
  `/web/index.php/pim/addEmployee`
- **Expected Result:** Redirected to the login page, not the form

**SEC-002**
- **Title:** XSS payload in First Name is not executed
- **Type:** Security — input validation
- **Steps:**
  1. Enter `<script>alert(1)</script>` in First Name, valid Last Name
  2. Click Save
- **Expected Result:** No `dialog` event fires; if the value is echoed back on the resulting page, it renders as inert text, not an executed script. Given E2E-007 already shows this field has no character restriction, expect the payload to be accepted as literal text — the check here is specifically that it stays inert, not that it's rejected.

**SEC-003**
- **Title:** Session cookie security flags
- **Type:** Security — session handling
- **Steps:** After login, inspect the session cookie via `context.cookies()`
- **Expected Result:** Document actual `httpOnly`/`secure`/`sameSite` values. Treat as informational rather than a hard pass/fail unless a flag is clearly missing in a way that matters (e.g. missing `httpOnly` on a session cookie).

**SEC-004**
- **Title:** Response security headers
- **Type:** Security — headers (informational)
- **Steps:** Use the `request` fixture to GET the base URL and inspect response headers
- **Expected Result:** Document presence/absence of `X-Frame-Options`, `Content-Security-Policy`, `X-Content-Type-Options`. This demo app is not expected to be hardened — log findings, don't fail the suite over missing headers.

**Skipped:** Authorization/IDOR checks. OrangeHRM's demo uses a single shared Admin account with no per-record access control to test — there's no meaningful "other user's data" boundary on this feature to probe.

## Integration Scenarios

**INT-001**
- **Title:** Newly added employee appears in Employee List
- **Type:** Integration
- **Preconditions:** An employee was just created (e.g. via E2E-001)
- **Steps:**
  1. Navigate to PIM > Employee List
  2. Search by the new employee's Employee ID
- **Expected Result:** "(1) Record Found" showing the new employee's name and ID — this was directly confirmed in the prior manual run (TC-002/TC-007 equivalent).

**Not explored:** Whether a newly added employee becomes available/selectable in other modules that reference employee records (Leave, Time, Recruitment). This wasn't checked in this session or the prior manual run — flagging as a gap for a future planning pass once live browser exploration is available again, rather than guessing at the behavior.

## Notes
- Current DOM at `/pim/addEmployee` (confirmed read-only this session) still
  matches `pages/AddEmployeePage.ts`'s existing locators: `input[name="firstName"]`-style
  fields, employee ID field as the last `.oxd-input`, `button[type="submit"]`
  for Save. No locator changes needed going in.
- The Employee ID auto-increments across runs (seen as "0370" this session
  vs "0401"/"0402" previously) — don't hardcode an expected ID anywhere.
