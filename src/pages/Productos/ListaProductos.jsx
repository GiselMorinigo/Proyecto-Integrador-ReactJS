import { useContext, useEffect, useState } from "react";
import { Card, Col, Row, Spinner } from "react-bootstrap";
import { CarritoContext } from "../../components/context/CarritoContext";
import "../../assets/css/carrito.css";

const ListaProductos = () => {
  const { renderBotonCarrito, verDetalle } = useContext(CarritoContext);

  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
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

  return (
    <div style={{ padding: "20px" }}>
      <h1>Productos</h1>
      <div style={{ display: "flex", padding: "10px 0" }}>
        {cargando ? (
          <div style={{ justifyContent: "center", margin: "auto" }}>
            <Spinner animation="border" /> Cargando Productos...
          </div>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
          <Row xs={2} md={4} className="g-4">
            {productos.map((prod) => (
              <Col key={prod.id}>
                <Card
                  style={{
                    height: "350px",
                    maxWidth: "300px",
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={prod.image}
                    alt="imagen-producto"
                    onClick={() => verDetalle(prod.id)}
                    style={{
                      height: "150px",
                      objectFit: "contain",
                      padding: "10px",
                      cursor: "pointer",
                    }}
                  />
                  <Card.Body>
                    <Card.Title
                      style={{
                        fontSize: "1rem",
                        overflow: "hidden",
                        height: "3.5em",
                      }}
                    >
                      {prod.title}
                    </Card.Title>
                    <Card.Text>${prod.price}</Card.Text>
                    {renderBotonCarrito(prod)}
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
};

export default ListaProductos;
