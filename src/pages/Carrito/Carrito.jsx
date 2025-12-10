import { useContext, useMemo } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  Image,
  Button,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { CarritoContext } from "../../components/context/CarritoContext";
import { Helmet } from "react-helmet-async";

const formatearARS = (v) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
  }).format(v);

const Carrito = () => {
  const { carrito, eliminarProducto, vaciarCarrito, renderBotonCarrito } =
    useContext(CarritoContext);

  const navigate = useNavigate();

  const subtotal = useMemo(() => {
    return carrito.reduce(
      (acc, p) => acc + (Number(p.precio) || 0) * (p.cant || 1),
      0
    );
  }, [carrito]);

  const handleCheckout = () => {
    if (carrito.length === 0) {
      toast.error("El carrito está vacío");
      return;
    }
    toast.success("Compra realizada con éxito 🎉");
    setTimeout(() => {
      vaciarCarrito();
      navigate("/");
    }, 700);
  };

  return (
    <>
      <Helmet>
        <title>Gérmoni | Carrito de Compras</title>
        <meta
          name="description"
          content="Página del carrito de compras en Gérmoni"
        />
      </Helmet>

      <Container className="py-4">
        {carrito.length === 0 ? (
          <Card className="p-4 text-center">
            <p className="mb-0">No hay productos en el carrito.</p>
          </Card>
        ) : (
          <Row>
            <Col lg={8} className="mb-4">
              <Card className="shadow-sm border-0">
                <ListGroup variant="flush">
                  <ListGroup.Item className="d-none d-lg-flex align-items-center px-4 py-3 text-muted small">
                    <div style={{ flex: 3 }}>Producto</div>
                    <div style={{ flex: 1, textAlign: "center" }}>Precio</div>
                    <div style={{ flex: 2, textAlign: "center" }}>Cantidad</div>
                    <div style={{ flex: 1, textAlign: "center" }}>Subtotal</div>
                    <div style={{ width: 48 }} />
                  </ListGroup.Item>

                  {carrito.map((prod) => (
                    <ListGroup.Item
                      key={prod.id}
                      className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-3 px-4 py-3"
                    >
                      <div
                        style={{ flex: 3 }}
                        className="d-flex align-items-center gap-3"
                      >
                        <div style={{ width: 96, minWidth: 96 }}>
                          <Image
                            src={prod.imagen}
                            alt={prod.nombre}
                            thumbnail
                            style={{
                              width: "96px",
                              height: "96px",
                              objectFit: "cover",
                            }}
                          />
                        </div>

                        <div>
                          <div className="fw-semibold">{prod.nombre}</div>
                          {prod.subtitulo && (
                            <div className="text-muted small">
                              {prod.subtitulo}
                            </div>
                          )}
                        </div>
                      </div>

                      <div
                        style={{ flex: 1 }}
                        className="text-center align-self-center"
                      >
                        <div className="fw-medium">
                          {formatearARS(prod.precio)}
                        </div>
                      </div>

                      <div
                        style={{ flex: 2 }}
                        className="d-flex justify-content-center"
                      >
                        {renderBotonCarrito(prod)}
                      </div>

                      <div
                        style={{ flex: 1 }}
                        className="text-center align-self-center"
                      >
                        <div className="fw-medium">
                          {formatearARS(
                            (Number(prod.precio) || 0) * (prod.cant || 1)
                          )}
                        </div>
                      </div>

                      <div
                        style={{ width: 48 }}
                        className="text-end align-self-center"
                      >
                        <OverlayTrigger overlay={<Tooltip>Eliminar</Tooltip>}>
                          <Button
                            variant="link"
                            className="text-danger p-0"
                            onClick={() => eliminarProducto(prod)}
                          >
                            <BsTrash size={18} />
                          </Button>
                        </OverlayTrigger>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card>
            </Col>

            <Col lg={4}>
              <Card className="shadow-sm border-0 p-3">
                <h5 className="mb-3">Resumen de pedido</h5>

                <div className="d-flex justify-content-between mb-2">
                  <div>Subtotal</div>
                  <div className="fw-semibold">{formatearARS(subtotal)}</div>
                </div>

                <div className="d-flex justify-content-between mb-3">
                  <div>Envío</div>
                  <div className="text-success">Gratis</div>
                </div>

                <hr />

                <div className="d-flex justify-content-between mb-3">
                  <div className="h6 mb-0">Total</div>
                  <div className="h6 mb-0">{formatearARS(subtotal)}</div>
                </div>

                <Button
                  variant="dark"
                  className="w-100 mb-2"
                  onClick={handleCheckout}
                >
                  Realizar pago
                </Button>

                <Button
                  variant="outline-secondary"
                  className="w-100"
                  onClick={() => {
                    vaciarCarrito();
                    toast.success("Carrito vaciado");
                  }}
                >
                  Vaciar carrito
                </Button>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
};

export default Carrito;
