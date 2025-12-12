/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";
import { Button } from "react-bootstrap";
import { BsDash, BsPlus } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import "../../assets/css/carrito.css";

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
    navigate(`/producto/${id}`);
  };

  const renderBotonCarrito = (prod) => {
    const productoEnCarrito = carrito.find((p) => p.id === prod.id);

    if (productoEnCarrito) {
      return (
        <div
          className="stepper-compact"
          role="group"
          aria-label="Control de cantidad"
        >
          <button
            type="button"
            className="stepper-btn stepper-btn--left"
            aria-label={`Disminuir cantidad de ${prod.nombre}`}
            onClick={() => {
              if (productoEnCarrito.cant > 1) {
                agregarProducto({ ...prod, cant: -1 });
              } else {
                eliminarProducto(prod);
              }
            }}
          >
            <BsDash />
          </button>

          <span className="stepper-value" aria-live="polite">
            {productoEnCarrito.cant}
          </span>

          <button
            type="button"
            className="stepper-btn stepper-btn--right"
            aria-label={`Aumentar cantidad de ${prod.nombre}`}
            onClick={() => agregarProducto(prod)}
          >
            <BsPlus />
          </button>
        </div>
      );
    }

    return (
      <Button
        aria-label="Agregar producto"
        onClick={() => agregarProducto(prod)}
        className="button w-100"
        variant="dark"
      >
        Agregar al carrito
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
