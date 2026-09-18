// EditCustomerPage.jsx
// This page will allow the user to edit an existing customer.

// Import useState so the Edit page can store
// the values of the customer being edited.
import { useState } from "react";

// Import useParams so we can read the customer ID from the URL.
// Import Link so the user can return to the Customers page.

import { useParams, Link, useNavigate } from "react-router-dom";

// Receive the shared customers list from App.jsx.
function EditCustomerPage({ customers, updateCustomer }) {
  // =========================================================
  // READ CUSTOMER ID FROM URL
  // =========================================================

  // Example:
  // /customers/1/edit
  //
  // customerId will contain "1".
  const { customerId } = useParams();

  // Allows us to return to Customers after saving.
  const navigate = useNavigate();

// =========================================================
// FIND THE SELECTED CUSTOMER
// =========================================================

// useParams gives us customerId as a string.
//
// json-server uses string IDs, including generated IDs.
// Therefore we compare both IDs as strings.
const customer = customers.find(
  (customer) => String(customer.id) === String(customerId),
);

  // =========================================================
  // EDIT FORM STATE
  // =========================================================

  // Start the form with the existing values
  // from the selected customer.
  const [formData, setFormData] = useState({
    companyName: customer?.companyName || "",
    contactPerson: customer?.contactPerson || "",
    email: customer?.email || "",
    phone: customer?.phone || "",
  });

  // =========================================================
  // HANDLE FORM INPUT CHANGES
  // =========================================================

  // This function runs whenever the user changes a form field.
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousFormData) => ({
      ...previousFormData,
      [name]: value,
    }));
  };

  // =========================================================
// HANDLE FORM SUBMISSION
// =========================================================

// This function runs when the user clicks Save Changes.
//
// It is async because we need to wait for the API
// to finish updating the customer before navigating away.
const handleSubmit = async (event) => {
  // Prevent the browser from refreshing.
  event.preventDefault();

  // Create the updated customer object.
  const updatedCustomer = {
    // Keep the json-server customer ID as a string.
    // Do NOT use Number(customerId), because json-server
    // can generate IDs containing letters.
    id: customerId,

    companyName: formData.companyName,
    contactPerson: formData.contactPerson,
    email: formData.email,
    phone: formData.phone,
  };

  // Send the updated customer to App.jsx
  // and wait for the API request to finish.
  await updateCustomer(updatedCustomer);

  // Return to the Customers page only
  // after the update has completed.
  navigate("/customers");
};

  // If the customer does not exist,
  // display a simple message.
  if (!customer) {
    return (
      <main>
        <h1>Customer Not Found</h1>

        <Link to="/customers" className="back-link">
          ← Back to Customers
        </Link>
      </main>
    );
  }

  return (
    <main>
      {/* =====================================================
          PAGE HEADER
          ===================================================== */}

      <h1>Edit Customer</h1>

      <p>Editing Customer ID: {customerId}</p>

      <Link to="/customers" className="back-link">
        ← Back to Customers
      </Link>

      {/* =====================================================
    EDIT CUSTOMER FORM
    ===================================================== */}

      <form className="contract-form" onSubmit={handleSubmit}>
        {/* Company Name */}
        <div className="form-group">
          <label htmlFor="companyName">Company Name</label>

          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
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
          />
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
export default EditCustomerPage;
