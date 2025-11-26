import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import CarritoProvider from "./components/context/CarritoContext.jsx";
import { AuthProvider } from "./components/context/AuthContext.jsx";

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <AuthProvider>
      <Router>
        <CarritoProvider>
          <App />
        </CarritoProvider>
      </Router>
    </AuthProvider>
  </StrictMode>
);
