import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { AuthContextProvider } from "./authContext/AuthContext";
import { UserContextProvider } from "./userContext/UserContext";

<meta
  name="google-site-verification"
  content="iTpcJRG6BQHt5RY5FiTK6yeBbmxG9aMBf-BKA5Se8Vg"
/>;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
