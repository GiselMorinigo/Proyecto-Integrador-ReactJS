import { useContext, useEffect, useState } from "react";
import {
  Accordion,
  Badge,
  Button,
  Col,
  Container,
  Image,
  Row,
  Spinner,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { CarritoContext } from "../../components/context/CarritoContext";

const API = "https://68d41a53214be68f8c68683d.mockapi.io/api/productos";

const formatearARS = (v) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
  }).format(v);

const formatCategoria = (cat) => {
  if (!cat) return "";
  const categoria = cat.toLowerCase();
  if (categoria === "ninos") return "Niño/a";
  if (categoria === "mujer") return "Mujer";
  if (categoria === "hombre") return "Hombre";
  return categoria.charAt(0).toUpperCase() + categoria.slice(1);
};

const SIZES = ["XS", "S", "M", "L", "XL"];

const ProductoDetalle = () => {
  const { id } = useParams();
  const { agregarProducto } = useContext(CarritoContext);

  const [detalleProducto, setDetalleProducto] = useState({});
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [sizeError, setSizeError] = useState(false);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        setCargando(true);
        const res = await fetch(`${API}/${id}`);
        const data = await res.json();
        setDetalleProducto(data);
      } catch (error) {
        setError("Error al cargar el producto:", error.message);
      } finally {
        setCargando(false);
      }
    };
    fetchProducto();
  }, [id]);

  const AgregarCarrito = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }

    setSizeError(false);
    agregarProducto({ ...detalleProducto, talle: selectedSize });
  };

  if (cargando) {
    return (
      <div className="d-flex align-items-center justify-content-center py-5">
        <Spinner /> <span className="ms-2">Cargando producto...</span>
      </div>
    );
  }

  if (error || !detalleProducto)
    return <p className="text-danger">{error ?? "Producto no disponible."}</p>;

  return (
    <Container className="py-4">
      <Row className="g-4">
        <Col xs={12} md={7}>
          <div className="p-3 bg-white border rounded-3 d-flex align-items-center justify-content-center">
            <Image
              src={detalleProducto.imagen}
              alt={detalleProducto.nombre}
              fluid
              style={{ maxHeight: 520, objectFit: "contain" }}
            />
          </div>
        </Col>

        <Col xs={12} md={5}>
          {detalleProducto.categoria && (
            <Badge bg="light" text="dark" className="mb-2 border">
              {formatCategoria(detalleProducto.categoria)}
            </Badge>
          )}
          <h2 className="mb-2"> {detalleProducto.nombre} </h2>
          {detalleProducto.subtitulo && (
            <p className="text-muted mb-3">{detalleProducto.subtitulo}</p>
          )}
          <h4 className="mb-3">{formatearARS(detalleProducto.precio)}</h4>

          <div className="mb-4">
            <p className="fw-semibold mb-2">Seleccionar Talle</p>
            <div className="d-flex flex-wrap gap-2">
              {SIZES.map((size) => {
                const active = selectedSize === size;
                return (
                  <Button
                    key={size}
                    type="button"
                    className={`size-chip ${active ? "active" : ""}`}
                    onClick={() => {
                      setSelectedSize(size);
                      setSizeError(false);
                    }}
                    aria-pressed={selectedSize === size}
                  >
                    {size}
                  </Button>
                );
              })}
            </div>
            {sizeError && (
              <p className="text-danger mt-2">
                Elija un talle antes de continuar.
              </p>
            )}
          </div>

          <div className="mb-4">
            <p className="mb-1 fw-semibold">Descripción</p>
            <p className="text-secondary mb-0" style={{ lineHeight: 1.6 }}>
              {detalleProducto.descripcion}
            </p>
          </div>

          <div className="d-grid">
            <Button size="lg" onClick={AgregarCarrito}>
              Agregar al carrito
            </Button>
          </div>

          <Accordion flush className="mt-3">
            <Accordion.Item eventKey="metodos">
              <Accordion.Header>Métodos de pago</Accordion.Header>
              <Accordion.Body>
                Aceptamos las siguientes opciones de pago:
                <ul className="mt-2 mb-0">
                  <li>Tarjetas de Crédito</li>
                  <li>Tarjetas de Débito</li>
                  <li>Mercado Pago</li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductoDetalle;
