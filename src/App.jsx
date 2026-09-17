// App.jsx
// This file defines the routes for the RenewTrack application.

// Import the React Router components we need.
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Import the shared layout.
// RootLayout contains our Sidebar and <Outlet />.
import RootLayout from "./layouts/RootLayout.jsx";

// Import our page components.
import DashboardPage from "./pages/DashboardPage.jsx";
import CustomersPage from "./pages/CustomersPage.jsx";
import ContractsPage from "./pages/ContractsPage.jsx";

function App() {
  return (
    // BrowserRouter enables routing in the application.
    <BrowserRouter>

      {/* Routes contains all routes in RenewTrack. */}
      <Routes>

        {/* If the user visits "/", redirect to "/dashboard". */}
        <Route
          path="/"
          element={<Navigate to="/dashboard" replace />}
        />

        {/* RootLayout is the shared layout for the CRM pages.
            It contains:
            - Sidebar
            - Outlet

            The child routes below will appear inside <Outlet />.
        */}
        <Route element={<RootLayout />}>

          {/* Dashboard route */}
          <Route
            path="/dashboard"
            element={<DashboardPage />}
          />

          {/* Customers route */}
          <Route
            path="/customers"
            element={<CustomersPage />}
          />

          {/* Contracts route */}
          <Route
            path="/contracts"
            element={<ContractsPage />}
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

// Export App so main.jsx can render it.
export default App;