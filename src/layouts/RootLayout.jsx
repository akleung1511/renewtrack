// RootLayout.jsx
// This component provides the common layout used by RenewTrack pages.

// Outlet comes from React Router.
// It represents the location where the selected child page will appear.
import { Outlet } from "react-router-dom";

// Import our reusable Sidebar component.
import Sidebar from "../components/Sidebar.jsx";

function RootLayout() {
  return (
    // This div will eventually control the overall CRM layout.
    <div className="app-layout">

      {/* The Sidebar stays visible while we move between pages. */}
      <Sidebar />

      {/* This area contains the currently selected page. */}
      <div className="page-content">

        {/* Outlet is replaced by the current child route.
            For example:
            /dashboard  -> DashboardPage
            /customers  -> CustomersPage
            /contracts  -> ContractsPage
        */}
        <Outlet />

      </div>

    </div>
  );
}

// Export RootLayout so App.jsx can use it.
export default RootLayout;