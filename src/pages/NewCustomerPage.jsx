// NewCustomerPage.jsx
// This page will allow the user to create a new customer.

// Import useState so the page can remember
// the values entered into the customer form.
import { useState } from "react";

// Link provides navigation links.
// useNavigate lets us navigate after adding a customer.
import { Link, useNavigate } from "react-router-dom";

// Receive addCustomer from App.jsx through props.
function NewCustomerPage({ addCustomer }) {
  
  // =========================================================
// NAVIGATION
// =========================================================

// Used to return to Customers after adding a customer.
const navigate = useNavigate();
  // FORM STATE
  // =========================================================
  // formData stores all values entered
  // into the Add Customer form.
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
  });

  // =========================================================
  // HANDLE FORM INPUT CHANGES
  // =========================================================

  // This function runs whenever the user changes a form field.
  //
  // event.target.name tells us WHICH input changed.
  // event.target.value tells us WHAT the user entered.
  const handleChange = (event) => {
    const { name, value } = event.target;

    // Keep all existing form values,
    // but update the field that changed.
    setFormData((previousFormData) => ({
      ...previousFormData,
      [name]: value,
    }));
  };
// =========================================================
// HANDLE FORM SUBMISSION
// =========================================================

// This function runs when the user clicks Add Customer.
const handleSubmit = (event) => {
  // Prevent the browser from refreshing.
  event.preventDefault();

  // Create a new customer object using the form values.
  const newCustomer = {
    companyName: formData.companyName,
    contactPerson: formData.contactPerson,
    email: formData.email,
    phone: formData.phone,
  };

  // Send the new customer to App.jsx.
  addCustomer(newCustomer);

  // Return to the Customers page.
  navigate("/customers");
};

  return (
    <main>
      {/* =====================================================
          PAGE HEADER
          ===================================================== */}

      <h1>Add Customer</h1>

      <p>Create a new customer record in RenewTrack.</p>

      {/* Return to the Customers page. */}
      <Link to="/customers" className="back-link">
        ← Back to Customers
      </Link>

     {/* =====================================================
    ADD CUSTOMER FORM
    ===================================================== */}

<form
  className="contract-form"
  onSubmit={handleSubmit}
>

  {/* Company Name */}
  <div className="form-group">
    <label htmlFor="companyName">Company Name</label>

    <input
      type="text"
      id="companyName"
      name="companyName"
      value={formData.companyName}
      onChange={handleChange}
      placeholder="e.g. ABC Pte Ltd"
    />
  </div>

  {/* Contact Person */}
  <div className="form-group">
    <label htmlFor="contactPerson">Contact Person</label>

    <input
      type="text"
      id="contactPerson"
      name="contactPerson"
      value={formData.contactPerson}
      onChange={handleChange}
      placeholder="e.g. John Tan"
    />
  </div>

  {/* Email */}
  <div className="form-group">
    <label htmlFor="email">Email</label>

    <input
      type="email"
      id="email"
      name="email"
      value={formData.email}
      onChange={handleChange}
      placeholder="e.g. john@company.com"
    />
  </div>

  {/* Phone */}
  <div className="form-group">
    <label htmlFor="phone">Phone</label>

    <input
      type="tel"
      id="phone"
      name="phone"
      value={formData.phone}
      onChange={handleChange}
      placeholder="e.g. +65 6123 4567"
    />
  </div>

{/* =====================================================
    FORM ACTION
    ===================================================== */}

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

// Export the page so React Router can display it.
export default NewCustomerPage;
