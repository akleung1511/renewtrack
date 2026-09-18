// NewContractPage.jsx
// This page allows the user to create a new contract.

// =========================================================
// IMPORTS
// =========================================================

import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

// Import reusable contract validation functions.
import {
  validateContract,
  hasValidationErrors,
} from "../utils/validationUtils.js";

// =========================================================
// NEW CONTRACT PAGE COMPONENT
// =========================================================

// Receive:
// addContract -> function from App.jsx used to save a contract
// customers   -> customer list loaded from our API
function NewContractPage({
  addContract,
  customers,
}) {
  // =========================================================
  // NAVIGATION
  // =========================================================

  // Used to return to Contracts after
  // successfully creating a contract.
  const navigate = useNavigate();

  // =========================================================
  // FORM STATE
  // =========================================================

  const [formData, setFormData] = useState({
    customerId: "",
    contractName: "",
    startDate: "",
    expiryDate: "",
    value: "",
    status: "Active",
  });

  // =========================================================
  // VALIDATION ERROR STATE
  // =========================================================

  // Store validation errors for each field.
  const [errors, setErrors] = useState({});

  // =========================================================
  // HANDLE FORM INPUT CHANGES
  // =========================================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    // Update the field that changed.
    setFormData((previousFormData) => ({
      ...previousFormData,
      [name]: value,
    }));

    // Clear this field's error when
    // the user starts correcting it.
    setErrors((previousErrors) => ({
      ...previousErrors,
      [name]: "",
    }));
  };

  // =========================================================
  // HANDLE FORM SUBMISSION
  // =========================================================

  const handleSubmit = async (event) => {
    // Prevent the browser from refreshing.
    event.preventDefault();

    // =======================================================
    // VALIDATE FORM
    // =======================================================

    const validationErrors =
      validateContract(formData);

    // Display any validation errors.
    setErrors(validationErrors);

    // Stop if validation failed.
    if (hasValidationErrors(validationErrors)) {
      return;
    }

    // =======================================================
    // FIND SELECTED CUSTOMER
    // =======================================================

    // json-server IDs may contain letters,
    // so compare both values as strings.
    const selectedCustomer = customers.find(
      (customer) =>
        String(customer.id) ===
        String(formData.customerId),
    );

    // This should normally never happen because
    // validation already requires a customer.
    //
    // However, we still protect against an ID
    // that no longer exists in the customer list.
    if (!selectedCustomer) {
      setErrors((previousErrors) => ({
        ...previousErrors,
        customerId:
          "The selected customer could not be found.",
      }));

      return;
    }

    // =======================================================
    // CREATE NEW CONTRACT
    // =======================================================

    const newContract = {
      // Store the real json-server customer ID.
      customerId: formData.customerId,

      // Store company name for easy display.
      customer: selectedCustomer.companyName,

      // Remove accidental spaces from the contract name.
      contractName: formData.contractName.trim(),

      startDate: formData.startDate,
      expiryDate: formData.expiryDate,

      // HTML number inputs still return strings,
      // so convert the value into a number.
      value: Number(formData.value),

      status: formData.status,
    };

    // =======================================================
    // SAVE CONTRACT
    // =======================================================

    // Wait for App.jsx to POST the contract
    // to json-server.
    await addContract(newContract);

    // Navigate only after the API request finishes.
    navigate("/contracts");
  };

  // =========================================================
  // DISPLAY PAGE
  // =========================================================

  return (
    <main>
      {/* =====================================================
          PAGE HEADER
          ===================================================== */}

      <h1>Add Contract</h1>

      <p>
        Create a new customer contract in RenewTrack.
      </p>

      <Link
        to="/contracts"
        className="back-link"
      >
        ← Back to Contracts
      </Link>

      {/* =====================================================
          ADD CONTRACT FORM
          ===================================================== */}

      <form
        className="contract-form"
        onSubmit={handleSubmit}
        noValidate
      >
        {/* ===================================================
            CUSTOMER
            =================================================== */}

        <div className="form-group">
          <label htmlFor="customerId">
            Customer
          </label>

          <select
            id="customerId"
            name="customerId"
            value={formData.customerId}
            onChange={handleChange}
          >
            <option value="">
              Select a customer
            </option>

            {customers.map((customer) => (
              <option
                key={customer.id}
                value={customer.id}
              >
                {customer.companyName}
              </option>
            ))}
          </select>

          {errors.customerId && (
            <p className="form-error">
              {errors.customerId}
            </p>
          )}
        </div>

        {/* ===================================================
            CONTRACT NAME
            =================================================== */}

        <div className="form-group">
          <label htmlFor="contractName">
            Contract Name
          </label>

          <input
            type="text"
            id="contractName"
            name="contractName"
            value={formData.contractName}
            onChange={handleChange}
            placeholder="e.g. IT Maintenance Contract"
          />

          {errors.contractName && (
            <p className="form-error">
              {errors.contractName}
            </p>
          )}
        </div>

        {/* ===================================================
            START DATE
            =================================================== */}

        <div className="form-group">
          <label htmlFor="startDate">
            Start Date
          </label>

          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
          />

          {errors.startDate && (
            <p className="form-error">
              {errors.startDate}
            </p>
          )}
        </div>

        {/* ===================================================
            EXPIRY DATE
            =================================================== */}

        <div className="form-group">
          <label htmlFor="expiryDate">
            Expiry Date
          </label>

          <input
            type="date"
            id="expiryDate"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
          />

          {errors.expiryDate && (
            <p className="form-error">
              {errors.expiryDate}
            </p>
          )}
        </div>

        {/* ===================================================
            CONTRACT VALUE
            =================================================== */}

        <div className="form-group">
          <label htmlFor="value">
            Contract Value (SGD)
          </label>

          <input
            type="number"
            id="value"
            name="value"
            value={formData.value}
            onChange={handleChange}
            placeholder="e.g. 24000"
            min="0"
          />

          {errors.value && (
            <p className="form-error">
              {errors.value}
            </p>
          )}
        </div>

        {/* ===================================================
            STATUS
            =================================================== */}

        <div className="form-group">
          <label htmlFor="status">
            Status
          </label>

          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Active">
              Active
            </option>

            <option value="Expiring Soon">
              Expiring Soon
            </option>

            <option value="Expired">
              Expired
            </option>
          </select>

          {errors.status && (
            <p className="form-error">
              {errors.status}
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
          Add Contract
        </button>
      </form>
    </main>
  );
}

// =========================================================
// EXPORT
// =========================================================

export default NewContractPage;