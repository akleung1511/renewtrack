// ProtectedRoute.jsx
// This component protects pages that should only
// be accessible when a user is logged in.

// =========================================================
// IMPORTS
// =========================================================

import { useContext } from "react";

import {
  Navigate,
  Outlet,
} from "react-router-dom";

import AuthContext from "../context/authContext.js";

// =========================================================
// PROTECTED ROUTE COMPONENT
// =========================================================

function ProtectedRoute() {
  // =========================================================
  // GET CURRENT USER
  // =========================================================

  // Read the authentication information supplied
  // by AuthProvider.
  const { user } = useContext(AuthContext);

  // =========================================================
  // CHECK LOGIN STATUS
  // =========================================================

  // If there is no logged-in user,
  // redirect the visitor to the Login page.
  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  // =========================================================
  // ALLOW ACCESS
  // =========================================================

  // If a user exists, Outlet tells React Router
  // to display the protected child route.
  return <Outlet />;
}

// =========================================================
// EXPORT
// =========================================================

export default ProtectedRoute;