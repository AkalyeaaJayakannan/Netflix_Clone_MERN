import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { AuthContextProvider } from "./authContext/AuthContext";
import { UserContextProvider } from "./userContext/UserContext";

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
