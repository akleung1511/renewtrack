// App.jsx
// This file manages the shared application state
// and defines all routes for RenewTrack.

// =========================================================
// IMPORTS
// =========================================================

// Import useState so App can store
// customers and contracts in shared state.
import { useEffect, useState } from "react";

// Import React Router components.
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

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
// API CONFIGURATION
// =========================================================

// Base address of our local json-server API.
//
// React runs on:
// http://localhost:5173
//
// json-server runs on:
// http://localhost:3001
const API_BASE = "http://localhost:3001";

// =========================================================
// APP COMPONENT
// =========================================================

function App() {
  // =========================================================
  // SHARED STATE
  // =========================================================

  // Store all contracts loaded from the API.
  const [contracts, setContracts] = useState([]);

  // Store all customers loaded from the API.
  const [customers, setCustomers] = useState([]);

  // =========================================================
  // LOADING STATE
  // =========================================================

  // true means the customer API request
  // has not finished yet.
  const [customersLoading, setCustomersLoading] = useState(true);

  // true means the contract API request
  // has not finished yet.
  const [contractsLoading, setContractsLoading] = useState(true);

  // =========================================================
  // ERROR STATE
  // =========================================================

  // Store an error message if customers
  // cannot be loaded from the API.
  const [customersError, setCustomersError] = useState(null);

  // Store an error message if contracts
  // cannot be loaded from the API.
  const [contractsError, setContractsError] = useState(null);

  // =========================================================
  // LOAD CUSTOMERS FROM API
  // =========================================================

  // useEffect runs when the application first loads.
  useEffect(() => {
    const loadCustomers = async () => {
      try {
        // The request is starting.
        setCustomersLoading(true);

        // Clear any previous error before
        setCustomersError(null);

        // GET /customers
        const response = await fetch(`${API_BASE}/customers`);

        // Check for an unsuccessful response.
        if (!response.ok) {
          throw new Error(`Failed to load customers: ${response.status}`);
        }

        // Convert JSON into JavaScript data.
        const data = await response.json();

        // Store the customers in React state.
        setCustomers(data);
      } catch (error) {
        // Keep the technical error in the console
        // for developers.
        console.error("Error loading customers:", error);

        // Store a friendly message that can
        // be displayed to the user.
        setCustomersError("Unable to load customers. Please try again later.");
      } finally {
        // finally runs whether the request
        // succeeds OR fails.
        //
        // The request is now finished.
        setCustomersLoading(false);
      }
    };

    loadCustomers();
  }, []);

  // =========================================================
  // LOAD CONTRACTS FROM API
  // =========================================================

  useEffect(() => {
    const loadContracts = async () => {
      try {
        // The request is starting.
        setContractsLoading(true);

        // Clear any previous contract error.
        setContractsError(null);

        // GET /contracts
        const response = await fetch(`${API_BASE}/contracts`);

        // Check for an unsuccessful response.
        if (!response.ok) {
          throw new Error(`Failed to load contracts: ${response.status}`);
        }

        // Convert JSON into JavaScript data.
        const data = await response.json();

        // Store the contracts in React state.
        setContracts(data);
      } catch (error) {
        // Keep the technical error in the console
        // for developers.
        console.error("Error loading contracts:", error);

        // Store a friendly error message.
        setContractsError("Unable to load contracts. Please try again later.");
      } finally {
        // The request has finished.
        setContractsLoading(false);
      }
    };

    loadContracts();
  }, []);

  // =========================================================
  // ADD CUSTOMER
  // =========================================================

  // This function receives a new customer from
  // NewCustomerPage and saves it to our API.
  const addCustomer = async (newCustomer) => {
    try {
      // Send a POST request to:
      // http://localhost:3001/customers
      //
      // json-server will save this customer
      // inside db.json.
      const response = await fetch(`${API_BASE}/customers`, {
        method: "POST",

        // Tell the server we are sending JSON data.
        headers: {
          "Content-Type": "application/json",
        },

        // Convert the JavaScript customer object
        // into JSON before sending it.
        body: JSON.stringify(newCustomer),
      });

      // Check whether the request succeeded.
      if (!response.ok) {
        throw new Error(`Failed to add customer: ${response.status}`);
      }

      // json-server returns the newly created customer,
      // including its generated ID.
      const savedCustomer = await response.json();

      // Add the saved customer to React state
      // so the page updates immediately.
      setCustomers((previousCustomers) => [
        ...previousCustomers,
        savedCustomer,
      ]);
    } catch (error) {
      console.error("Error adding customer:", error);
    }
  };

  // =========================================================
  // UPDATE CUSTOMER
  // =========================================================

  // This function receives an updated customer from
  // EditCustomerPage and saves the changes to the API.
  const updateCustomer = async (updatedCustomer) => {
    try {
      // Send a PUT request to the specific customer.
      //
      // Example:
      // PUT http://localhost:3001/customers/YtVYnJEHVYU
      const response = await fetch(
        `${API_BASE}/customers/${updatedCustomer.id}`,
        {
          method: "PUT",

          // Tell the API that we are sending JSON.
          headers: {
            "Content-Type": "application/json",
          },

          // Convert the updated customer object into JSON.
          body: JSON.stringify(updatedCustomer),
        },
      );

      // Check whether the API successfully updated the customer.
      if (!response.ok) {
        throw new Error(`Failed to update customer: ${response.status}`);
      }

      // Get the saved customer back from json-server.
      const savedCustomer = await response.json();

      // Update React state so the screen changes immediately.
      setCustomers((previousCustomers) =>
        previousCustomers.map((customer) =>
          String(customer.id) === String(savedCustomer.id)
            ? savedCustomer
            : customer,
        ),
      );
    } catch (error) {
      console.error("Error updating customer:", error);
    }
  };

  // =========================================================
  // DELETE CUSTOMER
  // =========================================================

  // Delete a customer from the json-server API.
  //
  // BUSINESS RULE:
  // A customer can only be deleted when they have
  // NO contracts.
  //
  // CustomersPage already disables the Delete button
  // when a customer has contracts.
  //
  // We also check the rule here for extra protection.
  const deleteCustomer = async (customerId) => {
    try {
      // =======================================================
      // CHECK WHETHER CUSTOMER HAS CONTRACTS
      // =======================================================

      // Look through the contracts array and check whether
      // any contract belongs to this customer.
      const hasContracts = contracts.some(
        (contract) => String(contract.customerId) === String(customerId),
      );

      // If the customer has at least one contract,
      // stop the delete operation.
      if (hasContracts) {
        console.error("Customer cannot be deleted because contracts exist.");

        return;
      }

      // =======================================================
      // DELETE CUSTOMER FROM API
      // =======================================================

      // Send a DELETE request to:
      //
      // http://localhost:3001/customers/:id
      //
      // Example:
      // http://localhost:3001/customers/YtVYnJEHVYU
      const response = await fetch(`${API_BASE}/customers/${customerId}`, {
        method: "DELETE",
      });

      // Check whether the API successfully deleted
      // the customer.
      if (!response.ok) {
        throw new Error(`Failed to delete customer: ${response.status}`);
      }

      // =======================================================
      // UPDATE REACT STATE
      // =======================================================

      // The customer has now been deleted from db.json.
      //
      // Remove the same customer from React state
      // so the screen updates immediately.
      setCustomers((previousCustomers) =>
        previousCustomers.filter(
          (customer) => String(customer.id) !== String(customerId),
        ),
      );
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  // =========================================================
  // ADD CONTRACT
  // =========================================================

  // Receive a new contract from NewContractPage
  // and save it permanently through our API.
  const addContract = async (newContract) => {
    try {
      // Send a POST request to the contracts API.
      //
      // POST means:
      // "Create a new record."
      const response = await fetch(`${API_BASE}/contracts`, {
        method: "POST",

        // Tell json-server that the data
        // we are sending is JSON.
        headers: {
          "Content-Type": "application/json",
        },

        // Convert the JavaScript contract object
        // into JSON before sending it to the API.
        body: JSON.stringify(newContract),
      });

      // If the API request fails,
      // create an error and jump to catch().
      if (!response.ok) {
        throw new Error(`Failed to add contract: ${response.status}`);
      }

      // Convert the API response back into
      // a JavaScript object.
      //
      // json-server will return the saved contract
      // with its generated ID.
      const savedContract = await response.json();

      // Add the saved contract to React state
      // so the page updates immediately.
      setContracts((previousContracts) => [
        ...previousContracts,
        savedContract,
      ]);
    } catch (error) {
      // Display any API error in the browser console.
      console.error("Error adding contract:", error);
    }
  };

  // =========================================================
  // UPDATE CONTRACT
  // =========================================================

  // Receive an updated contract from EditContractPage
  // and save the changes permanently through the API.
  const updateContract = async (updatedContract) => {
    try {
      // Send a PUT request to the specific contract.
      //
      // Example:
      // PUT http://localhost:3001/contracts/abc123
      const response = await fetch(
        `${API_BASE}/contracts/${updatedContract.id}`,
        {
          method: "PUT",

          // Tell json-server that we are sending JSON.
          headers: {
            "Content-Type": "application/json",
          },

          // Convert the updated contract object
          // into JSON before sending it.
          body: JSON.stringify(updatedContract),
        },
      );

      // Check whether the API successfully
      // updated the contract.
      if (!response.ok) {
        throw new Error(`Failed to update contract: ${response.status}`);
      }

      // Get the updated contract returned by json-server.
      const savedContract = await response.json();

      // Update React state so the page
      // changes immediately.
      setContracts((previousContracts) =>
        previousContracts.map((contract) =>
          String(contract.id) === String(savedContract.id)
            ? savedContract
            : contract,
        ),
      );
    } catch (error) {
      console.error("Error updating contract:", error);
    }
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
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

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
              <DashboardPage customers={customers} contracts={contracts} />
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
                // Pass loading state to CustomersPage.
                loading={customersLoading}
                // Pass API error state to CustomersPage.
                error={customersError}
              />
            }
          />

          {/* =================================================
              ADD CUSTOMER
              ================================================= */}

          {/* Page for creating a new customer. */}
          <Route
            path="/customers/new"
            element={<NewCustomerPage addCustomer={addCustomer} />}
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
              <CustomerDetailPage customers={customers} contracts={contracts} />
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
                // Pass loading state to ContractsPage.
                loading={contractsLoading}
                // Pass API error state to ContractsPage.
                error={contractsError}
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
            element={<ContractDetailPage contracts={contracts} />}
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
