// EditContractPage.jsx
// This page allows the user to edit an existing contract.

// =========================================================
// IMPORTS
// =========================================================

import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

// =========================================================
// EDIT CONTRACT PAGE
// =========================================================

// Receive contracts, customers, and updateContract from App.jsx.
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
  // useParams always gives us the ID as a string.
  const { contractId } = useParams();

  // Allows us to navigate after saving.
  const navigate = useNavigate();

  // =========================================================
  // FIND THE CONTRACT TO EDIT
  // =========================================================

  // json-server can generate IDs containing letters.
  //
  // Therefore we compare IDs as strings.
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
    value: contract?.value || "",
    status: contract?.status || "Active",
  });

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
  };

  // =========================================================
  // HANDLE FORM SUBMISSION
  // =========================================================

  // async allows us to wait for the API request
  // before returning to the Contracts page.
  const handleSubmit = async (event) => {
    // Prevent browser refresh.
    event.preventDefault();

    // =======================================================
    // FIND THE SELECTED CUSTOMER
    // =======================================================

    // Compare customer IDs as strings.
    //
    // Do NOT use Number() because json-server
    // IDs can contain letters.
    const selectedCustomer = customers.find(
      (customer) =>
        String(customer.id) ===
        String(formData.customerId),
    );

    // Safety check.
    if (!selectedCustomer) {
      console.error("Selected customer was not found.");
      return;
    }

    // =======================================================
    // CREATE UPDATED CONTRACT
    // =======================================================

    const updatedContract = {
      // Keep the existing json-server contract ID.
      id: contractId,

      // Keep the selected customer's json-server ID.
      customerId: formData.customerId,

      // Store the selected customer's company name
      // for display on the Contracts page.
      customer: selectedCustomer.companyName,

      contractName: formData.contractName,
      startDate: formData.startDate,
      expiryDate: formData.expiryDate,

      // Number inputs return strings,
      // so contract value should still be converted.
      value: Number(formData.value),

      status: formData.status,
    };

    // =======================================================
    // SAVE THROUGH API
    // =======================================================

    // updateContract() in App.jsx sends:
    //
    // PUT /contracts/:id
    //
    // Wait for the API request to finish.
    await updateContract(updatedContract);

    // Return to Contracts after saving.
    navigate("/contracts");
  };

  // =========================================================
  // CONTRACT NOT FOUND
  // =========================================================

  // If the URL contains an invalid contract ID,
  // display a useful message instead of an empty form.
  if (!contract) {
    return (
      <main>
        <h1>Contract Not Found</h1>

        <Link to="/contracts" className="back-link">
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

      <Link to="/contracts" className="back-link">
        ← Back to Contracts
      </Link>

      {/* =====================================================
          EDIT CONTRACT FORM
          ===================================================== */}

      <form
        className="contract-form"
        onSubmit={handleSubmit}
      >
        {/* ===================================================
            CUSTOMER
            =================================================== */}

        <div className="form-group">
          <label htmlFor="customerId">Customer</label>

          <select
            id="customerId"
            name="customerId"
            value={formData.customerId}
            onChange={handleChange}
            required
          >
            <option value="">Select a customer</option>

            {customers.map((customer) => (
              <option
                key={customer.id}
                value={customer.id}
              >
                {customer.companyName}
              </option>
            ))}
          </select>
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
            required
          />
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
            required
          />
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
            required
          />
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
            required
          />
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