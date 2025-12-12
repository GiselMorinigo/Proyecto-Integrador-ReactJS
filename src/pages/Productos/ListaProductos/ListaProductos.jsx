import { useContext } from "react";
import { Alert, Col, Container, Row, Spinner } from "react-bootstrap";
import { CarritoContext } from "../../../components/context/CarritoContext";
import { useAuthContext } from "../../../components/context/AuthContext"; // ⬅️ Reinsertamos la importación
import ModalEliminarProducto from "../components/modalEliminarProd";
import Paginacion from "../components/Paginacion";
import useListaProductos from "./useListaProductos";
import ProductCard from "../components/ProductCard";

const ListaProductos = () => {
  const {
    productosPagina,
    cargando,
    error,
    categoria,
    busqueda,
    isEmptyResults,
    showErrorStatus,
    showModal,
    prodSeleccionado,
    paginaActual,
    totalPages,
    contentRef,
    handlePageChange,
    openModalDelete,
    closeModalDelete,
    confirmDelete,
    editProduct,
  } = useListaProductos();

  const { user } = useAuthContext();
  const { verDetalle } = useContext(CarritoContext);

  const renderContent = () => {
    if (cargando) {
      return (
        <div className="d-flex justify-content-center align-items-center py-5">
          <Spinner animation="border" />{" "}
        </div>
      );
    }

    if (showErrorStatus) {
      return (
        <Container fluid className="p-5 w-50">
          <Alert variant="danger">
            <Alert.Heading>Oops! Ocurrió un error</Alert.Heading>
            <p>{error}</p>
          </Alert>
        </Container>
      );
    }

    if (isEmptyResults) {
      const message = busqueda
        ? `No se encontraron productos para "${busqueda}".`
        : categoria
        ? `No hay productos disponibles para la categoría "${categoria}".`
        : "No hay productos disponibles.";

      return (
        <div className="text-center mt-5">
          <h5>{message}</h5>
        </div>
      );
    }

    return (
      <>
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {productosPagina.map((prod) => (
            <Col key={prod.id}>
              <ProductCard
                prod={prod}
                verDetalle={verDetalle}
                user={user}
                onEdit={editProduct}
                onDelete={openModalDelete}
              />
            </Col>
          ))}
        </Row>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "30px",
          }}
        >
          <Paginacion
            currentPage={paginaActual}
            totalPage={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </>
    );
  };

  return (
    <div style={{ padding: "20px" }} ref={contentRef}>
      <h2 className="mb-4 text-capitalize">
        {categoria ? `Categoría: ${categoria}` : "Todos los productos"}
      </h2>
      {renderContent()}

      <ModalEliminarProducto
        show={showModal}
        producto={prodSeleccionado}
        onClose={closeModalDelete}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default ListaProductos;
