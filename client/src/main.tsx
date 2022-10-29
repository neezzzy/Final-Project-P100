import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_DOMAIN}
      clientId={import.meta.env.VITE_CLIENT_ID}
      redirectUri={window.location.origin}
      // audience={import.meta.env.VITE_AUDIENCE}
      // scope="openid profile email"
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>
);
