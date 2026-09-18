// DashboardPage.jsx
// This component represents the main Dashboard page of RenewTrack.

// =========================================================
// IMPORTS
// =========================================================

// Import our reusable StatCard component.
import StatCard from "../components/StatCard.jsx";

// Import the reusable StatusBadge component.
import StatusBadge from "../components/StatusBadge.jsx";

// =========================================================
// DASHBOARD COMPONENT
// =========================================================

// Receive the real customers and contracts arrays
// from App.jsx through props.
function DashboardPage({ customers, contracts }) {
  // =========================================================
  // CALCULATE DASHBOARD STATISTICS
  // =========================================================

  // Total number of customers.
  const totalCustomers = customers.length;

  // Total number of contracts.
  const totalContracts = contracts.length;

  // Count contracts whose status is "Active".
  const activeContracts = contracts.filter(
    (contract) => contract.status === "Active",
  ).length;

  // Count contracts whose status is "Expiring Soon".
  const expiringSoonContracts = contracts.filter(
    (contract) => contract.status === "Expiring Soon",
  ).length;

  // Count contracts whose status is "Expired".
  const expiredContracts = contracts.filter(
    (contract) => contract.status === "Expired",
  ).length;

// =========================================================
// UPCOMING RENEWALS
// =========================================================

// Build the Upcoming Renewals list from the real
// contracts array.
//
// 1. filter() removes expired contracts.
// 2. spread [...] creates a new array.
// 3. sort() puts the nearest expiry date first.
//
// We create a new array before sorting because sort()
// changes the array it is used on. We do not want to
// directly modify our React state.
const upcomingRenewals = [...contracts]
  .filter((contract) => contract.status !== "Expired")
  .sort(
    (a, b) =>
      new Date(a.expiryDate) - new Date(b.expiryDate),
  );
  

  return (
    <main>
      {/* =====================================================
          PAGE HEADER
          ===================================================== */}

      <h1>Dashboard</h1>

      <p>Contract renewal overview</p>

      {/* =====================================================
          DASHBOARD STATISTICS
          ===================================================== */}

      <div className="stats-grid">
        {/* Display the real number of customers. */}
        <StatCard
          title="Total Customers"
          value={totalCustomers}
        />

        {/* Display the real number of contracts. */}
        <StatCard
          title="Total Contracts"
          value={totalContracts}
        />

        {/* Display contracts with Active status. */}
        <StatCard
          title="Active Contracts"
          value={activeContracts}
        />

        {/* Display contracts with Expiring Soon status. */}
        <StatCard
          title="Expiring Soon"
          value={expiringSoonContracts}
        />

        {/* Display contracts with Expired status. */}
        <StatCard
          title="Expired"
          value={expiredContracts}
        />
      </div>

      {/* =====================================================
          UPCOMING RENEWALS
          ===================================================== */}

      <section className="renewals-section">
        <h2>Upcoming Renewals</h2>

        <table className="renewals-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Contract</th>
              <th>Expiry Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {/* This still uses temporary data.
                We will replace it in Step 11C. */}
            {upcomingRenewals.map((contract) => (
              <tr key={contract.id}>
                <td>{contract.customer}</td>

                <td>{contract.contractName}</td>

                <td>{contract.expiryDate}</td>

                <td>
                  <StatusBadge status={contract.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}

// =========================================================
// EXPORT
// =========================================================

// Export DashboardPage so React Router can display it.
export default DashboardPage;