import { useContext, useEffect, useMemo, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { CarritoContext } from "../../components/context/CarritoContext";
import ProductCard from "./components/ProductCard";
import { useAuthContext } from "../../components/context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import ModalEliminarProducto from "./components/modalEliminarProd";
import { Helmet } from "react-helmet-async";
import { useSearchContext } from "../../components/context/SearchContext";

const API_URL = "https://68d41a53214be68f8c68683d.mockapi.io/api/productos";

const normalize = (str = "") =>
  str
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/ñ/g, "n")
    .trim();

const ListaProductos = () => {
  const { renderBotonCarrito, verDetalle } = useContext(CarritoContext);
  const { user } = useAuthContext();
  const { categoria } = useParams();
  const navigate = useNavigate();

  const { busqueda } = useSearchContext();
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [prodSeleccionado, setProdSeleccionado] = useState(null);

  useEffect(() => {
    let active = true;
    const fetchProductos = async () => {
      try {
        setCargando(true);
        setError(null);

        const url = new URL(API_URL);
        if (categoria) {
          const cat = normalize(categoria);
          url.searchParams.set("categoria", cat);
        }

        const res = await fetch(url.toString());
        if (!res.ok) throw new Error("Error al obtener los productos");
        const data = await res.json();

        if (!active) return;
        setProductos(Array.isArray(data) ? data : []);
      } catch (error) {
        if (!active) return;
        setError("Error al cargar productos:", error.message);
        setProductos([]);
      } finally {
        if (active) setCargando(false);
      }
    };

    fetchProductos();

    return () => {
      active = false;
    };
  }, [categoria]);

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

  const productosFiltrados = useMemo(() => {
    if (!busqueda || !busqueda.trim()) return productos;

    const q = normalize(busqueda);
    return productos.filter((p) => {
      const nombre = normalize(p.nombre);
      const subtitulo = normalize(p.subtitulo || "");
      const descripcion = normalize(p.descripcion || "");
      const categoriaProd = normalize(p.categoria || "");

      return (
        nombre.includes(q) ||
        subtitulo.includes(q) ||
        descripcion.includes(q) ||
        categoriaProd.includes(q)
      );
    });
  }, [busqueda, productos]);

  const isEmptyResults = !cargando && productosFiltrados.length === 0;
  const showError = !cargando && error;

  return (
    <>
      <Helmet>
        <title>Gié | {`Moda para ${categoria ? categoria : "todos"}`}</title>
        <meta
          name="description"
          content="Página que muestra la lista de productos disponibles en Gié"
        />
      </Helmet>

      <div style={{ padding: "20px" }}>
        {cargando ? (
          <div className="d-flex justify-content-center align-items-center py-5">
            <Spinner animation="border" />{" "}
            <span className="ms-2">Cargando productos</span>
          </div>
        ) : showError ? (
          <p className="text-danger">{error}</p>
        ) : isEmptyResults ? (
          <div className="text-center mt-5">
            <h5>
              {busqueda
                ? `No se encontraron productos para "${busqueda}".`
                : categoria
                ? `No hay productos disponibles para la categoría  "${categoria}".`
                : "No hay productos disponibles."}
            </h5>
          </div>
        ) : (
          <Row xs={1} sm={2} md={4} lg={4} className="g-2">
            {productosFiltrados.map((prod) => (
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
    </>
  );
};

export default ListaProductos;
