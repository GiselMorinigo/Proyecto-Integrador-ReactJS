import { createContext, useState } from "react";
import { Button } from "react-bootstrap";
import { BsCartPlus, BsDashSquareFill, BsPlusSquareFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components
export const CarritoContext = createContext();

const CarritoProvider = ({ children }) => {
  const navigate = useNavigate();
  const [carrito, setCarrito] = useState([]);
  const [cantProductos, setCantProductos] = useState(0);

  const agregarProducto = (prod) => {
    const existeProd = carrito.find((p) => p.id === prod.id);

    if (existeProd) {
      const nuevaCantidad = (prod.cant ?? 1) + existeProd.cant;
      if (nuevaCantidad <= 0) {
        setCarrito(carrito.filter((p) => p.id !== prod.id));
        setCantProductos(cantProductos - 1);
      } else {
        setCarrito(
          carrito.map((p) =>
            p.id === prod.id ? { ...p, cant: nuevaCantidad } : p
          )
        );
      }
    } else if (!existeProd && (!prod.cant || prod.cant > 0)) {
      setCarrito([...carrito, { ...prod, cant: 1 }]);
      setCantProductos(cantProductos + 1);
    }
  };

  const eliminarProducto = (prod) => {
    setCarrito((prev) => prev.filter((p) => p.id !== prod.id));
    setCantProductos(cantProductos - 1);
  };

  const vaciarCarrito = () => {
    setCarrito([]);
    setCantProductos(0);
  };

  const verDetalle = (id) => {
    navigate(`/productos/${id}`);
  };

  const renderBotonCarrito = (prod) => {
    const productoEnCarrito = carrito.find((p) => p.id === prod.id);

    if (productoEnCarrito) {
      return (
        <div className="stepper">
          <BsDashSquareFill
            className="stepper-btn"
            onClick={() => {
              if (productoEnCarrito.cant > 1) {
                agregarProducto({ ...prod, cant: -1 });
              } else {
                eliminarProducto(prod);
              }
            }}
          />

          <span className="stepper-value">{productoEnCarrito.cant}</span>

          <BsPlusSquareFill
            className="stepper-btn"
            onClick={() => agregarProducto(prod)}
          />
        </div>
      );
    }

    return (
      <Button onClick={() => agregarProducto(prod)}>
        <BsCartPlus /> Agregar al Carrito
      </Button>
    );
  };

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        cantProductos,
        agregarProducto,
        vaciarCarrito,
        eliminarProducto,
        renderBotonCarrito,
        verDetalle,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};

export default CarritoProvider;
