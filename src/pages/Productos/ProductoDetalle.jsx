import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";

const ProductoDetalle = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState({});
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://68d41a53214be68f8c68683d.mockapi.io/api/productos/${id}`)
      .then((response) => response.json())
      .then((datos) => {
        setProducto(datos);
        setCargando(false);
      })
      .catch(() => {
        setError("Error al cargar producto.");
        setCargando(false);
      });
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        padding: "10px",
      }}
    >
      {cargando ? (
        <div style={{ justifyContent: "center", margin: "auto" }}>
          <Spinner /> Cargando productos...
        </div>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <div>
          <h1>DETALLE DEL PRODUCTO</h1>
          <h3>Producto: {producto.nombre}</h3>
          <h3>Precio: ${producto.precio}</h3>
        </div>
      )}
    </div>
  );
};

export default ProductoDetalle;
