// NewContractPage.jsx
// This page allows the user to create a new contract.

// =========================================================
// IMPORTS
// =========================================================

// Import useState so this page can store
// the values entered into the form.
import { useState } from "react";

// Link allows normal navigation.
// useNavigate allows us to navigate using JavaScript
// after successfully adding a contract.
import { Link, useNavigate } from "react-router-dom";

// =========================================================
// NEW CONTRACT PAGE
// =========================================================

// Receive:
// addContract -> function from App.jsx used to save a contract
// customers   -> customer list loaded from our API
function NewContractPage({ addContract, customers }) {
  // =========================================================
  // NAVIGATION
  // =========================================================

  // Allows us to navigate back to Contracts
  // after successfully creating a contract.
  const navigate = useNavigate();

  // =========================================================
  // FORM STATE
  // =========================================================

  // Store all values entered into the Add Contract form.
  const [formData, setFormData] = useState({
    customerId: "",
    contractName: "",
    startDate: "",
    expiryDate: "",
    value: "",
    status: "Active",
  });

  // =========================================================
  // HANDLE FORM INPUT CHANGES
  // =========================================================

  // This reusable function runs whenever
  // an input or select value changes.
  const handleChange = (event) => {
    // Get the name and value of the field that changed.
    const { name, value } = event.target;

    // Update only that field while keeping
    // all the other form values.
    setFormData((previousFormData) => ({
      ...previousFormData,
      [name]: value,
    }));
  };

  // =========================================================
  // HANDLE FORM SUBMISSION
  // =========================================================

  // This function runs when the user clicks Add Contract.
  //
  // It is async because addContract() now sends
  // a POST request to our json-server API.
  const handleSubmit = async (event) => {
    // Prevent the browser from refreshing.
    event.preventDefault();

    // =======================================================
    // FIND THE SELECTED CUSTOMER
    // =======================================================

    // <select> values are strings.
    //
    // json-server also uses string IDs and can generate
    // IDs containing letters.
    //
    // Therefore we compare both IDs as strings.
    const selectedCustomer = customers.find(
      (customer) =>
        String(customer.id) === String(formData.customerId),
    );

    // Safety check.
    // If no matching customer exists, stop here.
    if (!selectedCustomer) {
      console.error("Selected customer was not found.");
      return;
    }

    // =======================================================
    // CREATE THE NEW CONTRACT
    // =======================================================

    const newContract = {
      // Store the actual json-server customer ID.
      //
      // Do NOT use Number() because IDs may contain letters.
      customerId: formData.customerId,

      // Store the company name for easy display
      // on the Contracts page.
      customer: selectedCustomer.companyName,

      // Contract information.
      contractName: formData.contractName,
      startDate: formData.startDate,
      expiryDate: formData.expiryDate,

      // Number inputs still give us strings,
      // so convert the contract value into a number.
      value: Number(formData.value),

      status: formData.status,
    };

    // =======================================================
    // SAVE CONTRACT
    // =======================================================

    // Wait for App.jsx to POST the new contract
    // to json-server.
    await addContract(newContract);

    // Navigate back only after the API request finishes.
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

      <p>Create a new customer contract in RenewTrack.</p>

      <Link to="/contracts" className="back-link">
        ← Back to Contracts
      </Link>

      {/* =====================================================
          ADD CONTRACT FORM
          ===================================================== */}

      <form className="contract-form" onSubmit={handleSubmit}>
        {/* ===================================================
            CUSTOMER
            =================================================== */}

        <div className="form-group">
          <label htmlFor="customerId">Customer</label>

          {/* Select an existing customer from the API data. */}
          <select
            id="customerId"
            name="customerId"
            value={formData.customerId}
            onChange={handleChange}
            required
          >
            <option value="">Select a customer</option>

            {/* Create one option for every customer. */}
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
            placeholder="e.g. IT Maintenance Contract"
            required
          />
        </div>

        {/* ===================================================
            START DATE
            =================================================== */}

        <div className="form-group">
          <label htmlFor="startDate">Start Date</label>

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
          <label htmlFor="expiryDate">Expiry Date</label>

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
            placeholder="e.g. 24000"
            min="0"
            required
          />
        </div>

        {/* ===================================================
            STATUS
            =================================================== */}

        <div className="form-group">
          <label htmlFor="status">Status</label>

          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Active">Active</option>
            <option value="Expiring Soon">
              Expiring Soon
            </option>
            <option value="Expired">Expired</option>
          </select>
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

// Export the page so React Router can display it.
export default NewContractPage;
