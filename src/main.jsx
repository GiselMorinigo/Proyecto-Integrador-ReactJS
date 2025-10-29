import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/style.css";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import CarritoProvider from "./components/context/CarritoContext.jsx";

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <Router>
      <CarritoProvider>
        <App />
      </CarritoProvider>
    </Router>
  </StrictMode>
);
