import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav style={{ backgroundColor: "#333", color: "white", padding: "10px" }}>
      <ul
        style={{
          listStyle: "none",
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <li>
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            Inicio
          </Link>
        </li>
        <li>
          <Link
            to="/productos"
            style={{ textDecoration: "none", color: "white" }}
          >
            Productos
          </Link>
        </li>
        <li>
          <Link
            to="/sobre-nosotros"
            style={{ textDecoration: "none", color: "white" }}
          >
            Sobre Nosotros
          </Link>
        </li>
        <li>
          <Link
            to="/contacto"
            style={{ textDecoration: "none", color: "white" }}
          >
            Contacto
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
