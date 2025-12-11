import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../components/context/AuthContext";
import { getInitialValues } from "./helpers/product.utils";
import { AdminServices } from "./services/admin.services";
import toast from "react-hot-toast";

const useAdmin = () => {
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const { state } = useLocation();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const productEdit = state?.product || null;
  const modo = state?.mode === "edit" ? "edit" : "create";

  useEffect(() => {
    if (!user || user.role.role !== "admin") {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  useEffect(() => {
    setError(null);
    setMessage(null);
  }, [modo, productEdit?.id]);

  const crearProducto = async (nuevoProducto) => {
    try {
      const data = await AdminServices.createProduct(nuevoProducto);
      toast.success("Producto creado correctamente");
      return data;
    } catch (error) {
      console.error(error);
      toast.error("Error al crear producto. Intente de nuevo");
    }
  };

  const editarProducto = async (productoEditado) => {
    try {
      if (!productEdit?.id) {
        throw new Error("No hay producto para editar.");
      }
      setError(null);
      setMessage(null);

      const data = await AdminServices.updateProduct(
        productEdit.id,
        productoEditado
      );
      toast.success("Producto editado correctamente");
      return data;
    } catch (error) {
      console.error(error);
      toast.error("Error al editar producto. Intente de nuevo");
    }
  };

  return {
    modo,
    message,
    setMessage,
    error,
    setError,
    getInitialValues,
    crearProducto,
    editarProducto,
    productEdit,
  };
};
export default useAdmin;
