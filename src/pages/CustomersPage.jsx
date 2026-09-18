// CustomersPage.jsx
// This page displays all customers stored in RenewTrack.

// =========================================================
// IMPORTS
// =========================================================

// useState allows this page to remember
// what the user types into the search box.
import { useState } from "react";

// Link lets the user navigate between pages
// without refreshing the browser.
import { Link } from "react-router-dom";

// =========================================================
// CUSTOMERS PAGE COMPONENT
// =========================================================

// Receive:
// - customers: customer records from App.jsx
// - contracts: contract records from App.jsx
// - deleteCustomer: function used to delete a customer
// - loading: tells us whether customers are loading
// - error: contains an API error message
function CustomersPage({
  customers,
  contracts,
  deleteCustomer,
  loading,
  error,
}) {
  // =========================================================
  // SEARCH STATE
  // =========================================================

  // Store what the user types into the customer search box.
  const [searchTerm, setSearchTerm] = useState("");

  // =========================================================
  // LOADING STATE
  // =========================================================

  // While App.jsx is fetching customers from the API,
  // display a loading message.
  if (loading) {
    return (
      <main>
        <h1>Customers</h1>

        <p>Loading customers...</p>
      </main>
    );
  }

  // =========================================================
  // ERROR STATE
  // =========================================================

  // If the API request failed,
  // display the friendly error message from App.jsx.
  if (error) {
    return (
      <main>
        <h1>Customers</h1>

        <p>{error}</p>
      </main>
    );
  }

  // =========================================================
  // FILTER CUSTOMERS
  // =========================================================

  // Convert the search text to lowercase
  // so the search is case-insensitive.
  const search = searchTerm.toLowerCase();

  // Keep only customers that match the search.
  const filteredCustomers = customers.filter((customer) => {
    // Search by company name.
    const matchesCompany = customer.companyName
      .toLowerCase()
      .includes(search);

    // Search by contact person.
    const matchesContact = customer.contactPerson
      .toLowerCase()
      .includes(search);

    // Search by email.
    const matchesEmail = customer.email
      .toLowerCase()
      .includes(search);

    // Search by phone number.
    const matchesPhone = customer.phone
      .toLowerCase()
      .includes(search);

    // Customer is included if any field matches.
    return (
      matchesCompany ||
      matchesContact ||
      matchesEmail ||
      matchesPhone
    );
  });

  // =========================================================
  // DISPLAY PAGE
  // =========================================================

  return (
    <main>
      {/* =====================================================
          PAGE HEADER
          ===================================================== */}

      <h1>Customers</h1>

      <p>Manage and view your customer records.</p>

      {/* =====================================================
          ADD CUSTOMER
          ===================================================== */}

      <Link
        to="/customers/new"
        className="add-contract-button"
      >
        + Add Customer
      </Link>

      {/* =====================================================
          CUSTOMER SEARCH
          ===================================================== */}

      <div className="form-group customer-search">
        <label htmlFor="customerSearch">
          Search Customers
        </label>

        <input
          type="text"
          id="customerSearch"
          value={searchTerm}
          onChange={(event) =>
            setSearchTerm(event.target.value)
          }
          placeholder="Search by company, contact, email or phone"
        />
      </div>

      {/* =====================================================
          RESULT COUNT
          ===================================================== */}

      <p>
        Showing {filteredCustomers.length} of{" "}
        {customers.length} customers
      </p>

      {/* =====================================================
          CUSTOMER TABLE
          ===================================================== */}

      <div className="customer-table-container">
        <table className="customer-table">
          {/* =================================================
              TABLE HEADER
              ================================================= */}

          <thead>
            <tr>
              <th>Company</th>
              <th>Contact Person</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>

          {/* =================================================
              TABLE BODY
              ================================================= */}

          <tbody>
            {filteredCustomers.map((customer) => {
              // ===============================================
              // CHECK WHETHER CUSTOMER HAS CONTRACTS
              // ===============================================

              // A customer cannot be deleted when
              // at least one contract belongs to them.
              //
              // Compare IDs as strings because json-server
              // can generate IDs containing letters.
              const hasContracts = contracts.some(
                (contract) =>
                  String(contract.customerId) ===
                  String(customer.id),
              );

              return (
                <tr key={customer.id}>
                  {/* Company Name */}
                  <td>
                    <strong>
                      {customer.companyName}
                    </strong>
                  </td>

                  {/* Contact Person */}
                  <td>{customer.contactPerson}</td>

                  {/* Email */}
                  <td>{customer.email}</td>

                  {/* Phone */}
                  <td>{customer.phone}</td>

                  {/* ===========================================
                      CUSTOMER ACTIONS
                      =========================================== */}

                  <td>
                    <div className="contract-actions">
                      {/* View Customer */}
                      <Link
                        to={`/customers/${customer.id}`}
                        className="contract-action-link"
                      >
                        View
                      </Link>

                      {/* Edit Customer */}
                      <Link
                        to={`/customers/${customer.id}/edit`}
                        className="contract-action-link"
                      >
                        Edit
                      </Link>

                      {/* Delete Customer */}
                      <button
                        type="button"
                        onClick={() =>
                          deleteCustomer(customer.id)
                        }
                        disabled={hasContracts}
                        title={
                          hasContracts
                            ? "Customer cannot be deleted because contracts exist."
                            : "Delete customer"
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* ===================================================
            EMPTY / NO SEARCH RESULTS
            =================================================== */}

        {customers.length === 0 ? (
          <p>
            No customers found. Add your first customer.
          </p>
        ) : filteredCustomers.length === 0 ? (
          <p>No customers match your search.</p>
        ) : null}
      </div>
    </main>
  );
}

// =========================================================
// EXPORT
// =========================================================

// Export the component so React Router
// can display the Customers page.
export default CustomersPage;