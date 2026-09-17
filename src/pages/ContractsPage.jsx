// ContractsPage.jsx
// This page displays all contracts stored in RenewTrack.

// Import Link from React Router.
// Link lets the user navigate to another route
// without refreshing the whole application.
import { Link } from "react-router-dom";

// Import our reusable StatusBadge component.
// We already created this component for the Dashboard,
// so we can reuse it here.
import StatusBadge from "../components/StatusBadge.jsx";

// Import our reusable date calculation function.
import { calculateDaysRemaining } from "../utils/dateUtils.js";

// Receive the contracts list and deleteContract function
// from App.jsx through props.
function ContractsPage({ contracts, deleteContract }) {
  return (
    <main>
      {/* =====================================================
          PAGE HEADER
          ===================================================== */}

      <h1>Contracts</h1>

      <p>Manage and track your customer contracts.</p>

      {/* =====================================================
          ADD CONTRACT ACTION
          ===================================================== */}

      {/* Navigate to the page for creating a new contract. */}
      <Link to="/contracts/new" className="add-contract-button">
        + Add Contract
      </Link>

      {/* =====================================================
          CONTRACT LIST
          ===================================================== */}

      <div className="contracts-list">
        {/*
          .map() goes through every contract in our
          contracts array.

          For each contract, React creates one contract card.
        */}
        {contracts.map((contract) => (
          <div className="contract-card" key={contract.id}>
            {/* Customer / company name */}
            <h2>{contract.customer}</h2>

            {/* Name of the contract */}
            <h3>{contract.contractName}</h3>

            {/* =================================================
                CONTRACT INFORMATION
                ================================================= */}

            <div className="contract-details">
              {/* Contract start date */}
              <p>
                <strong>Start:</strong> {contract.startDate}
              </p>

              {/* Contract expiry date */}
              <p>
                <strong>Expiry:</strong> {contract.expiryDate}
              </p>

              {/* Show days remaining for active contracts.
                 For expired contracts, show how many days ago they expired. */}
              <p>
                <strong>
                  {calculateDaysRemaining(contract.expiryDate) < 0
                    ? "Expired:"
                    : "Days Remaining:"}
                </strong>{" "}
                {calculateDaysRemaining(contract.expiryDate) < 0
                  ? `${Math.abs(calculateDaysRemaining(contract.expiryDate))} days ago`
                  : `${calculateDaysRemaining(contract.expiryDate)} days`}
              </p>

              {/* Contract value. toLocaleString() adds commas to the number.
                  Example: 24000 -> 24,000 */}
              <p>
                <strong>Value:</strong> ${contract.value.toLocaleString()}
              </p>

              {/* Reuse our StatusBadge component. */}
              <p>
                <strong>Status:</strong>{" "}
                <StatusBadge status={contract.status} />
              </p>
            </div>

            {/* =================================================
                ACTION BUTTONS
                ================================================= */}

            <div className="contract-actions">
              {/* Open the details page for the selected contract. */}
              <Link
                to={`/contracts/${contract.id}`}
                className="contract-action-link"
              >
                View
              </Link>

              {/* Navigate to the Edit page for this specific contract. */}
              <Link
                to={`/contracts/${contract.id}/edit`}
                className="contract-action-link"
              >
                Edit
              </Link>

              {/* Delete this specific contract.
    contract.id tells App.jsx which contract to remove. */}
              <button type="button" onClick={() => deleteContract(contract.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

// Export the page so React Router can display it.
export default ContractsPage;
