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
function NewContractPage({ addContract, customers }) {
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
    customerId: "",
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

  // =========================================================
  // FIND THE SELECTED CUSTOMER
  // =========================================================

  // Find the full customer record that matches
  // the customer selected in the dropdown.
  //
  // The value from a <select> is a string,
  // so Number() converts it into a number.
  const selectedCustomer = customers.find(
    (customer) => customer.id === Number(formData.customerId),
  );

  // =========================================================
  // CREATE THE NEW CONTRACT
  // =========================================================

  // Create a new contract object using the form values.
  const newContract = {
    // Store the customer's ID.
    // This creates the relationship between
    // the customer and this contract.
    customerId: Number(formData.customerId),

    // Store the customer's company name
    // so we can easily display it in the Contracts page.
    customer: selectedCustomer.companyName,

    contractName: formData.contractName,
    startDate: formData.startDate,
    expiryDate: formData.expiryDate,

    // Form inputs return strings.
    // Convert the contract value into a number.
    value: Number(formData.value),

    status: formData.status,
  };

  // =========================================================
  // ADD THE CONTRACT
  // =========================================================

  // Send the new contract to App.jsx.
  // App.jsx will add it to the shared contracts state.
  addContract(newContract);

  // Return to the Contracts page after adding.
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

      <form className="contract-form" onSubmit={handleSubmit}>
        {/* Customer / company name */}

        {/* =====================================================
    CUSTOMER SELECTION
    ===================================================== */}

        <div className="form-group">
          <label htmlFor="customerId">Customer</label>

          {/* Instead of manually typing a company name,
      select an existing customer from our customer list. */}
          <select
            id="customerId"
            name="customerId"
            value={formData.customerId}
            onChange={handleChange}
            required
          >
            {/* Default option */}
            <option value="">Select a customer</option>

            {/* Create one option for every customer
        stored in the customers array. */}
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.companyName}
              </option>
            ))}
          </select>
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

        <button type="submit" className="submit-button">
          Add Contract
        </button>
      </form>

      {/* The contract form will be added in the next step. */}
    </main>
  );
}

// Export the page so React Router can display it.
export default NewContractPage;
