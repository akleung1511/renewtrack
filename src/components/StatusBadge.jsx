// StatusBadge.jsx
// This reusable component displays a contract status.
//
// Examples:
// Active
// Expiring Soon
// Expired

function StatusBadge({ status }) {

  // Convert the status into a CSS-friendly class name.
  //
  // Example:
  // "Active"        -> "active"
  // "Expiring Soon" -> "expiring-soon"
  // "Expired"       -> "expired"
  const statusClass = status
    .toLowerCase()
    .replaceAll(" ", "-");

  return (
    <span className={`status-badge ${statusClass}`}>
      {status}
    </span>
  );
}

// Export the component so other pages can use it.
export default StatusBadge;