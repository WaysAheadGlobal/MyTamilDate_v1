import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AppContextProvider } from "./Context/UseContext";
import UserProfileProvider from "./components/userflow/components/context/UserProfileContext";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google"


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId={process.env.REACT_APP_GCID}>
    <React.StrictMode>
      <AppContextProvider>
        <UserProfileProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </UserProfileProvider>
      </AppContextProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);
