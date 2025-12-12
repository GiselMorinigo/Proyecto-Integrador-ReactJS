import { Button, ButtonGroup, Card } from "react-bootstrap";
import { BsPencilFill, BsTrashFill } from "react-icons/bs";
import { formatARS } from "../../../utils/moneda.utils";

const ProductCard = ({ prod, verDetalle, user, onEdit, onDelete }) => {
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
          <Card.Text>{formatARS(prod.precio)}</Card.Text>

          {user?.role?.role === "admin" && (
            <div className="d-flex justify-content-center mb-3">
              <ButtonGroup>
                <Button
                  aria-label="Editar producto"
                  size="sm"
                  variant="outline-secondary"
                  onClick={() => onEdit(prod)}
                >
                  <BsPencilFill />
                </Button>
                <Button
                  aria-label="Eliminar producto"
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
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
