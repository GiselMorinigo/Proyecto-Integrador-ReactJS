import React, { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { BsCartPlus } from "react-icons/bs";
import Carrito from "../Carrito/Carrito";

const ListaProductos = () => {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://68d41a53214be68f8c68683d.mockapi.io/api/productos")
      .then((response) => response.json())
      .then((datos) => {
        setProductos(datos);
        setCargando(false);
      })
      .catch(() => {
        setError("Error al cargar productos");
        setCargando(false);
      });
  }, []);

  const agregarProducto = (prod) => {
    const existeProd = carrito.find((p) => p.id === prod.id);

    if (existeProd) {
      setCarrito(
        carrito.map((p) => (p.id === prod.id ? { ...p, cant: p.cant + 1 } : p))
      );
    } else {
      setCarrito([...carrito, { ...prod, cant: 1 }]);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h1>Productos</h1>
      <div style={{ display: "flex", padding: "10px 0" }}>
        {cargando ? (
          <div style={{ justifyContent: "center", margin: "auto" }}>
            <Spinner /> Cargando productos...
          </div>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
          productos.map((prod) => (
            <ul key={prod.id} style={{ listStyle: "none" }}>
              <li>
                {" "}
                {prod.nombre}{" "}
                <Button size="sm" onClick={() => agregarProducto(prod)}>
                  <BsCartPlus />
                </Button>
              </li>
            </ul>
          ))
        )}
      </div>

      <div>
        <Carrito carrito={carrito} />

        {carrito.length > 0 && (
          <Button onClick={() => setCarrito([])}>Vaciar carrito</Button>
        )}
      </div>
    </div>
  );
};

export default ListaProductos;
