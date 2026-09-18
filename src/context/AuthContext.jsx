// AuthContext.jsx
// This component provides authentication state
// to the RenewTrack application.

// =========================================================
// IMPORTS
// =========================================================

import { useState } from "react";

import AuthContext from "./authContext.js";

// =========================================================
// AUTH PROVIDER
// =========================================================

function AuthProvider({ children }) {
  // =========================================================
  // USER STATE
  // =========================================================

  // null means nobody is currently logged in.
  const [user, setUser] = useState(null);

  // =========================================================
  // LOGIN
  // =========================================================

  // This is simulated front-end authentication
  // for the Module 2 project.
  //
  // Any valid email address can be used,
  // but the demo password must be "1234".
  //
  // IMPORTANT:
  // This is NOT production authentication because
  // the password exists inside the front-end code.
  const login = (email, password) => {
    // =======================================================
    // CHECK DEMO PASSWORD
    // =======================================================

    if (password !== "1234") {
      // Login failed.
      return false;
    }

    // =======================================================
    // CREATE LOGGED-IN USER
    // =======================================================

    const loggedInUser = {
      email,
      name: "RenewTrack User",
    };

    // Store the logged-in user.
    setUser(loggedInUser);

    // Tell LoginPage that login succeeded.
    return true;
  };

  // =========================================================
  // LOGOUT
  // =========================================================

  const logout = () => {
    // Remove the current user.
    setUser(null);
  };

  // =========================================================
  // CONTEXT VALUE
  // =========================================================

  const authValue = {
    user,
    login,
    logout,
  };

  // =========================================================
  // PROVIDER
  // =========================================================

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
}

// =========================================================
// EXPORT
// =========================================================

// This file exports only the AuthProvider component.
// The AuthContext object is stored separately in
// authContext.js.
export default AuthProvider;