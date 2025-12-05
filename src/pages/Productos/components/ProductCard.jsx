import { Button, ButtonGroup, Card } from "react-bootstrap";
import { BsPencilFill, BsTrashFill } from "react-icons/bs";

const formatearARS = (v) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
  }).format(v);

const ProductCard = ({
  prod,
  renderBotonCarrito,
  verDetalle,
  user,
  onEdit,
  onDelete,
}) => {
  const handleImgError = (e) => {
    e.currentTarget.src = "/placeholder.png";
  };

  return (
    <Card className="h-100 shadow-sm">
      <div onClick={() => verDetalle(prod.id)} role="button">
        <Card.Img
          variant="top"
          src={prod.imagen}
          alt={prod.nombre}
          loading="lazy"
          onError={handleImgError}
        />
      </div>

      <Card.Body className="d-flex flex-column">
        <Card.Title>{prod.nombre}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {prod.subtitulo}
        </Card.Subtitle>

        <div className="d-flex justify-content-between align-items-center mb-2">
          <Card.Text>{formatearARS(prod.precio)}</Card.Text>

          {user && (
            <div className="d-flex justify-content-center mb-3">
              <ButtonGroup>
                <Button
                  size="sm"
                  variant="outline-secondary"
                  onClick={() => onEdit(prod)}
                >
                  <BsPencilFill />
                </Button>
                <Button
                  size="sm"
                  variant="outline-danger"
                  onClick={() => onDelete(prod)}
                >
                  <BsTrashFill />
                </Button>
              </ButtonGroup>
            </div>
          )}
        </div>
        <div className="mt-auto">{renderBotonCarrito(prod)}</div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
