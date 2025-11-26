import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";

const formatearARS = (v) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
  }).format(v);

const ProductoDetalle = () => {
  const { id } = useParams();
  const [detalleProducto, setDetalleProducto] = useState({});
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://68d41a53214be68f8c68683d.mockapi.io/api/productos/${id}`)
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
              src={detalleProducto.imagen}
              alt="imagen-producto"
              style={{ maxWidth: "20%", margin: "10px 0" }}
            />
            <h3>{detalleProducto.nombre}</h3>
            <p>Descripción: {detalleProducto.descripcion}</p>
            <h3>Precio: {formatearARS(detalleProducto.precio)}</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductoDetalle;
