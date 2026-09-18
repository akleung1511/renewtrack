// LoginPage.jsx
// This page provides the demo login screen for RenewTrack.

// =========================================================
// IMPORTS
// =========================================================

import {
  useContext,
  useState,
} from "react";

import {
  Navigate,
  useNavigate,
} from "react-router-dom";

import AuthContext from "../context/authContext.js";

// =========================================================
// LOGIN PAGE COMPONENT
// =========================================================

function LoginPage() {
  // =========================================================
  // AUTHENTICATION
  // =========================================================

  // Get the current user and login function
  // from AuthContext.
  const {
    user,
    login,
  } = useContext(AuthContext);

  // =========================================================
  // NAVIGATION
  // =========================================================

  const navigate = useNavigate();

  // =========================================================
  // FORM STATE
  // =========================================================

  // Store the email entered by the user.
  const [email, setEmail] = useState("");

  // Store the password entered by the user.
  const [password, setPassword] = useState("");

  // Store validation/login errors.
  const [error, setError] = useState("");

  // =========================================================
  // HANDLE EMAIL CHANGE
  // =========================================================

  const handleEmailChange = (event) => {
    setEmail(event.target.value);

    // Clear previous error when the user
    // starts correcting the form.
    setError("");
  };

  // =========================================================
  // HANDLE PASSWORD CHANGE
  // =========================================================

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);

    // Clear previous error when the user
    // starts correcting the form.
    setError("");
  };

  // =========================================================
  // HANDLE LOGIN
  // =========================================================

  const handleSubmit = (event) => {
    // Prevent browser refresh.
    event.preventDefault();

    // Remove accidental spaces around the email.
    const cleanEmail = email.trim();

    // =======================================================
    // CHECK EMAIL
    // =======================================================

    if (!cleanEmail) {
      setError("Email is required.");
      return;
    }

    // Simple email-format validation.
    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(cleanEmail)) {
      setError(
        "Please enter a valid email address.",
      );

      return;
    }

    // =======================================================
    // CHECK PASSWORD
    // =======================================================

    if (!password) {
      setError("Password is required.");
      return;
    }

    // =======================================================
    // ATTEMPT LOGIN
    // =======================================================

    // AuthContext checks whether the password
    // matches the demo password.
    const loginSuccessful = login(
      cleanEmail,
      password,
    );

    // If the password is incorrect,
    // remain on the Login page.
    if (!loginSuccessful) {
      setError("Incorrect password.");
      return;
    }

    // =======================================================
    // LOGIN SUCCESSFUL
    // =======================================================

    navigate("/dashboard");
  };

  // =========================================================
  // ALREADY LOGGED IN
  // =========================================================

  // If a logged-in user manually visits /login,
  // redirect them to Dashboard.
  if (user) {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }

  // =========================================================
  // DISPLAY LOGIN PAGE
  // =========================================================

  return (
    <main className="login-page">
      <div className="login-card">
        {/* ===================================================
            APPLICATION HEADER
            =================================================== */}

        <h1>RenewTrack</h1>

        <p>Contract Renewal CRM</p>

        <h2>Login</h2>

        <p>
          Sign in to access your dashboard.
        </p>

        {/* ===================================================
            LOGIN FORM
            =================================================== */}

        <form
          onSubmit={handleSubmit}
          noValidate
        >
          {/* =================================================
              EMAIL
              ================================================= */}

          <div className="form-group">
            <label htmlFor="email">
              Email
            </label>

            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="e.g. user@company.com"
              autoComplete="email"
            />
          </div>

          {/* =================================================
              PASSWORD
              ================================================= */}

          <div className="form-group">
            <label htmlFor="password">
              Password
            </label>

            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter password"
              autoComplete="current-password"
            />
          </div>

          {/* =================================================
              ERROR MESSAGE
              ================================================= */}

          {error && (
            <p className="form-error">
              {error}
            </p>
          )}

          {/* =================================================
              LOGIN BUTTON
              ================================================= */}

          <button
            type="submit"
            className="submit-button"
          >
            Login
          </button>
        </form>

        {/* ===================================================
            DEMO INFORMATION
            =================================================== */}

        <p className="login-note">
          Demo login: use any valid email address
          with password 1234.
        </p>
      </div>
    </main>
  );
}

// =========================================================
// EXPORT
// =========================================================

export default LoginPage;