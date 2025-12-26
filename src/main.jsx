import React from "react";
import ReactDOM from "react-dom/client";

import "./style.css";

import App from "./App";
import CustomerContextProvider from "./contexts/CustomerContext";
import AccountContextProvider from "./contexts/AccountContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CustomerContextProvider>
      <AccountContextProvider>
        <App />
      </AccountContextProvider>
    </CustomerContextProvider>
  </React.StrictMode>
);
