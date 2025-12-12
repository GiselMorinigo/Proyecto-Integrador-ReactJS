import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CarritoContext } from "../../../components/context/CarritoContext";
import { ProductServices } from "../services/productos.services";
import toast from "react-hot-toast";

const useProductoDetalle = () => {
  const { id } = useParams();
  const { agregarProducto } = useContext(CarritoContext);

  const [detalleProducto, setDetalleProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [sizeError, setSizeError] = useState(false);
  const [addToCart, setAddToCart] = useState(false);

  useEffect(() => {
    const loadProducto = async () => {
      try {
        setCargando(true);
        setError(null);

        const data = await ProductServices.getProductId(id);
        setDetalleProducto(data);
      } catch (err) {
        console.error(err);
        toast.error("Error al cargar producto.");
        setDetalleProducto(null);
      } finally {
        setCargando(false);
      }
    };
    loadProducto();
  }, [id]);

  const handleAgregarCarrito = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }

    setSizeError(false);
    agregarProducto({ ...detalleProducto, talle: selectedSize });
    setAddToCart(true);

    setTimeout(() => {
      setAddToCart(false);
    }, 2000);
  };

  const handleSelectSize = (size) => {
    setSelectedSize(size);
    setSizeError(false);
  };

  return {
    detalleProducto,
    cargando,
    error,
    selectedSize,
    sizeError,
    addToCart,
    handleAgregarCarrito,
    handleSelectSize,
  };
};

export default useProductoDetalle;
