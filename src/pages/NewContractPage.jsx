// NewContractPage.jsx
// This page will allow the user to create a new contract.

// Import useState so this page can remember
// the values entered into the form.
import { useState } from "react";

// Link allows normal navigation.
// useNavigate allows us to navigate using JavaScript
// after an action such as submitting a form.
import { Link, useNavigate } from "react-router-dom";
// Receive the addContract function from App.jsx through props.
function NewContractPage({ addContract }) {

    // =========================================================
  // NAVIGATION
  // =========================================================

  // useNavigate gives us a function that can
  // change the current route using JavaScript.
  const navigate = useNavigate();
  
  // =========================================================
  // FORM STATE
  // =========================================================

  // Store all values entered into the Add Contract form.
  const [formData, setFormData] = useState({
    customer: "",
    contractName: "",
    startDate: "",
    expiryDate: "",
    value: "",
    status: "Active",
  });

  // =========================================================
  // HANDLE FORM INPUT CHANGES
  // =========================================================

  // This function runs whenever the user changes a form field.
  //
  // event.target.name tells us WHICH input changed.
  // event.target.value tells us WHAT the user entered.
  const handleChange = (event) => {
    // Get the name and value from the input that changed.
    const { name, value } = event.target;

    // Update only the field that changed,
    // while keeping all the other form values.
    setFormData((previousFormData) => ({
      ...previousFormData,
      [name]: value,
    }));
  };

  // =========================================================
  // HANDLE FORM SUBMISSION
  // =========================================================

  // This function runs when the user submits the form.
  const handleSubmit = (event) => {
    // Prevent the browser from refreshing the page.
    event.preventDefault();

    // Create a new contract object using the form values.
    const newContract = {
      customer: formData.customer,
      contractName: formData.contractName,
      startDate: formData.startDate,
      expiryDate: formData.expiryDate,

      // Form inputs return strings.
      // Convert the contract value into a number.
      value: Number(formData.value),

      status: formData.status,
    };

// Send the new contract to App.jsx.
// App.jsx will add it to the shared contracts state.
addContract(newContract);

// After successfully adding the contract,
// navigate back to the Contracts page.
navigate("/contracts");

  };

  // Display

  return (
    <main>
      {/* =====================================================
          PAGE HEADER
          ===================================================== */}

      <h1>Add Contract</h1>

      <p>Create a new customer contract in RenewTrack.</p>

      {/* Link back to the Contracts page. */}
      <Link to="/contracts" className="back-link">
        ← Back to Contracts
      </Link>

      {/* =====================================================
          ADD CONTRACT FORM
          ===================================================== */}

      <form
        className="contract-form"
        onSubmit={handleSubmit}
      >
        {/* Customer / company name */}
        <div className="form-group">
          <label htmlFor="customer">Customer</label>

          <input
            type="text"
            id="customer"
            name="customer"
            // The input displays the customer value
            // stored inside formData.
            value={formData.customer}
            // Use our reusable handleChange function.
            onChange={handleChange}
            placeholder="e.g. ABC Pte Ltd"
          />
        </div>
        {/* Contract name */}
        <div className="form-group">
          <label htmlFor="contractName">Contract Name</label>

          <input
            type="text"
            id="contractName"
            name="contractName"
            value={formData.contractName}
            onChange={handleChange}
            placeholder="e.g. IT Maintenance Contract"
          />
        </div>

        {/* Contract start date */}
        <div className="form-group">
          <label htmlFor="startDate">Start Date</label>

          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
          />
        </div>

        {/* Contract expiry date */}
        <div className="form-group">
          <label htmlFor="expiryDate">Expiry Date</label>

          <input
            type="date"
            id="expiryDate"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
          />
        </div>

        {/* Contract value */}
        <div className="form-group">
          <label htmlFor="value">Contract Value (SGD)</label>

          <input
            type="number"
            id="value"
            name="value"
            value={formData.value}
            onChange={handleChange}
            placeholder="e.g. 24000"
            min="0"
          />
        </div>

        {/* Contract status */}
        <div className="form-group">
          <label htmlFor="status">Status</label>

          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Active">Active</option>
            <option value="Expiring Soon">Expiring Soon</option>
            <option value="Expired">Expired</option>
          </select>
        </div>

        {/* =====================================================
    FORM ACTION
    ===================================================== */}

        <button
          type="submit"
          className="submit-button"
        >
          Add Contract
        </button>



      </form>

      {/* The contract form will be added in the next step. */}
    </main>
  );
}

// Export the page so React Router can display it.
export default NewContractPage;
