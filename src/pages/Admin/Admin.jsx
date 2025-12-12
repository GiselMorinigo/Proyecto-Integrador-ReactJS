import { Alert, Container } from "react-bootstrap";
import useAdmin from "./useAdmin";
import CrearProducto from "../Productos/CrearProducto/CrearProducto";

const Admin = () => {
  const {
    modo,
    message,
    setMessage,
    error,
    setError,
    getInitialValues,
    crearProducto,
    editarProducto,
    productEdit,
  } = useAdmin();

  const initialValues = modo === "edit" ? getInitialValues(productEdit) : null;
  const onAgregar = modo === "edit" ? editarProducto : crearProducto;

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
        onAgregar={onAgregar}
      />
    </Container>
  );
};
export default Admin;
