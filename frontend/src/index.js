import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AppContextProvider } from "./Context/UseContext";
import UserProfileProvider from "./components/userflow/components/context/UserProfileContext";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppContextProvider>
      <UserProfileProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UserProfileProvider>
    </AppContextProvider>
  </React.StrictMode>
);
