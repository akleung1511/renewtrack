// App.jsx
// GitHub Pages deployment version of RenewTrack.
//
// This version uses localStorage instead of json-server.
// This allows RenewTrack to run on GitHub Pages without
// requiring a backend server.

// =========================================================
// IMPORTS
// =========================================================

import { useEffect, useState } from "react";

import {
  HashRouter,
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

import LoginPage from "./pages/LoginPage.jsx";

import DashboardPage from "./pages/DashboardPage.jsx";
import ReportsPage from "./pages/ReportsPage.jsx";

import CustomersPage from "./pages/CustomersPage.jsx";
import NewCustomerPage from "./pages/NewCustomerPage.jsx";
import CustomerDetailPage from "./pages/CustomerDetailPage.jsx";
import EditCustomerPage from "./pages/EditCustomerPage.jsx";

import ContractsPage from "./pages/ContractsPage.jsx";
import NewContractPage from "./pages/NewContractPage.jsx";
import ContractDetailPage from "./pages/ContractDetailPage.jsx";
import EditContractPage from "./pages/EditContractPage.jsx";

// =========================================================
// LOCAL STORAGE KEYS
// =========================================================

const CUSTOMERS_STORAGE_KEY = "renewtrack-customers";
const CONTRACTS_STORAGE_KEY = "renewtrack-contracts";

// =========================================================
// INITIAL CUSTOMER DATA
// =========================================================

// These customers appear when RenewTrack is opened
// for the first time in a browser.
//
// After that, changes are saved in localStorage.

const initialCustomers = [
  {
    id: "1",
    companyName: "ABC Pte Ltd",
    contactPerson: "John Tan",
    email: "john.tan@abc.com",
    phone: "+65 6123 4567",
  },
  {
    id: "2",
    companyName: "XYZ Engineering",
    contactPerson: "Sarah Lim",
    email: "sarah.lim@xyz.com",
    phone: "+65 6234 5678",
  },
  {
    id: "3",
    companyName: "DEF Solutions",
    contactPerson: "Michael Lee",
    email: "michael.lee@def.com",
    phone: "+65 6345 6789",
  },
  {
    id: "4",
    companyName: "Sunrise Trading Pte Ltd",
    contactPerson: "Emily Wong",
    email: "emily.wong@sunrise.com",
    phone: "+65 6456 7890",
  },
];

// =========================================================
// INITIAL CONTRACT DATA
// =========================================================

const initialContracts = [
  {
    id: "1",
    customerId: "1",
    customer: "ABC Pte Ltd",
    contractName: "IT Maintenance Contract",
    startDate: "2026-01-01",
    expiryDate: "2026-12-31",
    value: 24000,
    status: "Active",
  },
  {
    id: "2",
    customerId: "2",
    customer: "XYZ Engineering",
    contractName: "Software Support Contract",
    startDate: "2026-01-15",
    expiryDate: "2027-01-15",
    value: 18000,
    status: "Expiring Soon",
  },
  {
    id: "3",
    customerId: "3",
    customer: "DEF Solutions",
    contractName: "Equipment Maintenance Contract",
    startDate: "2026-03-01",
    expiryDate: "2027-02-28",
    value: 32000,
    status: "Active",
  },
  {
    id: "4",
    customerId: "4",
    customer: "Sunrise Trading Pte Ltd",
    contractName: "Network Support Contract",
    startDate: "2025-07-01",
    expiryDate: "2026-06-30",
    value: 12000,
    status: "Expired",
  },
];

// =========================================================
// CREATE UNIQUE ID
// =========================================================

// json-server previously generated IDs for us.
//
// Because the deployment version does not use json-server,
// we create an ID ourselves.

const createId = () =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

// =========================================================
// LOAD DATA FROM LOCAL STORAGE
// =========================================================

const loadStoredData = (key, initialData) => {
  try {
    // Look for previously saved data.
    const storedData = localStorage.getItem(key);

    // If nothing has been saved yet,
    // use the initial sample data.
    if (!storedData) {
      return initialData;
    }

    // Convert the saved JSON string back into an array.
    return JSON.parse(storedData);
  } catch (error) {
    console.error(
      `Unable to load ${key} from localStorage:`,
      error,
    );

    // If something is wrong with localStorage,
    // fall back to the initial data.
    return initialData;
  }
};

// =========================================================
// APP COMPONENT
// =========================================================

function App() {
  // =========================================================
  // CUSTOMER STATE
  // =========================================================

  const [customers, setCustomers] = useState(() =>
    loadStoredData(
      CUSTOMERS_STORAGE_KEY,
      initialCustomers,
    ),
  );

  // =========================================================
  // CONTRACT STATE
  // =========================================================

  const [contracts, setContracts] = useState(() =>
    loadStoredData(
      CONTRACTS_STORAGE_KEY,
      initialContracts,
    ),
  );

  // =========================================================
  // SAVE CUSTOMERS TO LOCAL STORAGE
  // =========================================================

  // Whenever the customers array changes,
  // save the new version into the browser.

  useEffect(() => {
    localStorage.setItem(
      CUSTOMERS_STORAGE_KEY,
      JSON.stringify(customers),
    );
  }, [customers]);

  // =========================================================
  // SAVE CONTRACTS TO LOCAL STORAGE
  // =========================================================

  useEffect(() => {
    localStorage.setItem(
      CONTRACTS_STORAGE_KEY,
      JSON.stringify(contracts),
    );
  }, [contracts]);

  // =========================================================
  // ADD CUSTOMER
  // =========================================================

  const addCustomer = async (newCustomer) => {
    const savedCustomer = {
      ...newCustomer,
      id: createId(),
    };

    setCustomers((previousCustomers) => [
      ...previousCustomers,
      savedCustomer,
    ]);

    return savedCustomer;
  };

  // =========================================================
  // UPDATE CUSTOMER
  // =========================================================

  const updateCustomer = async (updatedCustomer) => {
    // Update the customer record.
    setCustomers((previousCustomers) =>
      previousCustomers.map((customer) =>
        String(customer.id) ===
        String(updatedCustomer.id)
          ? updatedCustomer
          : customer,
      ),
    );

    // =======================================================
    // UPDATE CUSTOMER NAME INSIDE CONTRACTS
    // =======================================================

    // Contracts also store the customer's company name.
    //
    // If the company name changes, update any contracts
    // belonging to that customer.

    setContracts((previousContracts) =>
      previousContracts.map((contract) =>
        String(contract.customerId) ===
        String(updatedCustomer.id)
          ? {
              ...contract,
              customer: updatedCustomer.companyName,
            }
          : contract,
      ),
    );

    return updatedCustomer;
  };

  // =========================================================
  // DELETE CUSTOMER
  // =========================================================

  // BUSINESS RULE:
  //
  // A customer can only be deleted if that customer
  // has no contracts.

  const deleteCustomer = async (customerId) => {
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

    setCustomers((previousCustomers) =>
      previousCustomers.filter(
        (customer) =>
          String(customer.id) !==
          String(customerId),
      ),
    );
  };

  // =========================================================
  // ADD CONTRACT
  // =========================================================

  const addContract = async (newContract) => {
    const savedContract = {
      ...newContract,
      id: createId(),
    };

    setContracts((previousContracts) => [
      ...previousContracts,
      savedContract,
    ]);

    return savedContract;
  };

  // =========================================================
  // UPDATE CONTRACT
  // =========================================================

  const updateContract = async (updatedContract) => {
    setContracts((previousContracts) =>
      previousContracts.map((contract) =>
        String(contract.id) ===
        String(updatedContract.id)
          ? updatedContract
          : contract,
      ),
    );

    return updatedContract;
  };

  // =========================================================
  // CONTRACT DELETE BUSINESS RULE
  // =========================================================

  /*
    RenewTrack intentionally does not allow
    contracts to be deleted.

    Active, Expiring Soon and Expired contracts
    are retained as historical business records.

    Therefore there is no deleteContract function.
  */

  // =========================================================
  // ROUTES
  // =========================================================

  return (
    <AuthProvider>
      {/* HashRouter is used because this deployment
          will be hosted using GitHub Pages. */}

      <HashRouter>
        <Routes>
          {/* =================================================
              LOGIN
              ================================================= */}

          <Route
            path="/login"
            element={<LoginPage />}
          />

          {/* =================================================
              HOME
              ================================================= */}

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

          <Route element={<ProtectedRoute />}>
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
                    loading={false}
                    error={null}
                  />
                }
              />

              {/* ADD CUSTOMER */}

              <Route
                path="/customers/new"
                element={
                  <NewCustomerPage
                    addCustomer={addCustomer}
                  />
                }
              />

              {/* VIEW CUSTOMER */}

              <Route
                path="/customers/:customerId"
                element={
                  <CustomerDetailPage
                    customers={customers}
                    contracts={contracts}
                  />
                }
              />

              {/* EDIT CUSTOMER */}

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
                    loading={false}
                    error={null}
                  />
                }
              />

              {/* ADD CONTRACT */}

              <Route
                path="/contracts/new"
                element={
                  <NewContractPage
                    addContract={addContract}
                    customers={customers}
                  />
                }
              />

              {/* VIEW CONTRACT */}

              <Route
                path="/contracts/:contractId"
                element={
                  <ContractDetailPage
                    contracts={contracts}
                  />
                }
              />

              {/* EDIT CONTRACT */}

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
      </HashRouter>
    </AuthProvider>
  );
}

// =========================================================
// EXPORT
// =========================================================

export default App;