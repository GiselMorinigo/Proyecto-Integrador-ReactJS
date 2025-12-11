import { useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { CarritoContext } from "../../components/context/CarritoContext";
import { formatARS } from "../../utils/moneda.utils";

const useCarrito = () => {
  const { carrito, eliminarProducto, vaciarCarrito, renderBotonCarrito } =
    useContext(CarritoContext);

  const navigate = useNavigate();

  const subtotal = useMemo(() => {
    return carrito.reduce(
      (acc, p) => acc + (Number(p.precio) || 0) * (Number(p.cant) || 1),
      0
    );
  }, [carrito]);

  const handleCheckout = () => {
    if (carrito.length === 0) {
      toast.error("El carrito está vacío. Agregue productos para pagar.");
      return;
    }

    toast.success("Compra realizada con éxito 🎉. Redirigiendo...");

    setTimeout(() => {
      vaciarCarrito();
      navigate("/", { replace: true });
    }, 700);
  };

  const handleVaciarCarrito = () => {
    if (carrito.length === 0) {
      toast.info("El carrito ya está vacío.");
      return;
    }
    vaciarCarrito();
    toast.success("Carrito vaciado correctamente.");
  };

  return {
    carrito,
    subtotal,
    handleCheckout,
    handleVaciarCarrito,
    eliminarProducto,
    renderBotonCarrito,
    formatARS,
  };
};

export default useCarrito;
