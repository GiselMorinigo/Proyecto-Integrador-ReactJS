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
    <Card className="h-100 shadow-sm product-card">
      <div
        className="product-card__thumb"
        onClick={() => verDetalle(prod.id)}
        role="button"
      >
        <Card.Img
          variant="top"
          src={prod.imagen}
          alt={prod.nombre}
          loading="lazy"
          onError={handleImgError}
          className="product-card__img"
        />
      </div>

      <Card.Body className="d-flex flex-column">
        <Card.Title className="product-card__title">{prod.nombre}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {prod.subtitulo}
        </Card.Subtitle>

        <Card.Text className="product-card__price">
          {formatearARS(prod.precio)}
        </Card.Text>

        {user && (
          <ButtonGroup className="mb-3">
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
        )}
        <div className="mt-auto">{renderBotonCarrito(prod)}</div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
