// App.jsx
// This file defines the routes for the RenewTrack application.

// Import useState so App can store the shared list of contracts.
import { useState } from "react";

// Import the starting contract data.
import { contracts as initialContracts } from "./data/contracts.js";

// Import the React Router components we need.
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Import the shared layout.
// RootLayout contains our Sidebar and <Outlet />.
import RootLayout from "./layouts/RootLayout.jsx";

// Import our page components.
import DashboardPage from "./pages/DashboardPage.jsx";
import CustomersPage from "./pages/CustomersPage.jsx";
import ContractsPage from "./pages/ContractsPage.jsx";

// Import the page used to create a new contract.
import NewContractPage from "./pages/NewContractPage.jsx";

// Import the Contract Details page.
// This page will display one contract based on its ID in the URL.
import ContractDetailPage from "./pages/ContractDetailPage.jsx";

// Import the page used to edit an existing contract.
import EditContractPage from "./pages/EditContractPage.jsx";

function App() {
  // Store all contracts in shared state.
  const [contracts, setContracts] = useState(initialContracts);

  // Add a new contract to the shared state.
  const addContract = (newContract) => {
    const contractWithId = {
      ...newContract,
      id: Date.now(),
    };

    setContracts((previousContracts) => [...previousContracts, contractWithId]);
  };

  // =========================================================
  // DELETE A CONTRACT
  // =========================================================

  // This function receives the ID of the contract
  // that the user wants to delete.
  const deleteContract = (contractId) => {
    // Keep every contract whose ID does NOT
    // match the contract we want to delete.
    setContracts((previousContracts) =>
      previousContracts.filter((contract) => contract.id !== contractId),
    );
  };

  // =========================================================
  // UPDATE A CONTRACT
  // =========================================================

  // This function receives an updated contract.
  //
  // .map() checks every contract.
  // If the ID matches, replace the old contract.
  // Otherwise, keep the existing contract.
  const updateContract = (updatedContract) => {
    setContracts((previousContracts) =>
      previousContracts.map((contract) =>
        contract.id === updatedContract.id ? updatedContract : contract,
      ),
    );
  };

  return (
    // BrowserRouter enables routing in the application.
    <BrowserRouter>
      {/* Routes contains all routes in RenewTrack. */}
      <Routes>
        {/* If the user visits "/", redirect to "/dashboard". */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* RootLayout is the shared layout for the CRM pages.
            It contains:
            - Sidebar
            - Outlet

            The child routes below will appear inside <Outlet />.
        */}
        <Route element={<RootLayout />}>
          {/* Dashboard route */}
          <Route path="/dashboard" element={<DashboardPage />} />

          {/* Customers route */}
          <Route path="/customers" element={<CustomersPage />} />

          {/* Main Contracts page.
    Pass the contracts data and deleteContract function
    to ContractsPage using props. */}
          <Route
            path="/contracts"
            element={
              <ContractsPage
                contracts={contracts}
                deleteContract={deleteContract}
              />
            }
          />

          {/* Page for creating a new contract.
    Pass the addContract function to the page as a prop. */}
          <Route
            path="/contracts/new"
            element={<NewContractPage addContract={addContract} />}
          />

          {/* Dynamic route for viewing one existing contract.
    Pass the shared contracts state to the details page. */}
          <Route
            path="/contracts/:contractId"
            element={<ContractDetailPage contracts={contracts} />}
          />
          {/* Page for creating a new contract. */}
          <Route
            path="/contracts/new"
            element={<NewContractPage addContract={addContract} />}
          />

          {/* Page for editing an existing contract.
    Pass the shared contracts list so the Edit page
    can find the contract that the user selected. */}
          <Route
            path="/contracts/:contractId/edit"
            element={
              <EditContractPage
                contracts={contracts}
                updateContract={updateContract}
              />
            }
          />

          {/* Page for viewing an existing contract. */}
          <Route
            path="/contracts/:contractId"
            element={<ContractDetailPage contracts={contracts} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

// Export App so main.jsx can render it.
export default App;
