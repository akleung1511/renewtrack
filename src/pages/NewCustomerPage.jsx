// NewCustomerPage.jsx
// This page allows the user to create a new customer.

// =========================================================
// IMPORTS
// =========================================================

// useState allows the page to store:
// 1. Form values
// 2. Validation errors
import { useState } from "react";

// Link provides navigation links.
// useNavigate lets us navigate after adding a customer.
import {
  Link,
  useNavigate,
} from "react-router-dom";

// Import reusable customer validation functions.
import {
  validateCustomer,
  hasValidationErrors,
} from "../utils/validationUtils.js";

// =========================================================
// NEW CUSTOMER PAGE COMPONENT
// =========================================================

// Receive addCustomer from App.jsx through props.
function NewCustomerPage({ addCustomer }) {
  // =========================================================
  // NAVIGATION
  // =========================================================

  // Used to return to Customers after
  // successfully adding a customer.
  const navigate = useNavigate();

  // =========================================================
  // FORM STATE
  // =========================================================

  // Store all values entered into the form.
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
  });

  // =========================================================
  // VALIDATION ERROR STATE
  // =========================================================

  // Store validation messages for each field.
  //
  // Example:
  //
  // {
  //   companyName: "Company name is required.",
  //   email: "Please enter a valid email address."
  // }
  const [errors, setErrors] = useState({});

  // =========================================================
  // HANDLE FORM INPUT CHANGES
  // =========================================================

  const handleChange = (event) => {
    // name tells us which field changed.
    // value tells us what the user entered.
    const { name, value } = event.target;

    // Update only the field that changed.
    setFormData((previousFormData) => ({
      ...previousFormData,
      [name]: value,
    }));

    // Clear the validation error for this field
    // when the user starts correcting it.
    setErrors((previousErrors) => ({
      ...previousErrors,
      [name]: "",
    }));
  };

  // =========================================================
  // HANDLE FORM SUBMISSION
  // =========================================================

  // async allows us to wait for the API request
  // before navigating away.
  const handleSubmit = async (event) => {
    // Prevent the browser from refreshing.
    event.preventDefault();

    // =======================================================
    // VALIDATE FORM
    // =======================================================

    // Send the current form values to our
    // reusable validation function.
    const validationErrors =
      validateCustomer(formData);

    // Store any validation errors so that
    // they can be displayed on the page.
    setErrors(validationErrors);

    // If validation failed, stop here.
    //
    // The customer will NOT be sent to the API.
    if (hasValidationErrors(validationErrors)) {
      return;
    }

    // =======================================================
    // CREATE NEW CUSTOMER
    // =======================================================

    // Build the customer object that will
    // be sent to App.jsx.
    const newCustomer = {
      // trim() removes accidental spaces
      // from the beginning and end.
      companyName: formData.companyName.trim(),
      contactPerson:
        formData.contactPerson.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
    };

    // =======================================================
    // SAVE CUSTOMER
    // =======================================================

    // Send the new customer to App.jsx.
    //
    // App.jsx will POST the customer to json-server.
    await addCustomer(newCustomer);

    // Only navigate after the API request has finished.
    navigate("/customers");
  };

  // =========================================================
  // DISPLAY PAGE
  // =========================================================

  return (
    <main>
      {/* =====================================================
          PAGE HEADER
          ===================================================== */}

      <h1>Add Customer</h1>

      <p>
        Create a new customer record in RenewTrack.
      </p>

      <Link
        to="/customers"
        className="back-link"
      >
        ← Back to Customers
      </Link>

      {/* =====================================================
          ADD CUSTOMER FORM
          ===================================================== */}

      <form
        className="contract-form"
        onSubmit={handleSubmit}
        noValidate
      >
        {/* ===================================================
            COMPANY NAME
            =================================================== */}

        <div className="form-group">
          <label htmlFor="companyName">
            Company Name
          </label>

          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="e.g. ABC Pte Ltd"
          />

          {/* Show the error only when one exists. */}
          {errors.companyName && (
            <p className="form-error">
              {errors.companyName}
            </p>
          )}
        </div>

        {/* ===================================================
            CONTACT PERSON
            =================================================== */}

        <div className="form-group">
          <label htmlFor="contactPerson">
            Contact Person
          </label>

          <input
            type="text"
            id="contactPerson"
            name="contactPerson"
            value={formData.contactPerson}
            onChange={handleChange}
            placeholder="e.g. John Tan"
          />

          {errors.contactPerson && (
            <p className="form-error">
              {errors.contactPerson}
            </p>
          )}
        </div>

        {/* ===================================================
            EMAIL
            =================================================== */}

        <div className="form-group">
          <label htmlFor="email">
            Email
          </label>

          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g. john@company.com"
          />

          {errors.email && (
            <p className="form-error">
              {errors.email}
            </p>
          )}
        </div>

        {/* ===================================================
            PHONE
            =================================================== */}

        <div className="form-group">
          <label htmlFor="phone">
            Phone
          </label>

          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="e.g. +65 6123 4567"
          />

          {errors.phone && (
            <p className="form-error">
              {errors.phone}
            </p>
          )}
        </div>

        {/* ===================================================
            FORM ACTION
            =================================================== */}

        <button
          type="submit"
          className="submit-button"
        >
          Add Customer
        </button>
      </form>
    </main>
  );
}

// =========================================================
// EXPORT
// =========================================================

export default NewCustomerPage;