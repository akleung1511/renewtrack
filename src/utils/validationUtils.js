// validationUtils.js
// This file contains reusable validation functions
// used by the customer and contract forms.

// =========================================================
// EMAIL VALIDATION
// =========================================================

// Check whether an email has a basic valid structure.
//
// Example:
// john@example.com → valid
// johnexample.com   → invalid
export function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailPattern.test(email.trim());
}

// =========================================================
// CUSTOMER VALIDATION
// =========================================================

// Validate the customer form.
//
// This function receives the customer form data
// and returns an object containing validation errors.
//
// No errors:
// {}
//
// Example with errors:
// {
//   companyName: "Company name is required.",
//   email: "Please enter a valid email address."
// }
export function validateCustomer(formData) {
  const errors = {};

  // Company name is required.
  if (!formData.companyName.trim()) {
    errors.companyName = "Company name is required.";
  }

  // Contact person is required.
  if (!formData.contactPerson.trim()) {
    errors.contactPerson = "Contact person is required.";
  }

  // Email is required.
  if (!formData.email.trim()) {
    errors.email = "Email is required.";
  } else if (!isValidEmail(formData.email)) {
    // If an email was entered,
    // make sure its format is valid.
    errors.email =
      "Please enter a valid email address.";
  }

  // Phone number is required.
  if (!formData.phone.trim()) {
    errors.phone = "Phone number is required.";
  }

  return errors;
}

// =========================================================
// CONTRACT VALIDATION
// =========================================================

// Validate the contract form.
//
// We check:
// - Customer selected
// - Contract name
// - Start date
// - Expiry date
// - Expiry must be after start
// - Contract value
// - Status
export function validateContract(formData) {
  const errors = {};

  // Customer must be selected.
  if (!formData.customerId) {
    errors.customerId = "Please select a customer.";
  }

  // Contract name is required.
  if (!formData.contractName.trim()) {
    errors.contractName = "Contract name is required.";
  }

  // Start date is required.
  if (!formData.startDate) {
    errors.startDate = "Start date is required.";
  }

  // Expiry date is required.
  if (!formData.expiryDate) {
    errors.expiryDate = "Expiry date is required.";
  }

  // =======================================================
  // DATE VALIDATION
  // =======================================================

  // Only compare the dates when both were entered.
  if (formData.startDate && formData.expiryDate) {
    const startDate = new Date(formData.startDate);
    const expiryDate = new Date(formData.expiryDate);

    // A contract must expire after its start date.
    if (expiryDate <= startDate) {
      errors.expiryDate =
        "Expiry date must be after the start date.";
    }
  }

  // =======================================================
  // CONTRACT VALUE VALIDATION
  // =======================================================

  // Contract value is required.
  if (formData.value === "") {
    errors.value = "Contract value is required.";
  } else if (Number(formData.value) <= 0) {
    // Prevent zero and negative contract values.
    errors.value =
      "Contract value must be greater than 0.";
  }

  // Status is required.
  if (!formData.status) {
    errors.status = "Contract status is required.";
  }

  return errors;
}

// =========================================================
// VALIDATION RESULT HELPER
// =========================================================

// Check whether the errors object contains
// any validation errors.
//
// Example:
//
// {}
// Object.keys(errors).length = 0
// → valid
//
// { email: "Invalid email" }
// Object.keys(errors).length = 1
// → invalid
export function hasValidationErrors(errors) {
  return Object.keys(errors).length > 0;
}