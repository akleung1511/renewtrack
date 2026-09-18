// ContractsPage.jsx
// This page displays all contracts stored in RenewTrack.

// =========================================================
// IMPORTS
// =========================================================

// useState allows this page to remember:
// 1. The user's search text
// 2. The selected status filter
import { useState } from "react";

// Link lets the user navigate without refreshing the page.
import { Link } from "react-router-dom";

// Reusable components and utilities.
import StatusBadge from "../components/StatusBadge.jsx";
import { calculateDaysRemaining } from "../utils/dateUtils.js";

// =========================================================
// CONTRACTS PAGE COMPONENT
// =========================================================

// Receive the contracts list from App.jsx.
//
// BUSINESS RULE:
// Contracts are historical business records.
// They cannot be deleted, even after they expire.
function ContractsPage({ contracts, loading, error }) {
  // =========================================================
  // SEARCH STATE
  // =========================================================

  // Store what the user types into the search box.
  const [searchTerm, setSearchTerm] = useState("");

  // =========================================================
  // STATUS FILTER STATE
  // =========================================================

  // Store the selected status.
  //
  // Possible values:
  // "All"
  // "Active"
  // "Expiring Soon"
  // "Expired"
  const [statusFilter, setStatusFilter] = useState("All");

  // =========================================================
  // LOADING STATE
  // =========================================================

  // While App.jsx is fetching contracts from the API,
  // display a loading message.
  if (loading) {
    return (
      <main>
        <h1>Contracts</h1>

        <p>Loading contracts...</p>
      </main>
    );
  }

  // =========================================================
  // ERROR STATE
  // =========================================================

  // If the contracts API request failed,
  // display the friendly error message from App.jsx.
  if (error) {
    return (
      <main>
        <h1>Contracts</h1>

        <p>{error}</p>
      </main>
    );
  }

  // =========================================================
  // FILTER CONTRACTS
  // =========================================================

  // A contract must pass BOTH:
  //
  // 1. Search check
  // 2. Status check
  //
  // before it is displayed.
  const filteredContracts = contracts.filter((contract) => {
    // Convert the search text to lowercase
    // so searching is case-insensitive.
    const search = searchTerm.toLowerCase();

    // =======================================================
    // SEARCH CHECK
    // =======================================================

    // Check the customer/company name.
    const matchesCustomer = contract.customer.toLowerCase().includes(search);

    // Check the contract name.
    const matchesContractName = contract.contractName
      .toLowerCase()
      .includes(search);

    // Search passes when either the customer name
    // OR contract name contains the search text.
    const matchesSearch = matchesCustomer || matchesContractName;

    // =======================================================
    // STATUS CHECK
    // =======================================================

    // If "All" is selected, every status passes.
    //
    // Otherwise, the contract status must exactly
    // match the selected status.
    const matchesStatus =
      statusFilter === "All" || contract.status === statusFilter;

    // =======================================================
    // FINAL RESULT
    // =======================================================

    // BOTH conditions must be true.
    return matchesSearch && matchesStatus;
  });

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

      <Link to="/contracts/new" className="add-contract-button">
        + Add Contract
      </Link>

      {/* =====================================================
          SEARCH AND FILTER CONTROLS
          ===================================================== */}

      <div className="contract-filters">
        {/* ===================================================
            SEARCH
            =================================================== */}

        <div className="form-group">
          <label htmlFor="contractSearch">Search Contracts</label>

          <input
            type="text"
            id="contractSearch"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search by customer or contract name..."
          />
        </div>

        {/* ===================================================
            STATUS FILTER
            =================================================== */}

        <div className="form-group">
          <label htmlFor="statusFilter">Filter by Status</label>

          <select
            id="statusFilter"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
          >
            <option value="All">All</option>

            <option value="Active">Active</option>

            <option value="Expiring Soon">Expiring Soon</option>

            <option value="Expired">Expired</option>
          </select>
        </div>
      </div>

      {/* =====================================================
          RESULT COUNT
          ===================================================== */}

      {/* Show how many contracts match the current filters. */}
      <p>
        Showing {filteredContracts.length} of {contracts.length} contracts
      </p>

      {/* =====================================================
          CONTRACT LIST
          ===================================================== */}

      <div className="contracts-list">
        {filteredContracts.map((contract) => (
          <div className="contract-card" key={contract.id}>
            {/* =================================================
                CONTRACT HEADER
                ================================================= */}

            <h2>{contract.customer}</h2>

            <h3>{contract.contractName}</h3>

            {/* =================================================
                CONTRACT INFORMATION
                ================================================= */}

            <div className="contract-details">
              {/* Start date */}
              <p>
                <strong>Start:</strong> {contract.startDate}
              </p>

              {/* Expiry date */}
              <p>
                <strong>Expiry:</strong> {contract.expiryDate}
              </p>

              {/* =================================================
                  DAYS REMAINING / EXPIRED DAYS
                  ================================================= */}

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
                  : `${calculateDaysRemaining(contract.expiryDate)} days`}
              </p>

              {/* =================================================
                  CONTRACT VALUE
                  ================================================= */}

              <p>
                <strong>Value:</strong> ${contract.value.toLocaleString()}
              </p>

              {/* =================================================
                  CONTRACT STATUS
                  ================================================= */}

              <p>
                <strong>Status:</strong>{" "}
                <StatusBadge status={contract.status} />
              </p>
            </div>

            {/* =================================================
                CONTRACT ACTIONS
                ================================================= */}

            <div className="contract-actions">
              {/* View contract */}
              <Link
                to={`/contracts/${contract.id}`}
                className="contract-action-link"
              >
                View
              </Link>

              {/* Edit contract */}
              <Link
                to={`/contracts/${contract.id}/edit`}
                className="contract-action-link"
              >
                Edit
              </Link>

              {/* =================================================
                  NO DELETE BUTTON

                  BUSINESS RULE:
                  Contracts cannot be deleted.
                  ================================================= */}
            </div>
          </div>
        ))}

        {/* =====================================================
    EMPTY / NO MATCHING RESULTS
    ===================================================== */}

        {/* 
  There are two different situations:

  1. contracts.length === 0
     The database contains no contracts at all.

  2. filteredContracts.length === 0
     Contracts exist, but none match the current
     search or status filter.
*/}

        {contracts.length === 0 ? (
          <p>No contracts found. Add your first contract.</p>
        ) : filteredContracts.length === 0 ? (
          <p>No contracts match your search or status filter.</p>
        ) : null}
      </div>
    </main>
  );
}

// =========================================================
// EXPORT
// =========================================================

export default ContractsPage;
