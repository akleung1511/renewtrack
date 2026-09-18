// App.jsx
// This file manages shared application state,
// API operations, authentication and routing for RenewTrack.

// =========================================================
// IMPORTS
// =========================================================

import {
  useEffect,
  useState,
} from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// =========================================================
// AUTHENTICATION
// =========================================================

import AuthProvider from "./context/AuthContext.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";

// =========================================================
// LAYOUT
// =========================================================

import RootLayout from "./layouts/RootLayout.jsx";

// =========================================================
// PAGE IMPORTS
// =========================================================

// Login
import LoginPage from "./pages/LoginPage.jsx";

// Dashboard
import DashboardPage from "./pages/DashboardPage.jsx";

// Reports
import ReportsPage from "./pages/ReportsPage.jsx";

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

// React:
// http://localhost:5173
//
// json-server:
// http://localhost:3001
const API_BASE = "http://localhost:3001";

// =========================================================
// APP COMPONENT
// =========================================================

function App() {
  // =========================================================
  // SHARED STATE
  // =========================================================

  const [contracts, setContracts] = useState([]);

  const [customers, setCustomers] = useState([]);

  // =========================================================
  // LOADING STATE
  // =========================================================

  const [customersLoading, setCustomersLoading] =
    useState(true);

  const [contractsLoading, setContractsLoading] =
    useState(true);

  // =========================================================
  // ERROR STATE
  // =========================================================

  const [customersError, setCustomersError] =
    useState(null);

  const [contractsError, setContractsError] =
    useState(null);

  // =========================================================
  // LOAD CUSTOMERS FROM API
  // =========================================================

  useEffect(() => {
    const loadCustomers = async () => {
      try {
        // Request starting.
        setCustomersLoading(true);

        // Clear previous error.
        setCustomersError(null);

        // GET /customers
        const response = await fetch(
          `${API_BASE}/customers`,
        );

        if (!response.ok) {
          throw new Error(
            `Failed to load customers: ${response.status}`,
          );
        }

        const data = await response.json();

        setCustomers(data);
      } catch (error) {
        console.error(
          "Error loading customers:",
          error,
        );

        setCustomersError(
          "Unable to load customers. Please try again later.",
        );
      } finally {
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
        // Request starting.
        setContractsLoading(true);

        // Clear previous error.
        setContractsError(null);

        // GET /contracts
        const response = await fetch(
          `${API_BASE}/contracts`,
        );

        if (!response.ok) {
          throw new Error(
            `Failed to load contracts: ${response.status}`,
          );
        }

        const data = await response.json();

        setContracts(data);
      } catch (error) {
        console.error(
          "Error loading contracts:",
          error,
        );

        setContractsError(
          "Unable to load contracts. Please try again later.",
        );
      } finally {
        setContractsLoading(false);
      }
    };

    loadContracts();
  }, []);

  // =========================================================
  // ADD CUSTOMER
  // =========================================================

  const addCustomer = async (newCustomer) => {
    try {
      const response = await fetch(
        `${API_BASE}/customers`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(newCustomer),
        },
      );

      if (!response.ok) {
        throw new Error(
          `Failed to add customer: ${response.status}`,
        );
      }

      // json-server returns the customer
      // with its generated ID.
      const savedCustomer =
        await response.json();

      // Update React state immediately.
      setCustomers((previousCustomers) => [
        ...previousCustomers,
        savedCustomer,
      ]);

      // Return the saved record in case a page
      // needs it later.
      return savedCustomer;
    } catch (error) {
      console.error(
        "Error adding customer:",
        error,
      );

      throw error;
    }
  };

  // =========================================================
  // UPDATE CUSTOMER
  // =========================================================

  const updateCustomer = async (
    updatedCustomer,
  ) => {
    try {
      const response = await fetch(
        `${API_BASE}/customers/${updatedCustomer.id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(
            updatedCustomer,
          ),
        },
      );

      if (!response.ok) {
        throw new Error(
          `Failed to update customer: ${response.status}`,
        );
      }

      const savedCustomer =
        await response.json();

      setCustomers((previousCustomers) =>
        previousCustomers.map((customer) =>
          String(customer.id) ===
          String(savedCustomer.id)
            ? savedCustomer
            : customer,
        ),
      );

      return savedCustomer;
    } catch (error) {
      console.error(
        "Error updating customer:",
        error,
      );

      throw error;
    }
  };

  // =========================================================
  // DELETE CUSTOMER
  // =========================================================

  // BUSINESS RULE:
  //
  // Customers can only be deleted when
  // they have NO contracts.
  const deleteCustomer = async (customerId) => {
    try {
      // Check whether any contract belongs
      // to this customer.
      const hasContracts = contracts.some(
        (contract) =>
          String(contract.customerId) ===
          String(customerId),
      );

      if (hasContracts) {
        console.error(
          "Customer cannot be deleted because contracts exist.",
        );

        return;
      }

      const response = await fetch(
        `${API_BASE}/customers/${customerId}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        throw new Error(
          `Failed to delete customer: ${response.status}`,
        );
      }

      // Remove the deleted customer
      // from React state.
      setCustomers((previousCustomers) =>
        previousCustomers.filter(
          (customer) =>
            String(customer.id) !==
            String(customerId),
        ),
      );
    } catch (error) {
      console.error(
        "Error deleting customer:",
        error,
      );
    }
  };

  // =========================================================
  // ADD CONTRACT
  // =========================================================

  const addContract = async (newContract) => {
    try {
      const response = await fetch(
        `${API_BASE}/contracts`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(newContract),
        },
      );

      if (!response.ok) {
        throw new Error(
          `Failed to add contract: ${response.status}`,
        );
      }

      const savedContract =
        await response.json();

      // Update React state immediately.
      setContracts((previousContracts) => [
        ...previousContracts,
        savedContract,
      ]);

      return savedContract;
    } catch (error) {
      console.error(
        "Error adding contract:",
        error,
      );

      throw error;
    }
  };

  // =========================================================
  // UPDATE CONTRACT
  // =========================================================

  const updateContract = async (
    updatedContract,
  ) => {
    try {
      const response = await fetch(
        `${API_BASE}/contracts/${updatedContract.id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(
            updatedContract,
          ),
        },
      );

      if (!response.ok) {
        throw new Error(
          `Failed to update contract: ${response.status}`,
        );
      }

      const savedContract =
        await response.json();

      setContracts((previousContracts) =>
        previousContracts.map((contract) =>
          String(contract.id) ===
          String(savedContract.id)
            ? savedContract
            : contract,
        ),
      );

      return savedContract;
    } catch (error) {
      console.error(
        "Error updating contract:",
        error,
      );

      throw error;
    }
  };

  // =========================================================
  // CONTRACT DELETE BUSINESS RULE
  // =========================================================

  /*
    Contracts cannot be deleted.

    This applies to:
    - Active contracts
    - Expiring Soon contracts
    - Expired contracts

    Contracts are retained as historical
    business records.

    Therefore RenewTrack intentionally does
    NOT have a deleteContract function.
  */

  // =========================================================
  // ROUTES
  // =========================================================

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* =================================================
              PUBLIC ROUTES
              ================================================= */}

          {/* Login does NOT require authentication. */}
          <Route
            path="/login"
            element={<LoginPage />}
          />

          {/* =================================================
              HOME
              ================================================= */}

          {/* Visiting "/" sends the user to Dashboard.

              ProtectedRoute will then decide whether
              the user can access Dashboard or should
              be redirected to Login.
          */}
          <Route
            path="/"
            element={
              <Navigate
                to="/dashboard"
                replace
              />
            }
          />

          {/* =================================================
              PROTECTED ROUTES
              ================================================= */}

          {/* Everything inside this route requires
              a logged-in user.
          */}
          <Route element={<ProtectedRoute />}>
            {/* ===============================================
                ROOT LAYOUT
                =============================================== */}

            {/* Sidebar and user bar stay visible for
                all protected pages.
            */}
            <Route element={<RootLayout />}>
              {/* =============================================
                  DASHBOARD
                  ============================================= */}

              <Route
                path="/dashboard"
                element={
                  <DashboardPage
                    customers={customers}
                    contracts={contracts}
                  />
                }
              />

              {/* =============================================
                  REPORTS
                  ============================================= */}

              <Route
                path="/reports"
                element={
                  <ReportsPage
                    contracts={contracts}
                  />
                }
              />

              {/* =============================================
                  CUSTOMERS
                  ============================================= */}

              <Route
                path="/customers"
                element={
                  <CustomersPage
                    customers={customers}
                    contracts={contracts}
                    deleteCustomer={
                      deleteCustomer
                    }
                    loading={
                      customersLoading
                    }
                    error={customersError}
                  />
                }
              />

              {/* =============================================
                  ADD CUSTOMER
                  ============================================= */}

              <Route
                path="/customers/new"
                element={
                  <NewCustomerPage
                    addCustomer={addCustomer}
                  />
                }
              />

              {/* =============================================
                  VIEW CUSTOMER
                  ============================================= */}

              <Route
                path="/customers/:customerId"
                element={
                  <CustomerDetailPage
                    customers={customers}
                    contracts={contracts}
                  />
                }
              />

              {/* =============================================
                  EDIT CUSTOMER
                  ============================================= */}

              <Route
                path="/customers/:customerId/edit"
                element={
                  <EditCustomerPage
                    customers={customers}
                    updateCustomer={
                      updateCustomer
                    }
                  />
                }
              />

              {/* =============================================
                  CONTRACTS
                  ============================================= */}

              <Route
                path="/contracts"
                element={
                  <ContractsPage
                    contracts={contracts}
                    loading={
                      contractsLoading
                    }
                    error={contractsError}
                  />
                }
              />

              {/* =============================================
                  ADD CONTRACT
                  ============================================= */}

              <Route
                path="/contracts/new"
                element={
                  <NewContractPage
                    addContract={addContract}
                    customers={customers}
                  />
                }
              />

              {/* =============================================
                  VIEW CONTRACT
                  ============================================= */}

              <Route
                path="/contracts/:contractId"
                element={
                  <ContractDetailPage
                    contracts={contracts}
                  />
                }
              />

              {/* =============================================
                  EDIT CONTRACT
                  ============================================= */}

              <Route
                path="/contracts/:contractId/edit"
                element={
                  <EditContractPage
                    contracts={contracts}
                    customers={customers}
                    updateContract={
                      updateContract
                    }
                  />
                }
              />
            </Route>
          </Route>

          {/* =================================================
              UNKNOWN ROUTE
              ================================================= */}

          {/* Any unknown URL returns to Dashboard. */}
          <Route
            path="*"
            element={
              <Navigate
                to="/dashboard"
                replace
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

// =========================================================
// EXPORT
// =========================================================

export default App;