// ReportsPage.jsx
// This page provides a summary report of RenewTrack contracts.

// =========================================================
// IMPORTS
// =========================================================

// Import the reusable StatusBadge component.
import StatusBadge from "../components/StatusBadge.jsx";

// =========================================================
// REPORTS PAGE COMPONENT
// =========================================================

// Receive the real contracts array from App.jsx.
function ReportsPage({ contracts }) {
  // =========================================================
  // CALCULATE REPORT STATISTICS
  // =========================================================

  // Total number of contracts.
  const totalContracts = contracts.length;

  // Count Active contracts.
  const activeContracts = contracts.filter(
    (contract) => contract.status === "Active",
  ).length;

  // Count Expiring Soon contracts.
  const expiringSoonContracts = contracts.filter(
    (contract) => contract.status === "Expiring Soon",
  ).length;

  // Count Expired contracts.
  const expiredContracts = contracts.filter(
    (contract) => contract.status === "Expired",
  ).length;

  // =========================================================
  // TOTAL CONTRACT VALUE
  // =========================================================

  // reduce() goes through every contract and adds
  // its value to the running total.
  const totalContractValue = contracts.reduce(
    (total, contract) =>
      total + Number(contract.value || 0),
    0,
  );

  // =========================================================
  // ACTIVE CONTRACT VALUE
  // =========================================================

  // First keep only Active contracts,
  // then add their values together.
  const activeContractValue = contracts
    .filter(
      (contract) => contract.status === "Active",
    )
    .reduce(
      (total, contract) =>
        total + Number(contract.value || 0),
      0,
    );

  // =========================================================
  // FORMAT CURRENCY
  // =========================================================

  // Intl.NumberFormat formats numbers as
  // Singapore Dollar currency.
  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-SG", {
      style: "currency",
      currency: "SGD",
      maximumFractionDigits: 0,
    }).format(value);

  // =========================================================
  // SORT CONTRACTS
  // =========================================================

  // Create a copy of the contracts array before sorting.
  //
  // We do not want sort() to directly modify
  // the React state array received from App.jsx.
  const contractsByExpiry = [...contracts].sort(
    (a, b) =>
      new Date(a.expiryDate) -
      new Date(b.expiryDate),
  );

  // =========================================================
  // DISPLAY PAGE
  // =========================================================

  return (
    <main>
      {/* =====================================================
          PAGE HEADER
          ===================================================== */}

      <h1>Reports</h1>

      <p>
        Contract portfolio summary and renewal report.
      </p>

      {/* =====================================================
          REPORT SUMMARY
          ===================================================== */}

      <div className="stats-grid">
        {/* Total contracts */}
        <div className="stat-card">
          <p>Total Contracts</p>

          <h2>{totalContracts}</h2>
        </div>

        {/* Active contracts */}
        <div className="stat-card">
          <p>Active Contracts</p>

          <h2>{activeContracts}</h2>
        </div>

        {/* Expiring soon */}
        <div className="stat-card">
          <p>Expiring Soon</p>

          <h2>{expiringSoonContracts}</h2>
        </div>

        {/* Expired contracts */}
        <div className="stat-card">
          <p>Expired</p>

          <h2>{expiredContracts}</h2>
        </div>

        {/* Total contract value */}
        <div className="stat-card">
          <p>Total Contract Value</p>

          <h2>
            {formatCurrency(totalContractValue)}
          </h2>
        </div>

        {/* Active contract value */}
        <div className="stat-card">
          <p>Active Contract Value</p>

          <h2>
            {formatCurrency(activeContractValue)}
          </h2>
        </div>
      </div>

      {/* =====================================================
          CONTRACT REPORT TABLE
          ===================================================== */}

      <section className="renewals-section">
        <h2>Contract Report</h2>

        <table className="renewals-table">
          {/* =================================================
              TABLE HEADER
              ================================================= */}

          <thead>
            <tr>
              <th>Customer</th>

              <th>Contract</th>

              <th>Start Date</th>

              <th>Expiry Date</th>

              <th>Value</th>

              <th>Status</th>
            </tr>
          </thead>

          {/* =================================================
              TABLE BODY
              ================================================= */}

          <tbody>
            {contractsByExpiry.map((contract) => (
              <tr key={contract.id}>
                {/* Customer */}
                <td>
                  {contract.customer}
                </td>

                {/* Contract name */}
                <td>
                  {contract.contractName}
                </td>

                {/* Start date */}
                <td>
                  {contract.startDate}
                </td>

                {/* Expiry date */}
                <td>
                  {contract.expiryDate}
                </td>

                {/* Contract value */}
                <td>
                  {formatCurrency(
                    Number(contract.value || 0),
                  )}
                </td>

                {/* Contract status */}
                <td>
                  <StatusBadge
                    status={contract.status}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* ===================================================
            NO CONTRACTS
            =================================================== */}

        {contracts.length === 0 && (
          <p>
            No contract data is available for this report.
          </p>
        )}
      </section>
    </main>
  );
}

// =========================================================
// EXPORT
// =========================================================

export default ReportsPage;