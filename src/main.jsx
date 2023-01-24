import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./hooks/useAuth";
import { CustomerProvider } from "./hooks/useCustomer";
import { OrderProvider } from "./hooks/useOrder";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <BrowserRouter>
      <AuthProvider>
        <CustomerProvider>
          <OrderProvider>
            <App />
          </OrderProvider>
        </CustomerProvider>
      </AuthProvider>
    </BrowserRouter>
  </>
);
//  nvm use 14.18.0
//  yarn create vite
