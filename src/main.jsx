import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import CarritoProvider from "./components/context/CarritoContext.jsx";
import { AuthProvider } from "./components/context/AuthContext.jsx";
import "./assets/css/index.css";
import { HelmetProvider } from "react-helmet-async";
import { SearchProvider } from "./components/context/SearchContext.jsx";

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <SearchProvider>
      <HelmetProvider>
        <AuthProvider>
          <Router>
            <CarritoProvider>
              <App />
            </CarritoProvider>
          </Router>
        </AuthProvider>
      </HelmetProvider>
    </SearchProvider>
  </StrictMode>
);
