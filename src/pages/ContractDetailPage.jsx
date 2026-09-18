// ContractDetailPage.jsx
// This page displays the details of one selected contract.

// Import React Router tools.
//
// useParams:
// Reads the contract ID from the URL.
// Example: /contracts/1 -> contractId = "1"
//
// Link:
// Allows us to navigate back to the Contracts page
// without refreshing the whole application.
import { useParams, Link } from "react-router-dom";

// Import our reusable StatusBadge component.
import StatusBadge from "../components/StatusBadge.jsx";

// Import our reusable days remaining calculation.
import { calculateDaysRemaining } from "../utils/dateUtils.js";

// Receive the shared contracts list from App.jsx
// through React props.
function ContractDetailPage({ contracts }) {
  
  // =========================================================
  // READ CONTRACT ID FROM URL
  // =========================================================

  // If the URL is:
  // /contracts/1
  //
  // contractId will contain:
  // "1"
  //
  // URL parameters are returned as strings.
  const { contractId } = useParams();

// =========================================================
// FIND THE SELECTED CONTRACT
// =========================================================

// useParams gives us contractId as a string.
//
// json-server also uses string IDs, including generated IDs
// such as "qVXtzoNxpA".
//
// Therefore we compare both IDs as strings.
const contract = contracts.find(
  (contract) =>
    String(contract.id) === String(contractId),
);

  // =========================================================
  // CONTRACT NOT FOUND
  // =========================================================

  // If no matching contract exists, show an error message.
  if (!contract) {
    return (
      <main>
        <h1>Contract Not Found</h1>

        <p>The requested contract could not be found.</p>
      </main>
    );
  }

  // =========================================================
  // DAYS REMAINING
  // =========================================================

  // Calculate this once and store the result.
  //
  // This is cleaner than calling
  // calculateDaysRemaining() several times.
  const daysRemaining = calculateDaysRemaining(contract.expiryDate);

  // =========================================================
  // DISPLAY CONTRACT
  // =========================================================

  return (
    <main>
      {/* =====================================================
        PAGE HEADER
        ===================================================== */}

      <h1>Contract Details</h1>

      {/* Navigate back to the main Contracts page. */}
      <Link to="/contracts" className="back-link">
        ← Back to Contracts
      </Link>

      {/* Display the selected contract.
        contract-detail-card gives this page its own styling. */}
      <div className="contract-card contract-detail-card">
        {/* Customer / company name */}
        <h2>{contract.customer}</h2>

        {/* Contract name */}
        <h3>{contract.contractName}</h3>

        <div className="contract-details">
          <p>
            <strong>Start:</strong> {contract.startDate}
          </p>

          <p>
            <strong>Expiry:</strong> {contract.expiryDate}
          </p>

          {/* Show either days remaining or days expired. */}
          <p>
            <strong>
              {daysRemaining < 0 ? "Expired:" : "Days Remaining:"}
            </strong>{" "}
            {daysRemaining < 0
              ? `${Math.abs(daysRemaining)} days ago`
              : `${daysRemaining} days`}
          </p>

          <p>
            <strong>Value:</strong> ${contract.value.toLocaleString()}
          </p>

          <p>
            <strong>Status:</strong> <StatusBadge status={contract.status} />
          </p>
        </div>
      </div>
    </main>
  );
}

// Export the page so React Router can use it.
export default ContractDetailPage;
