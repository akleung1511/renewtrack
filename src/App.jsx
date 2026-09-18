// App.jsx
// This file manages the shared application state
// and defines all routes for RenewTrack.

// =========================================================
// IMPORTS
// =========================================================

// Import useState so App can store
// customers and contracts in shared state.
import { useState } from "react";

// Import the starting contract data.
import { contracts as initialContracts } from "./data/contracts.js";

// Import the starting customer data.
import { customers as initialCustomers } from "./data/customers.js";

// Import React Router components.
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// =========================================================
// LAYOUT
// =========================================================

// RootLayout contains the Sidebar and <Outlet />.
import RootLayout from "./layouts/RootLayout.jsx";

// =========================================================
// PAGE IMPORTS
// =========================================================

// Dashboard
import DashboardPage from "./pages/DashboardPage.jsx";

// Customer pages
import CustomersPage from "./pages/CustomersPage.jsx";
import NewCustomerPage from "./pages/NewCustomerPage.jsx";
import CustomerDetailPage from "./pages/CustomerDetailPage.jsx";
import EditCustomerPage from "./pages/EditCustomerPage.jsx";

// Contract pages
import ContractsPage from "./pages/ContractsPage.jsx";
import NewContractPage from "./pages/NewContractPage.jsx";
import ContractDetailPage from "./pages/ContractDetailPage.jsx";
import EditContractPage from "./pages/EditContractPage.jsx";

// =========================================================
// APP COMPONENT
// =========================================================

function App() {
  // =========================================================
  // SHARED STATE
  // =========================================================

  // Store all contracts in shared state.
  const [contracts, setContracts] = useState(initialContracts);

  // Store all customers in shared state.
  const [customers, setCustomers] = useState(initialCustomers);

  // =========================================================
  // ADD CUSTOMER
  // =========================================================

  // Receive a new customer from NewCustomerPage
  // and add it to the customers array.
  const addCustomer = (newCustomer) => {
    // Create a unique ID for the new customer.
    const customerWithId = {
      ...newCustomer,
      id: Date.now(),
    };

    // Add the new customer to the existing list.
    setCustomers((previousCustomers) => [
      ...previousCustomers,
      customerWithId,
    ]);
  };

  // =========================================================
  // UPDATE CUSTOMER
  // =========================================================

  // Receive an updated customer from EditCustomerPage.
  const updateCustomer = (updatedCustomer) => {
    // Go through every customer.
    //
    // If the ID matches the updated customer,
    // replace the old customer.
    //
    // Otherwise keep the existing customer.
    setCustomers((previousCustomers) =>
      previousCustomers.map((customer) =>
        customer.id === updatedCustomer.id
          ? updatedCustomer
          : customer,
      ),
    );
  };

  // =========================================================
  // DELETE CUSTOMER
  // =========================================================

  // Remove a customer from shared state.
  //
  // IMPORTANT BUSINESS RULE:
  // CustomersPage only allows this function to run
  // when the customer has NO contracts.
  const deleteCustomer = (customerId) => {
    // Keep every customer whose ID does NOT
    // match the customer being deleted.
    setCustomers((previousCustomers) =>
      previousCustomers.filter(
        (customer) => customer.id !== customerId,
      ),
    );
  };

  // =========================================================
  // ADD CONTRACT
  // =========================================================

  // Receive a new contract from NewContractPage.
  const addContract = (newContract) => {
    // Give the new contract a unique ID.
    const contractWithId = {
      ...newContract,
      id: Date.now(),
    };

    // Add the contract to the existing list.
    setContracts((previousContracts) => [
      ...previousContracts,
      contractWithId,
    ]);
  };

  // =========================================================
  // UPDATE CONTRACT
  // =========================================================

  // Receive an updated contract from EditContractPage.
  const updateContract = (updatedContract) => {
    // Go through every contract.
    //
    // If the ID matches the updated contract,
    // replace the old contract.
    //
    // Otherwise keep the existing contract.
    setContracts((previousContracts) =>
      previousContracts.map((contract) =>
        contract.id === updatedContract.id
          ? updatedContract
          : contract,
      ),
    );
  };

  // =========================================================
  // NO DELETE CONTRACT FUNCTION
  // =========================================================

  /*
    BUSINESS RULE:

    Contracts cannot be deleted.

    This applies to:
    - Active contracts
    - Expiring Soon contracts
    - Expired contracts

    Contracts are retained as historical business records.

    Therefore we intentionally DO NOT create:

    const deleteContract = ...

    in RenewTrack.
  */

  // =========================================================
  // ROUTES
  // =========================================================

  return (
    <BrowserRouter>
      <Routes>
        {/* ===================================================
            HOME
            =================================================== */}

        {/* Redirect "/" to the Dashboard. */}
        <Route
          path="/"
          element={<Navigate to="/dashboard" replace />}
        />

        {/* ===================================================
            ROOT LAYOUT
            =================================================== */}

        {/* All routes below appear inside RootLayout. */}
        <Route element={<RootLayout />}>
    {/* =================================================
        DASHBOARD
        ================================================= */}

    {/* Pass the shared customers and contracts
        data to DashboardPage.

        This allows the Dashboard to calculate
        statistics from the actual application data
        instead of using hard-coded numbers.
    */}
    <Route
      path="/dashboard"
      element={
        <DashboardPage
          customers={customers}
          contracts={contracts}
        />
      }
    />
          {/* =================================================
              CUSTOMERS
              ================================================= */}

          {/* Main Customers page.

              customers:
              Used to display all customers.

              contracts:
              Used to check whether a customer
              has contracts.

              deleteCustomer:
              Used to delete customers that
              have NO contracts.
          */}
          <Route
            path="/customers"
            element={
              <CustomersPage
                customers={customers}
                contracts={contracts}
                deleteCustomer={deleteCustomer}
              />
            }
          />

          {/* =================================================
              ADD CUSTOMER
              ================================================= */}

          {/* Page for creating a new customer. */}
          <Route
            path="/customers/new"
            element={
              <NewCustomerPage
                addCustomer={addCustomer}
              />
            }
          />

          {/* =================================================
              VIEW CUSTOMER
              ================================================= */}

          {/* Dynamic customer details route.

              Example:

              /customers/1

              We pass contracts because the Customer
              Details page also displays contracts
              belonging to this customer.
          */}
          <Route
            path="/customers/:customerId"
            element={
              <CustomerDetailPage
                customers={customers}
                contracts={contracts}
              />
            }
          />

          {/* =================================================
              EDIT CUSTOMER
              ================================================= */}

          {/* Dynamic customer edit route.

              Example:

              /customers/1/edit
          */}
          <Route
            path="/customers/:customerId/edit"
            element={
              <EditCustomerPage
                customers={customers}
                updateCustomer={updateCustomer}
              />
            }
          />

          {/* =================================================
              CONTRACTS
              ================================================= */}

          {/* Main Contracts page.

              Notice:
              We ONLY pass contracts.

              There is NO deleteContract prop because
              contracts cannot be deleted.
          */}
          <Route
            path="/contracts"
            element={
              <ContractsPage
                contracts={contracts}
              />
            }
          />

          {/* =================================================
              ADD CONTRACT
              ================================================= */}

          {/* Page for creating a new contract.

              addContract:
              Adds the new contract.

              customers:
              Allows the user to select an existing
              customer from the customer dropdown.
          */}
          <Route
            path="/contracts/new"
            element={
              <NewContractPage
                addContract={addContract}
                customers={customers}
              />
            }
          />

          {/* =================================================
              VIEW CONTRACT
              ================================================= */}

          {/* Dynamic contract details route.

              Example:

              /contracts/1
          */}
          <Route
            path="/contracts/:contractId"
            element={
              <ContractDetailPage
                contracts={contracts}
              />
            }
          />

          {/* =================================================
              EDIT CONTRACT
              ================================================= */}

          {/* Dynamic contract edit route.

              Example:

              /contracts/1/edit

              contracts:
              Used to find the selected contract.

              customers:
              Used for the customer dropdown.

              updateContract:
              Saves the edited contract.
          */}
          <Route
            path="/contracts/:contractId/edit"
            element={
              <EditContractPage
                contracts={contracts}
                customers={customers}
                updateContract={updateContract}
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

// =========================================================
// EXPORT
// =========================================================

// Export App so main.jsx can render the application.
export default App;