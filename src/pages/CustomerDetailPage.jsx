// CustomerDetailPage.jsx
// This page displays the details of one selected customer.

// Import useParams so we can read the customer ID from the URL.
// Import Link so we can return to the Customers page.
import { useParams, Link } from "react-router-dom";

// Receive both customers and contracts from App.jsx.
function CustomerDetailPage({ customers, contracts }) {
  // =========================================================
  // READ CUSTOMER ID FROM URL
  // =========================================================

  // Example:
  // /customers/1
  //
  // customerId will contain "1".
  const { customerId } = useParams();

  // =========================================================
  // FIND THE SELECTED CUSTOMER
  // =========================================================

  // useParams gives us customerId as a string,
  // so Number() converts it into a number.
  const customer = customers.find(
    (customer) => customer.id === Number(customerId),
  );

  // =========================================================
  // FIND THIS CUSTOMER'S CONTRACTS
  // =========================================================

  // A customer can have more than one contract,
  // so we use .filter() instead of .find().
  //
  // Keep every contract whose customerId
  // matches the selected customer's ID.
  const customerContracts = contracts.filter(
    (contract) => contract.customerId === Number(customerId),
  );

  // If no matching customer exists, display a message.
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

      <h1>Customer Details</h1>

      <Link to="/customers" className="back-link">
        ← Back to Customers
      </Link>

      {/* =====================================================
          CUSTOMER INFORMATION
          ===================================================== */}

      <div className="customer-card">
        <h2>{customer.companyName}</h2>

        <div className="customer-details">
          <p>
            <strong>Contact Person:</strong> {customer.contactPerson}
          </p>

          <p>
            <strong>Email:</strong> {customer.email}
          </p>

          <p>
            <strong>Phone:</strong> {customer.phone}
          </p>
        </div>
      </div>

      {/* =====================================================
    CUSTOMER CONTRACTS
    ===================================================== */}

      <section className="customer-contracts">
        <h2>Contracts</h2>

        {/* If this customer has no contracts,
      display a helpful message. */}
        {customerContracts.length === 0 ? (
          <p>No contracts found for this customer.</p>
        ) : (
          <div className="contracts-list">
            {/* Display every contract belonging to this customer. */}
            {customerContracts.map((contract) => (
              <div className="contract-card" key={contract.id}>
                <h3>{contract.contractName}</h3>

                <p>
                  <strong>Start:</strong> {contract.startDate}
                </p>

                <p>
                  <strong>Expiry:</strong> {contract.expiryDate}
                </p>

                <p>
                  <strong>Value:</strong> ${contract.value.toLocaleString()}
                </p>

                <p>
                  <strong>Status:</strong> {contract.status}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

// Export the page so React Router can display it.
export default CustomerDetailPage;
