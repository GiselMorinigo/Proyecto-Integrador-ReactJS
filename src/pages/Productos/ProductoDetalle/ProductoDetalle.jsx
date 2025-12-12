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
import useProductoDetalle from "./useProductoDetalle";
import { formatCategoria, SIZES } from "../helpers/productForm.utils";
import { formatARS } from "../../../utils/moneda.utils";
import { BsCheckLg } from "react-icons/bs";

const ProductoDetalle = () => {
  const {
    detalleProducto,
    cargando,
    error,
    selectedSize,
    sizeError,
    addToCart,
    handleAgregarCarrito,
    handleSelectSize,
  } = useProductoDetalle();

  if (cargando) {
    return (
      <div className="d-flex align-items-center justify-content-center py-5">
        <Spinner />
      </div>
    );
  }

  if (error || !detalleProducto)
    return (
      <p className="text-danger text-center py-5">
        {error ?? "Producto no disponible."}
      </p>
    );

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

          <h4 className="mb-3">{formatARS(detalleProducto.precio)}</h4>

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
                    onClick={() => handleSelectSize(size)}
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
              {detalleProducto?.descripcion}
            </p>
          </div>

          <div className="d-grid">
            <Button
              aria-label="Agregar producto"
              className="button"
              disabled={addToCart}
              size="lg"
              onClick={handleAgregarCarrito}
              style={{ transition: "all 0.3s ease" }}
            >
              {addToCart ? (
                <div className="d-flex align-items-center justify-content-center gap-2">
                  <BsCheckLg size={20} />
                  <span>Producto agregado</span>
                </div>
              ) : (
                "Agregar al carrito"
              )}
            </Button>
          </div>

          <Accordion flush className="mt-3 acordion">
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
