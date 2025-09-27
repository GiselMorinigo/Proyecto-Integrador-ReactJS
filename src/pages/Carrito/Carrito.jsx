import React from "react";

const Carrito = ({ carrito }) => {
  return (
    <div>
      <h1>Carrito</h1>
      {carrito.length === 0 ? (
        <p>No hay productos en el carrito</p>
      ) : (
        carrito.map((prod) => (
          <ul key={prod.id}>
            <li>
              {prod.nombre} - ${prod.precio} - Cantidad: {prod.cant}
            </li>
          </ul>
        ))
      )}
    </div>
  );
};

export default Carrito;
