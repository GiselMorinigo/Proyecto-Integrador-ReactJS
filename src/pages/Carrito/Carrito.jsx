import { useContext } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import { CarritoContext } from "../../components/context/CarritoContext";
import { Helmet } from "react-helmet-async";

const Carrito = () => {
  const { carrito, eliminarProducto, renderBotonCarrito } =
    useContext(CarritoContext);

  return (
    <>
      <Helmet>
        <title>Gié | Carrito de Compras</title>
        <meta
          name="description"
          content="Página del carrito de compras en Gié"
        />
      </Helmet>
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
                  src={prod.imagen}
                  alt="imagen-producto"
                  style={{ maxWidth: "5%", marginRight: "10px" }}
                />
                <span>
                  {prod.nombre} -{" "}
                  {new Intl.NumberFormat("es-AR", {
                    style: "currency",
                    currency: "ARS",
                    minimumFractionDigits: 0,
                  }).format(prod.precio)}
                </span>
                {renderBotonCarrito(prod)}
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
    </>
  );
};

export default Carrito;
