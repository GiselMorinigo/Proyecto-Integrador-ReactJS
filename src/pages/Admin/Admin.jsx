import { Alert, Container } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
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
    <>
      <Helmet>
        <title>
          Admin | {modo === "edit" ? "Editar Producto" : "Crear Producto"}
        </title>
        <meta
          name="description"
          content={
            modo === "edit"
              ? "Editar un producto existente"
              : "Crear un nuevo producto"
          }
        />
      </Helmet>
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
    </>
  );
};
export default Admin;
