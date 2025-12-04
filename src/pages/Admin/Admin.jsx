import { Alert, Container } from "react-bootstrap";
import CrearProducto from "../Productos/CrearProducto";
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

const API_URL = "https://68d41a53214be68f8c68683d.mockapi.io/api/productos";

const Admin = () => {
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const { state } = useLocation();

  const modo = state?.mode === "edit" ? "edit" : "create";
  const productEdit = state?.product || null;

  useEffect(() => {
    setError(null);
    setMessage(null);
  }, [modo, productEdit?.id]);

  const crearProducto = async (nuevoProducto) => {
    try {
      const payload = {
        nombre: nuevoProducto.nombre.trim(),
        subtitulo: nuevoProducto.subtitulo.trim(),
        precio: Number(nuevoProducto.precio),
        descripcion: nuevoProducto.descripcion.trim(),
        imagen: nuevoProducto.imagenUrl.trim(),
        categoria: nuevoProducto.categoria || "mujer",
      };

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      setMessage("Producto creado correctamente 🎉");

      return data;
    } catch (err) {
      console.error(err);
      setError("No se pudo crear el producto. Intentalo de nuevo.");
    }
  };

  const editarProducto = async (productoEditado) => {
    try {
      setError(null);
      setMessage(null);
      const payload = {
        nombre: productoEditado.nombre.trim(),
        subtitulo: productoEditado.subtitulo.trim(),
        precio: Number(productoEditado.precio),
        descripcion: productoEditado.descripcion.trim(),
        imagen: productoEditado.imagenUrl.trim(),
        categoria: productoEditado.categoria,
      };

      const res = await fetch(`${API_URL}/${productEdit.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setMessage("Producto editado correctamente 🎉");

      return data;
    } catch (error) {
      setError("No se pudo editar el producto. Intentalo de nuevo.");
      console.error("Error al editar el producto:", error);
    }
  };

  const initialValues = useMemo(() => {
    if (!productEdit) return null;
    return {
      nombre: productEdit.nombre ?? "",
      subtitulo: productEdit.subtitulo ?? "",
      precio: String(productEdit.precio ?? ""),
      descripcion: productEdit.descripcion ?? "",
      imagenUrl: productEdit.imagen ?? "",
      categoria: productEdit.categoria ?? "",
    };
  }, [productEdit]);

  return (
    <Container className="py-4">
      <h2 className="mb-4">
        Panel de Administración -{" "}
        {modo === "edit" ? "Editar Producto" : "Crear Producto"}
      </h2>

      {message && (
        <Alert variant="success" onClose={() => setMessage(null)} dismissible>
          {message}
        </Alert>
      )}

      {error && (
        <Alert variant="danger" dismissible onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <CrearProducto
        modo={modo}
        initialValues={initialValues}
        onAgregar={modo === "edit" ? editarProducto : crearProducto}
      />
    </Container>
  );
};
export default Admin;
