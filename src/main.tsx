import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import { AppProvider } from "./state/AppContext";
import { AuthProvider } from "./auth/AuthContext";

import "./index.css";
import "leaflet/dist/leaflet.css";

ReactDOM.createRoot(
    document.getElementById("root")!
).render(
    <React.StrictMode>
        <BrowserRouter>
            <AppProvider>
                <AuthProvider>
                    <App />
                </AuthProvider>
            </AppProvider>
        </BrowserRouter>
    </React.StrictMode>
);