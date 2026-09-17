// Sidebar.jsx
// This is a reusable navigation component for RenewTrack.

// NavLink comes from React Router.
// It allows us to navigate without refreshing the whole webpage.
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    // <aside> is suitable for sidebar/navigation content.
    <aside>
      
      {/* RenewTrack application name */}
      <div>
        <h2>RenewTrack</h2>
        <p>Contract Renewal CRM</p>
      </div>

      {/* Main navigation links */}
      <nav>

        {/* Clicking this link takes the user to /dashboard */}
        <NavLink to="/dashboard">
          Dashboard
        </NavLink>

        {/* Clicking this link takes the user to /customers */}
        <NavLink to="/customers">
          Customers
        </NavLink>

        {/* Clicking this link takes the user to /contracts */}
        <NavLink to="/contracts">
          Contracts
        </NavLink>

      </nav>

    </aside>
  );
}

// Export Sidebar so other components can use it.
export default Sidebar;