// RootLayout.jsx
// This component provides the common layout used
// by all protected RenewTrack pages.

// =========================================================
// IMPORTS
// =========================================================

// useContext lets us access the logged-in user
// and logout function from AuthContext.
import { useContext } from "react";

// Outlet represents the location where the
// selected child route will appear.
//
// useNavigate lets us navigate after logout.
import {
  Outlet,
  useNavigate,
} from "react-router-dom";

// Import our reusable Sidebar component.
import Sidebar from "../components/Sidebar.jsx";

// Import authentication context.
import AuthContext from "../context/authContext.js";

// =========================================================
// ROOT LAYOUT COMPONENT
// =========================================================

function RootLayout() {
  // =========================================================
  // AUTHENTICATION
  // =========================================================

  // Get the logged-in user and logout function
  // from AuthContext.
  const {
    user,
    logout,
  } = useContext(AuthContext);

  // =========================================================
  // NAVIGATION
  // =========================================================

  const navigate = useNavigate();

  // =========================================================
  // LOGOUT
  // =========================================================

  const handleLogout = () => {
    // Remove the logged-in user from AuthContext.
    logout();

    // Return to the Login page.
    navigate("/login");
  };

  // =========================================================
  // DISPLAY LAYOUT
  // =========================================================

  return (
    <div className="app-layout">
      {/* =====================================================
          SIDEBAR
          ===================================================== */}

      <Sidebar />

      {/* =====================================================
          MAIN CONTENT AREA
          ===================================================== */}

      <div className="page-content">
        {/* ===================================================
            USER BAR
            =================================================== */}

        <header className="user-bar">
          <span className="user-email">
            {user?.email}
          </span>

          <button
            type="button"
            className="logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </header>

        {/* ===================================================
            CURRENT PAGE
            =================================================== */}

        {/* Outlet is replaced by the selected child route.

            Examples:

            /dashboard
                -> DashboardPage

            /customers
                -> CustomersPage

            /contracts
                -> ContractsPage
        */}

        <Outlet />
      </div>
    </div>
  );
}

// =========================================================
// EXPORT
// =========================================================

export default RootLayout;