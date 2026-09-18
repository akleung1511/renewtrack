// DashboardPage.jsx
// This component represents the main Dashboard page of RenewTrack.

// =========================================================
// IMPORTS
// =========================================================

// Import our reusable StatCard component.
import StatCard from "../components/StatCard.jsx";

// Import the reusable StatusBadge component.
import StatusBadge from "../components/StatusBadge.jsx";

// Import our reusable date calculation function.
import { calculateDaysRemaining } from "../utils/dateUtils.js";

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
  // TOTAL CONTRACT VALUE
  // =========================================================

  // Add together the value of every contract.
  //
  // reduce() starts at 0 and adds each contract value
  // to the running total.
  const totalContractValue = contracts.reduce(
    (total, contract) =>
      total + Number(contract.value || 0),
    0,
  );

  // =========================================================
  // UPCOMING RENEWALS
  // =========================================================

  // Build the Upcoming Renewals list from the real
  // contracts array.
  //
  // We use the actual expiry date rather than relying
  // only on the manually selected contract status.
  //
  // Step 1:
  // Keep contracts that have not expired.
  //
  // Step 2:
  // Create a new array before sorting because sort()
  // changes the array it is used on.
  //
  // Step 3:
  // Sort contracts so the nearest expiry appears first.
  //
  // Step 4:
  // Show only the first 5 upcoming renewals.
  const upcomingRenewals = contracts
    .filter(
      (contract) =>
        calculateDaysRemaining(contract.expiryDate) >= 0,
    )
    .slice()
    .sort(
      (a, b) =>
        new Date(a.expiryDate) -
        new Date(b.expiryDate),
    )
    .slice(0, 5);

  // =========================================================
  // DISPLAY PAGE
  // =========================================================

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
        {/* Total number of customers */}
        <StatCard
          title="Total Customers"
          value={totalCustomers}
        />

        {/* Total number of contracts */}
        <StatCard
          title="Total Contracts"
          value={totalContracts}
        />

        {/* Active contracts */}
        <StatCard
          title="Active Contracts"
          value={activeContracts}
        />

        {/* Contracts marked Expiring Soon */}
        <StatCard
          title="Expiring Soon"
          value={expiringSoonContracts}
        />

        {/* Expired contracts */}
        <StatCard
          title="Expired"
          value={expiredContracts}
        />

        {/* Total value of all contracts */}
        <StatCard
          title="Total Contract Value"
          value={`$${totalContractValue.toLocaleString()}`}
        />
      </div>

      {/* =====================================================
          UPCOMING RENEWALS
          ===================================================== */}

      <section className="renewals-section">
        <h2>Upcoming Renewals</h2>

        {/* ===================================================
            EMPTY STATE
            =================================================== */}

        {upcomingRenewals.length === 0 ? (
          <p>No upcoming renewals found.</p>
        ) : (
          <table className="renewals-table">
            {/* ===============================================
                TABLE HEADER
                =============================================== */}

            <thead>
              <tr>
                <th>Customer</th>
                <th>Contract</th>
                <th>Expiry Date</th>
                <th>Days Remaining</th>
                <th>Status</th>
              </tr>
            </thead>

            {/* ===============================================
                TABLE BODY
                =============================================== */}

            <tbody>
              {upcomingRenewals.map((contract) => {
                // Calculate the number of days until
                // this individual contract expires.
                const daysRemaining =
                  calculateDaysRemaining(
                    contract.expiryDate,
                  );

                return (
                  <tr key={contract.id}>
                    {/* Customer / Company */}
                    <td>{contract.customer}</td>

                    {/* Contract Name */}
                    <td>{contract.contractName}</td>

                    {/* Expiry Date */}
                    <td>{contract.expiryDate}</td>

                    {/* Days Remaining */}
                    <td>{daysRemaining} days</td>

                    {/* Contract Status */}
                    <td>
                      <StatusBadge
                        status={contract.status}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </section>
    </main>
  );
}

// =========================================================
// EXPORT
// =========================================================

// Export DashboardPage so React Router can display it.
export default DashboardPage;