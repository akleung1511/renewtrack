// EditContractPage.jsx
// This page allows the user to edit an existing contract.

// =========================================================
// IMPORTS
// =========================================================

import { useState } from "react";

import {
  useParams,
  Link,
  useNavigate,
} from "react-router-dom";

// Import reusable contract validation functions.
import {
  validateContract,
  hasValidationErrors,
} from "../utils/validationUtils.js";

// =========================================================
// EDIT CONTRACT PAGE COMPONENT
// =========================================================

// Receive:
// contracts      -> contract list from App.jsx
// customers      -> customer list from App.jsx
// updateContract -> function used to save contract changes
function EditContractPage({
  contracts,
  customers,
  updateContract,
}) {
  // =========================================================
  // READ CONTRACT ID FROM URL
  // =========================================================

  // Example:
  // /contracts/abc123/edit
  //
  // useParams gives us the ID as a string.
  const { contractId } = useParams();

  // Allows us to navigate after saving.
  const navigate = useNavigate();

  // =========================================================
  // FIND THE CONTRACT TO EDIT
  // =========================================================

  // json-server can generate IDs containing letters,
  // so compare both IDs as strings.
  const contract = contracts.find(
    (contract) =>
      String(contract.id) === String(contractId),
  );

  // =========================================================
  // EDIT FORM STATE
  // =========================================================

  // Start the form with the existing contract values.
  const [formData, setFormData] = useState({
    customerId: contract?.customerId || "",
    contractName: contract?.contractName || "",
    startDate: contract?.startDate || "",
    expiryDate: contract?.expiryDate || "",
    value: contract?.value ?? "",
    status: contract?.status || "Active",
  });

  // =========================================================
  // VALIDATION ERROR STATE
  // =========================================================

  // Store validation messages for individual fields.
  const [errors, setErrors] = useState({});

  // =========================================================
  // HANDLE FORM INPUT CHANGES
  // =========================================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    // Update only the field that changed.
    setFormData((previousFormData) => ({
      ...previousFormData,
      [name]: value,
    }));

    // Clear the current field's error when
    // the user starts correcting the value.
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

    // Store validation errors so React
    // can display them underneath the fields.
    setErrors(validationErrors);

    // Stop here if validation failed.
    if (hasValidationErrors(validationErrors)) {
      return;
    }

    // =======================================================
    // FIND THE SELECTED CUSTOMER
    // =======================================================

    // Compare IDs as strings because json-server
    // IDs may contain letters.
    const selectedCustomer = customers.find(
      (customer) =>
        String(customer.id) ===
        String(formData.customerId),
    );

    // Protect against a customer that no longer exists.
    if (!selectedCustomer) {
      setErrors((previousErrors) => ({
        ...previousErrors,
        customerId:
          "The selected customer could not be found.",
      }));

      return;
    }

    // =======================================================
    // CREATE UPDATED CONTRACT
    // =======================================================

    const updatedContract = {
      // Keep the existing contract ID.
      id: contractId,

      // Store the selected customer's ID.
      customerId: formData.customerId,

      // Store the selected customer's company name.
      customer: selectedCustomer.companyName,

      // Remove accidental spaces.
      contractName: formData.contractName.trim(),

      startDate: formData.startDate,
      expiryDate: formData.expiryDate,

      // Number inputs return strings,
      // so convert the value into a number.
      value: Number(formData.value),

      status: formData.status,
    };

    // =======================================================
    // SAVE THROUGH API
    // =======================================================

    // Wait for App.jsx to update the contract
    // through json-server.
    await updateContract(updatedContract);

    // Return to Contracts after the update finishes.
    navigate("/contracts");
  };

  // =========================================================
  // CONTRACT NOT FOUND
  // =========================================================

  if (!contract) {
    return (
      <main>
        <h1>Contract Not Found</h1>

        <Link
          to="/contracts"
          className="back-link"
        >
          ← Back to Contracts
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

      <h1>Edit Contract</h1>

      <p>Editing Contract ID: {contractId}</p>

      <Link
        to="/contracts"
        className="back-link"
      >
        ← Back to Contracts
      </Link>

      {/* =====================================================
          EDIT CONTRACT FORM
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
            SAVE BUTTON
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

export default EditContractPage;

