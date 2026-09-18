// ContractsPage.jsx
// This page displays all contracts stored in RenewTrack.

// =========================================================
// IMPORTS
// =========================================================

// Import Link from React Router.
// Link lets the user navigate to another route
// without refreshing the whole application.
import { Link } from "react-router-dom";

// Import our reusable StatusBadge component.
import StatusBadge from "../components/StatusBadge.jsx";

// Import our reusable date calculation function.
import { calculateDaysRemaining } from "../utils/dateUtils.js";

// =========================================================
// CONTRACTS PAGE COMPONENT
// =========================================================

// Receive the contracts list from App.jsx.
//
// Notice:
// We no longer receive deleteContract.
//
// BUSINESS RULE:
// Contracts are historical business records.
// They cannot be deleted, even after they expire.
function ContractsPage({ contracts }) {
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
      <Link
        to="/contracts/new"
        className="add-contract-button"
      >
        + Add Contract
      </Link>

      {/* =====================================================
          CONTRACT LIST
          ===================================================== */}

      <div className="contracts-list">
        {/*
          .map() goes through every contract
          inside the contracts array.

          For each contract, React creates
          one contract card.
        */}
        {contracts.map((contract) => (
          <div
            className="contract-card"
            key={contract.id}
          >
            {/* =================================================
                CONTRACT HEADER
                ================================================= */}

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
                <strong>Start:</strong>{" "}
                {contract.startDate}
              </p>

              {/* Contract expiry date */}
              <p>
                <strong>Expiry:</strong>{" "}
                {contract.expiryDate}
              </p>

              {/* =================================================
                  DAYS REMAINING / EXPIRED DAYS
                  ================================================= */}

              {/*
                calculateDaysRemaining() returns:

                Positive number:
                Contract has not expired.

                Negative number:
                Contract has already expired.
              */}
              <p>
                <strong>
                  {calculateDaysRemaining(contract.expiryDate) < 0
                    ? "Expired:"
                    : "Days Remaining:"}
                </strong>{" "}

                {calculateDaysRemaining(contract.expiryDate) < 0
                  ? `${Math.abs(
                      calculateDaysRemaining(contract.expiryDate),
                    )} days ago`
                  : `${calculateDaysRemaining(
                      contract.expiryDate,
                    )} days`}
              </p>

              {/* =================================================
                  CONTRACT VALUE
                  ================================================= */}

              {/* 
                toLocaleString() adds commas to numbers.

                Example:
                24000 becomes 24,000
              */}
              <p>
                <strong>Value:</strong>{" "}
                ${contract.value.toLocaleString()}
              </p>

              {/* =================================================
                  CONTRACT STATUS
                  ================================================= */}

              {/* Reuse our StatusBadge component. */}
              <p>
                <strong>Status:</strong>{" "}
                <StatusBadge status={contract.status} />
              </p>
            </div>

            {/* =================================================
                CONTRACT ACTIONS
                ================================================= */}

            <div className="contract-actions">
              {/* -----------------------------------------------
                  VIEW CONTRACT
                  ----------------------------------------------- */}

              {/* Open the details page for this contract. */}
              <Link
                to={`/contracts/${contract.id}`}
                className="contract-action-link"
              >
                View
              </Link>

              {/* -----------------------------------------------
                  EDIT CONTRACT
                  ----------------------------------------------- */}

              {/* Open the Edit page for this contract. */}
              <Link
                to={`/contracts/${contract.id}/edit`}
                className="contract-action-link"
              >
                Edit
              </Link>

              {/* -----------------------------------------------
                  NO DELETE BUTTON
                  -----------------------------------------------

                  BUSINESS RULE:

                  Contracts cannot be deleted.

                  This includes:
                  - Active contracts
                  - Expiring Soon contracts
                  - Expired contracts

                  We keep expired contracts because they are
                  historical business records.
              */}
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

// Export the page so React Router can display it.
export default ContractsPage;