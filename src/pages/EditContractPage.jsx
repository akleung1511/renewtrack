// EditContractPage.jsx
// This page will allow the user to edit an existing contract.

// Import useState so the Edit page can store
// the values of the contract being edited.
import { useState } from "react";

// Import useParams so we can read the contract ID from the URL.
// Import Link so the user can return to the Contracts page.
import { useParams, Link, useNavigate } from "react-router-dom";

// Receive the shared contracts list from App.jsx.
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
  // /contracts/1/edit
  //
  // contractId will contain "1".
  const { contractId } = useParams();

  // Allows us to navigate back to Contracts after saving.
  const navigate = useNavigate();

  // =========================================================
  // FIND THE CONTRACT TO EDIT
  // =========================================================

  // Find the selected contract from our shared contracts list.
  //
  // useParams gives us contractId as a string,
  // so Number() converts it into a number.
  const contract = contracts.find(
    (contract) => contract.id === Number(contractId),
  );

  // =========================================================
  // EDIT FORM STATE
  // =========================================================

  // Start the form with the existing values
  // from the selected contract.
  const [formData, setFormData] = useState({
  // Store the ID of the customer connected to this contract.
  customerId: contract?.customerId || "",

  // Keep the customer name for display purposes.
  customer: contract?.customer || "",

  contractName: contract?.contractName || "",
  startDate: contract?.startDate || "",
  expiryDate: contract?.expiryDate || "",
  value: contract?.value || "",
  status: contract?.status || "Active",
});

  // =========================================================
  // HANDLE FORM INPUT CHANGES
  // =========================================================

  // This function runs whenever the user changes a form field.
  //
  // event.target.name tells us WHICH field changed.
  // event.target.value tells us WHAT the new value is.
  const handleChange = (event) => {
    const { name, value } = event.target;

    // Update only the field that changed.
    setFormData((previousFormData) => ({
      ...previousFormData,
      [name]: value,
    }));
  };

  /// =========================================================
// HANDLE FORM SUBMISSION
// =========================================================

// This function runs when the user clicks Save Changes.
const handleSubmit = (event) => {
  // Prevent the browser from refreshing.
  event.preventDefault();

  // =========================================================
  // FIND THE SELECTED CUSTOMER
  // =========================================================

  // Find the customer that matches the customerId
  // selected in the dropdown.
  //
  // The value from a <select> is a string,
  // so Number() converts it into a number.
  const selectedCustomer = customers.find(
    (customer) => customer.id === Number(formData.customerId),
  );

  // =========================================================
  // CREATE THE UPDATED CONTRACT
  // =========================================================

  const updatedContract = {
    // Keep the existing contract ID.
    id: Number(contractId),

    // Store the selected customer's ID.
    // This maintains the relationship between
    // the contract and the customer.
    customerId: Number(formData.customerId),

    // Store the selected customer's company name
    // for display in the Contracts page.
    customer: selectedCustomer.companyName,

    // Store the rest of the edited form values.
    contractName: formData.contractName,
    startDate: formData.startDate,
    expiryDate: formData.expiryDate,

    // Form inputs return strings,
    // so convert the value into a number.
    value: Number(formData.value),

    status: formData.status,
  };

  // Send the updated contract to App.jsx.
  updateContract(updatedContract);

  // Return to the Contracts page.
  navigate("/contracts");
};


  return (
    <main>
      {/* =====================================================
          PAGE HEADER
          ===================================================== */}

      <h1>Edit Contract</h1>

      <p>Editing Contract ID: {contractId}</p>

      {/* Return to the Contracts page. */}
      <Link to="/contracts" className="back-link">
        ← Back to Contracts
      </Link>

      {/* =====================================================
          EDIT CONTRACT FORM
          ===================================================== */}

      <form className="contract-form" onSubmit={handleSubmit}>
        {/* Customer */}
        {/* =====================================================
    CUSTOMER SELECTION
    ===================================================== */}

<div className="form-group">
  <label htmlFor="customerId">Customer</label>

  {/* Select an existing customer instead of
      manually typing the company name. */}
  <select
    id="customerId"
    name="customerId"
    value={formData.customerId}
    onChange={handleChange}
    required
  >
    <option value="">Select a customer</option>

    {/* Create one option for every existing customer. */}
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

        {/* Contract Name */}
        <div className="form-group">
          <label htmlFor="contractName">Contract Name</label>

          <input
            type="text"
            id="contractName"
            name="contractName"
            value={formData.contractName}
            onChange={handleChange}
          />
        </div>

        {/* Start Date */}
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

        {/* Expiry Date */}
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

        {/* Contract Value */}
        <div className="form-group">
          <label htmlFor="value">Contract Value (SGD)</label>

          <input
            type="number"
            id="value"
            name="value"
            value={formData.value}
            onChange={handleChange}
            min="0"
          />
        </div>

        {/* Status */}
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
          Save Changes
        </button>
      </form>
    </main>
  );
}

// Export the page so React Router can display it.
export default EditContractPage;
