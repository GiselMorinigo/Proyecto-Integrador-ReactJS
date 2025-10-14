import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";

const Carrito = ({ carrito, setCarrito }) => {
  const eliminarProducto = (prod) => {
    setCarrito((prev) => prev.filter((p) => p.id !== prod.id));
  };

  return (
    <div>
      <h1>Carrito</h1>
      {carrito.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <ul>
          {carrito.map((prod) => (
            <li
              key={prod.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                margin: "20px 0",
              }}
            >
              <img
                src={prod.image}
                alt="imagen-producto"
                style={{ maxWidth: "5%", marginRight: "10px" }}
              />
              <span>
                {prod.title} - ${prod.price} - Cantidad: {prod.cant}
              </span>
              <OverlayTrigger
                overlay={<Tooltip>Eliminar</Tooltip>}
                placement="top"
              >
                <BsTrash
                  type="button"
                  color="red"
                  onClick={() => eliminarProducto(prod)}
                />
              </OverlayTrigger>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Carrito;
