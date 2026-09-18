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
  // FIND THE CUSTOMER TO EDIT
  // =========================================================

  // Find the selected customer from our shared customers list.
  //
  // useParams gives us customerId as a string,
  // so Number() converts it into a number.
  const customer = customers.find(
    (customer) => customer.id === Number(customerId),
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
  const handleSubmit = (event) => {
    // Prevent the browser from refreshing.
    event.preventDefault();

    // Create the updated customer.
    const updatedCustomer = {
      id: Number(customerId),
      companyName: formData.companyName,
      contactPerson: formData.contactPerson,
      email: formData.email,
      phone: formData.phone,
    };

    // Send the updated customer to App.jsx
    updateCustomer(updatedCustomer);

    // Return to the Customers page.
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
