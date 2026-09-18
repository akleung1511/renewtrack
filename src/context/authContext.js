// authContext.js
// This file creates the authentication context for RenewTrack.

import { createContext } from "react";

// null is the default value before AuthProvider
// supplies the real authentication data.
const AuthContext = createContext(null);

export default AuthContext;
