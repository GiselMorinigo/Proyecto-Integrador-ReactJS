import { useContext, useEffect, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { CarritoContext } from "../../components/context/CarritoContext";
import ProductCard from "./components/ProductCard";
import { useAuthContext } from "../../components/context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ModalEliminarProducto from "./components/modalEliminarProd";

const ListaProductos = () => {
  const { renderBotonCarrito, verDetalle } = useContext(CarritoContext);
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [prodSeleccionado, setProdSeleccionado] = useState(null);

  const API_URL = "https://68d41a53214be68f8c68683d.mockapi.io/api/productos";

  const fetchProductos = async () => {
    try {
      setCargando(true);
      const respuesta = await fetch(API_URL);
      const data = await respuesta.json();
      setProductos(data);
    } catch (error) {
      setError("Error al cargar productos:", error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const openModalDelete = (prod) => {
    setProdSeleccionado(prod);
    setShowModal(true);
  };

  const closeModalDelete = () => {
    setShowModal(false);
    setProdSeleccionado(null);
  };

  const confirmDelete = async () => {
    if (!prodSeleccionado) return;

    try {
      await fetch(`${API_URL}/${prodSeleccionado.id}`, {
        method: "DELETE",
      });

      setProductos((prev) => prev.filter((p) => p.id !== prodSeleccionado.id));

      toast.success(`Producto "${prodSeleccionado.nombre}" eliminado`);
    } catch (error) {
      console.error(error);
      toast.error("No se pudo eliminar el producto");
    } finally {
      closeModalDelete();
    }
  };

  const editProduct = (prod) => {
    navigate("/admin", { state: { mode: "edit", product: prod } });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 className="mb-4">Productos</h1>

      {cargando ? (
        <div className="d-flex justify-content-center align-items-center py-5">
          <Spinner animation="border" />{" "}
          <span className="ms-2">Cargando productos...</span>
        </div>
      ) : productos.length === 0 ? (
        <p>No hay productos disponibles.</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <Row xs={1} sm={2} md={4} lg={4} className="g-4">
          {productos.map((prod) => (
            <Col key={prod.id}>
              <ProductCard
                prod={prod}
                renderBotonCarrito={renderBotonCarrito}
                verDetalle={verDetalle}
                user={user}
                onEdit={editProduct}
                onDelete={openModalDelete}
              />
            </Col>
          ))}
        </Row>
      )}

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
