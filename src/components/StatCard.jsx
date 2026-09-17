// StatCard.jsx
// This reusable component displays one statistic on the Dashboard.
//
// Examples:
// Total Contracts: 18
// Active Contracts: 12
// Expiring Soon: 4
// Expired: 2

function StatCard({ title, value }) {
  return (
    // The className allows us to style this card later using CSS.
    <div className="stat-card">

      {/* Display the title passed to this component using props. */}
      <p className="stat-card-title">{title}</p>

      {/* Display the value passed to this component using props. */}
      <h2 className="stat-card-value">{value}</h2>

    </div>
  );
}

// Export StatCard so DashboardPage can use it.
export default StatCard;