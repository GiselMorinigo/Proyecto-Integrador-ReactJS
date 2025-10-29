import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const CarritoContext = createContext();

const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

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

  const eliminarProducto = (prod) => {
    setCarrito((prev) => prev.filter((p) => p.id !== prod.id));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarProducto,
        vaciarCarrito,
        eliminarProducto,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};

export default CarritoProvider;
