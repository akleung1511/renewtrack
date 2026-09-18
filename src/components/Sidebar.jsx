// Sidebar.jsx
// This is the reusable navigation sidebar for RenewTrack.

// =========================================================
// IMPORTS
// =========================================================

// NavLink comes from React Router.
//
// Unlike a normal <a> tag, NavLink allows us to
// navigate without refreshing the whole application.
//
// NavLink can also automatically identify
// which page is currently active.
import { NavLink } from "react-router-dom";

// =========================================================
// SIDEBAR COMPONENT
// =========================================================

function Sidebar() {
  return (
    // <aside> is appropriate for sidebar
    // and navigation content.
    <aside>
      {/* =====================================================
          APPLICATION BRANDING
          ===================================================== */}

      <div>
        <h2>RenewTrack</h2>

        <p>Contract Renewal CRM</p>
      </div>

      {/* =====================================================
          MAIN NAVIGATION
          ===================================================== */}

      <nav>
        {/* ===================================================
            DASHBOARD
            =================================================== */}

        <NavLink to="/dashboard">
          Dashboard
        </NavLink>

        {/* ===================================================
            CUSTOMERS
            =================================================== */}

        <NavLink to="/customers">
          Customers
        </NavLink>

        {/* ===================================================
            CONTRACTS
            =================================================== */}

        <NavLink to="/contracts">
          Contracts
        </NavLink>

        {/* ===================================================
            REPORTS
            =================================================== */}

        <NavLink to="/reports">
          Reports
        </NavLink>
      </nav>
    </aside>
  );
}

// =========================================================
// EXPORT
// =========================================================

export default Sidebar;