// CustomersPage.jsx
// This page displays all customers stored in RenewTrack.

// =========================================================
// IMPORTS
// =========================================================

// Import Link so we can navigate between pages
// without refreshing the browser.
import { Link } from "react-router-dom";

// =========================================================
// CUSTOMERS PAGE COMPONENT
// =========================================================

// Receive:
// - customers: the list of customers from App.jsx
// - contracts: the list of contracts from App.jsx
// - deleteCustomer: function used to delete a customer
//
// We need contracts because a customer can only
// be deleted when they have NO contracts.
function CustomersPage({
  customers,
  contracts,
  deleteCustomer,
}) {
  return (
    <main>
      {/* =====================================================
          PAGE HEADER
          ===================================================== */}

      <h1>Customers</h1>

      <p>Manage and view your customer records.</p>

      {/* =====================================================
          ADD CUSTOMER ACTION
          ===================================================== */}

      {/* Navigate to the page for creating a new customer. */}
      <Link
        to="/customers/new"
        className="add-contract-button"
      >
        + Add Customer
      </Link>

      {/* =====================================================
          CUSTOMER LIST
          ===================================================== */}

      <div className="customers-list">
        {/* 
          .map() goes through every customer
          inside the customers array.

          For each customer, React creates
          one customer card.
        */}
        {customers.map((customer) => (
          <div
            className="customer-card"
            key={customer.id}
          >
            {/* =================================================
                CUSTOMER INFORMATION
                ================================================= */}

            {/* Company name */}
            <h2>{customer.companyName}</h2>

            <div className="customer-details">
              <p>
                <strong>Contact Person:</strong>{" "}
                {customer.contactPerson}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {customer.email}
              </p>

              <p>
                <strong>Phone:</strong>{" "}
                {customer.phone}
              </p>
            </div>

            {/* =================================================
                CUSTOMER ACTIONS
                ================================================= */}

            <div className="contract-actions">
              {/* -----------------------------------------------
                  VIEW CUSTOMER
                  ----------------------------------------------- */}

              {/* Open the details page for this customer. */}
              <Link
                to={`/customers/${customer.id}`}
                className="contract-action-link"
              >
                View
              </Link>

              {/* -----------------------------------------------
                  EDIT CUSTOMER
                  ----------------------------------------------- */}

              {/* Open the Edit page for this customer. */}
              <Link
                to={`/customers/${customer.id}/edit`}
                className="contract-action-link"
              >
                Edit
              </Link>

              {/* -----------------------------------------------
                  DELETE CUSTOMER
                  ----------------------------------------------- */}

              {/* 
                BUSINESS RULE:

                A customer can only be deleted when
                they have NO contracts.

                contracts.some(...) checks whether at
                least one contract belongs to this customer.

                If it finds one:
                true → Delete is disabled

                If it finds none:
                false → Delete is allowed
              */}
              <button
                type="button"
                onClick={() => deleteCustomer(customer.id)}
                disabled={contracts.some(
                  (contract) =>
                    contract.customerId === customer.id,
                )}
                title={
                  contracts.some(
                    (contract) =>
                      contract.customerId === customer.id,
                  )
                    ? "Customer cannot be deleted because contracts exist."
                    : "Delete customer"
                }
              >
                Delete
              </button>
            </div>
          </div>
        ))}
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