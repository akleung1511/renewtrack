// EditCustomerPage.jsx
// This page allows the user to edit an existing customer.

// =========================================================
// IMPORTS
// =========================================================

import { useState } from "react";

import {
  useParams,
  Link,
  useNavigate,
} from "react-router-dom";

// Import reusable customer validation functions.
import {
  validateCustomer,
  hasValidationErrors,
} from "../utils/validationUtils.js";

// =========================================================
// EDIT CUSTOMER PAGE COMPONENT
// =========================================================

// Receive:
// - customers: shared customer list from App.jsx
// - updateCustomer: function that updates the customer API
function EditCustomerPage({
  customers,
  updateCustomer,
}) {
  // =========================================================
  // READ CUSTOMER ID FROM URL
  // =========================================================

  // Example:
  // /customers/1/edit
  //
  // customerId will contain "1".
  const { customerId } = useParams();

  // Allows us to navigate after saving.
  const navigate = useNavigate();

  // =========================================================
  // FIND THE SELECTED CUSTOMER
  // =========================================================

  // useParams gives us customerId as a string.
  //
  // json-server can also generate IDs containing letters,
  // so compare both IDs as strings.
  const customer = customers.find(
    (customer) =>
      String(customer.id) === String(customerId),
  );

  // =========================================================
  // EDIT FORM STATE
  // =========================================================

  // Start the form with the customer's existing values.
  const [formData, setFormData] = useState({
    companyName: customer?.companyName || "",
    contactPerson: customer?.contactPerson || "",
    email: customer?.email || "",
    phone: customer?.phone || "",
  });

  // =========================================================
  // VALIDATION ERROR STATE
  // =========================================================

  // Store validation messages.
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
    const { name, value } = event.target;

    // Update the field that the user changed.
    setFormData((previousFormData) => ({
      ...previousFormData,
      [name]: value,
    }));

    // Remove the validation error for this field
    // when the user starts correcting it.
    setErrors((previousErrors) => ({
      ...previousErrors,
      [name]: "",
    }));
  };

  // =========================================================
  // HANDLE FORM SUBMISSION
  // =========================================================

  const handleSubmit = async (event) => {
    // Prevent normal browser form submission.
    event.preventDefault();

    // Validate the complete customer form.
    const validationErrors =
      validateCustomer(formData);

    // Store validation errors so they can
    // be displayed underneath the fields.
    setErrors(validationErrors);

    // Stop here if validation failed.
    if (hasValidationErrors(validationErrors)) {
      return;
    }

    // =======================================================
    // CREATE UPDATED CUSTOMER
    // =======================================================

    const updatedCustomer = {
      // Keep json-server ID as a string.
      id: customerId,

      // trim() removes accidental spaces
      // from the beginning and end.
      companyName: formData.companyName.trim(),
      contactPerson:
        formData.contactPerson.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
    };

    // Send the customer to App.jsx and wait
    // for the API update to finish.
    await updateCustomer(updatedCustomer);

    // Return to Customers after successful update.
    navigate("/customers");
  };

  // =========================================================
  // CUSTOMER NOT FOUND
  // =========================================================

  if (!customer) {
    return (
      <main>
        <h1>Customer Not Found</h1>

        <Link
          to="/customers"
          className="back-link"
        >
          ← Back to Customers
        </Link>
      </main>
    );
  }

  // =========================================================
  // DISPLAY PAGE
  // =========================================================

  return (
    <main>
      {/* =====================================================
          PAGE HEADER
          ===================================================== */}

      <h1>Edit Customer</h1>

      <p>Editing Customer ID: {customerId}</p>

      <Link
        to="/customers"
        className="back-link"
      >
        ← Back to Customers
      </Link>

      {/* =====================================================
          EDIT CUSTOMER FORM
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
          />

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
          Save Changes
        </button>
      </form>
    </main>
  );
}

// =========================================================
// EXPORT
// =========================================================

export default EditCustomerPage;