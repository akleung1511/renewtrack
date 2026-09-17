// DashboardPage.jsx
// This component represents the main Dashboard page of RenewTrack.

// Import our reusable StatCard component.
import StatCard from "../components/StatCard.jsx";

// Import the reusable StatusBadge component.
import StatusBadge from "../components/StatusBadge.jsx";

function DashboardPage() {
  // =========================================================
  // SAMPLE CONTRACT DATA
  // =========================================================
  // For now, this data is stored directly inside this component.
  //
  // Later, we will replace this sample data with contract data
  // fetched from our API.

  const upcomingRenewals = [
    {
      id: 1,
      customer: "ABC Pte Ltd",
      contractName: "IT Maintenance Contract",
      expiryDate: "31 Dec 2026",
      status: "Active",
    },
    {
      id: 2,
      customer: "XYZ Engineering",
      contractName: "Software Support Contract",
      expiryDate: "15 Jan 2027",
      status: "Expiring Soon",
    },
    {
      id: 3,
      customer: "DEF Solutions",
      contractName: "Equipment Maintenance Contract",
      expiryDate: "28 Feb 2027",
      status: "Active",
    },
  ];

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
        {/* These numbers are temporary sample values.
            Later they will be calculated from API data. */}

        <StatCard title="Total Contracts" value={18} />

        <StatCard title="Active Contracts" value={12} />

        <StatCard title="Expiring Soon" value={4} />

        <StatCard title="Expired" value={2} />
      </div>

      {/* =====================================================
          UPCOMING RENEWALS
          ===================================================== */}

      <section className="renewals-section">
        {/* Section heading */}
        <h2>Upcoming Renewals</h2>

        {/* Table used to display upcoming contract renewals */}
        <table className="renewals-table">
          {/* Table headings */}
          <thead>
            <tr>
              <th>Customer</th>
              <th>Contract</th>
              <th>Expiry Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {/*
              .map() goes through every contract inside
              upcomingRenewals.

              For each contract, React creates one table row.
            */}
            {upcomingRenewals.map((contract) => (
              <tr key={contract.id}>
                {/* Display the customer name */}
                <td>{contract.customer}</td>

                {/* Display the contract name */}
                <td>{contract.contractName}</td>

                {/* Display the expiry date */}
                <td>{contract.expiryDate}</td>

                {/* Display the current status using our reusable StatusBadge component. */}
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

// Export DashboardPage so React Router can display it.
export default DashboardPage;
