import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";

const ProductoDetalle = () => {
  const { id } = useParams();
  const [detalleProducto, setDetalleProducto] = useState({});
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((response) => response.json())
      .then((datos) => {
        setDetalleProducto(datos);
        setCargando(false);
      })
      .catch(() => {
        setError("Error al cargar producto.");
        setCargando(false);
      });
  }, [id]);

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
          <Spinner /> Cargando producto...
        </div>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <div style={{ height: "100vh" }}>
          <h1>DETALLE DEL PRODUCTO</h1>
          <div style={{ marginRight: "50%" }}>
            <img
              src={detalleProducto.image}
              alt="imagen-producto"
              style={{ maxWidth: "20%", margin: "10px 0" }}
            />
            <h3>{detalleProducto.title}</h3>
            <p>Descripción: {detalleProducto.description}</p>
            <h3>Precio: ${detalleProducto.price}</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductoDetalle;
