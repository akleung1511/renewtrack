// Import StrictMode from React.
// StrictMode helps identify potential problems during development.
import { StrictMode } from "react";

// ReactDOM connects our React application to the browser.
import { createRoot } from "react-dom/client";

// Import our global CSS.
import "./index.css";

// Import the main App component.
import App from "./App.jsx";

// Find <div id="root"> in index.html
// and render our React application inside it.
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);