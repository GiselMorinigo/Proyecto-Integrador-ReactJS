import { createContext, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { BsDash, BsPlus } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import "../../assets/css/Carrito.css";

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
    navigate(`/producto/${id}`);
  };

  const renderBotonCarrito = (prod) => {
    const productoEnCarrito = carrito.find((p) => p.id === prod.id);

    if (productoEnCarrito) {
      return (
        <InputGroup size="sm" className="qty-stepper compact-stepper">
          <Button
            variant="outline-secondary"
            onClick={() => {
              if (productoEnCarrito.cant > 1) {
                agregarProducto({ ...prod, cant: -1 });
              } else {
                eliminarProducto(prod);
              }
            }}
          >
            <BsDash />
          </Button>

          <Form.Control
            value={productoEnCarrito.cant}
            readOnly
            className="text-center"
          />

          <Button
            variant="outline-secondary"
            onClick={() => agregarProducto(prod)}
          >
            <BsPlus />
          </Button>
        </InputGroup>
      );
    }

    return (
      <Button onClick={() => agregarProducto(prod)} className="button w-100">
        Agregar al Carrito
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
