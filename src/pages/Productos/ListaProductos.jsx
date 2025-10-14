import { useEffect, useState } from "react";
import { Button, Card, Col, Row, Spinner } from "react-bootstrap";
import { BsCartPlus } from "react-icons/bs";
import Carrito from "../Carrito/Carrito";
import { useNavigate } from "react-router-dom";

const ListaProductos = () => {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  const verDetalle = (id) => {
    navigate(`/productos/${id}`);
  };

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
                    <Button onClick={() => agregarProducto(prod)}>
                      <BsCartPlus /> Agregar al carrito
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>

      <hr />

      <div>
        <Carrito carrito={carrito} setCarrito={setCarrito} />

        {carrito.length > 0 && (
          <Button onClick={() => setCarrito([])}>Vaciar carrito</Button>
        )}
      </div>
    </div>
  );
};

export default ListaProductos;
