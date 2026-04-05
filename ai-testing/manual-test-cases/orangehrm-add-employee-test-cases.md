# Manual Test Cases — OrangeHRM Add Employee

**Feature:** Add Employee in PIM Module  
**Application:** OrangeHRM  
**Environment:** https://opensource-demo.orangehrmlive.com  
**Generated From:** Manual run report dated 2026-04-05  

---

## Test Cases

### Happy Path

**TC-001**
- **Title:** Successfully add employee with all required fields
- **Category:** Happy Path
- **Preconditions:** 
  - User is logged in as Admin (username: Admin, password: admin123)
  - User has access to PIM module
- **Steps:**
  1. Navigate to PIM > Add Employee
  2. Verify Employee ID is auto-generated
  3. Enter "Sarah" in First Name field
  4. Enter "Johnson" in Last Name field
  5. Click Save button
- **Expected Result:** Employee is created successfully, profile page loads displaying "Sarah Johnson" with auto-generated Employee ID

**TC-002**
- **Title:** Verify newly added employee appears in Employee List
- **Category:** Happy Path
- **Preconditions:**
  - User is logged in as Admin (username: Admin, password: admin123)
  - Employee with ID 0401 exists in system
- **Steps:**
  1. Navigate to PIM > Employee List
  2. Enter Employee ID "0401" in search field
  3. Click Search button
- **Expected Result:** System displays "(1) Record Found" showing employee "Sarah Johnson" with ID 0401

**TC-003**
- **Title:** Navigate to Add Employee form from PIM menu
- **Category:** Happy Path
- **Preconditions:**
  - User is logged in as Admin (username: Admin, password: admin123)
  - Dashboard is displayed
- **Steps:**
  1. Click on PIM menu item
  2. Click on Add Employee submenu
- **Expected Result:** Add Employee form displays with auto-generated Employee ID and empty First Name and Last Name fields

---

### Negative Tests

**TC-004**
- **Title:** Verify validation when submitting form with all empty fields
- **Category:** Negative
- **Preconditions:**
  - User is logged in as Admin (username: Admin, password: admin123)
  - Add Employee form is displayed
- **Steps:**
  1. Leave all fields empty (First Name, Last Name, Employee ID)
  2. Click Save button
- **Expected Result:** "Required" validation errors appear on both First Name and Last Name fields, form is not submitted

**TC-005**
- **Title:** Verify validation when Last Name is missing
- **Category:** Negative
- **Preconditions:**
  - User is logged in as Admin (username: Admin, password: admin123)
  - Add Employee form is displayed
- **Steps:**
  1. Enter "John" in First Name field
  2. Leave Last Name field empty
  3. Click Save button
- **Expected Result:** "Required" validation error appears only on Last Name field, form is not submitted

**TC-006**
- **Title:** Verify duplicate Employee ID validation
- **Category:** Negative
- **Preconditions:**
  - User is logged in as Admin (username: Admin, password: admin123)
  - Employee with ID 0401 already exists in system
  - Add Employee form is displayed
- **Steps:**
  1. Enter "Michael" in First Name field
  2. Enter "Smith" in Last Name field
  3. Enter "0401" in Employee ID field (duplicate ID)
  4. Click Save button
- **Expected Result:** "Employee Id already exists" error message is displayed, form submission is prevented

**TC-007**
- **Title:** Verify Last Name field character length validation
- **Category:** Negative
- **Preconditions:**
  - User is logged in as Admin (username: Admin, password: admin123)
  - Add Employee form is displayed
- **Steps:**
  1. Enter "Test" in First Name field
  2. Enter a string of 58 characters in Last Name field
  3. Click Save button
- **Expected Result:** "Should not exceed 30 characters" validation error is displayed on Last Name field, form submission is prevented

**TC-008**
- **Title:** Verify special characters are allowed in name fields (Known Issue)
- **Category:** Negative
- **Preconditions:**
  - User is logged in as Admin (username: Admin, password: admin123)
  - Add Employee form is displayed
- **Steps:**
  1. Enter "@#$%&*" in First Name field
  2. Enter "Test" in Last Name field
  3. Click Save button
- **Expected Result:** Employee is created with name "@#$%&* Test" — NO validation errors shown (Medium severity finding - validation should restrict special characters)

---

### Edge Cases

**TC-009**
- **Title:** Verify auto-generated Employee ID is displayed on form load
- **Category:** Edge Case
- **Preconditions:**
  - User is logged in as Admin (username: Admin, password: admin123)
- **Steps:**
  1. Navigate to PIM > Add Employee
- **Expected Result:** Employee ID field is pre-populated with an auto-generated ID

**TC-010**
- **Title:** Verify First Name field character length boundary (30 characters)
- **Category:** Edge Case
- **Preconditions:**
  - User is logged in as Admin (username: Admin, password: admin123)
  - Add Employee form is displayed
- **Steps:**
  1. Enter exactly 30 characters in First Name field
  2. Enter "Test" in Last Name field
  3. Click Save button
- **Expected Result:** Validation error "Should not exceed 30 characters" appears based on Last Name field behavior. Note: First Name length limit was not explicitly tested in the manual run and should be verified.

---

## Known Issues

### Issue #1: Special Characters Allowed in Name Fields
- **Severity:** Medium
- **Test Case:** TC-008
- **Description:** First Name and Last Name fields accept special characters (@#$%&*) without validation
- **Recommendation:** Add input validation to restrict special characters for data integrity

---

## Test Credentials
- **Username:** Admin
- **Password:** admin123
- **Base URL:** https://opensource-demo.orangehrmlive.com

---

## Summary
- **Total Test Cases:** 10
- **Happy Path:** 3
- **Negative:** 5
- **Edge Case:** 2
- **Known Issues:** 1

---

**Generated:** 2026-04-05  
**Source Report:** ai-testing/manual-runs/2026-04-05_orangehrm-add-employee.md
