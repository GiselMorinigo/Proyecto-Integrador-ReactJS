import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useSearchContext } from "../../../components/context/SearchContext";
import { normalizeString } from "../helpers/productForm.utils";
import { ProductServices } from "../services/productos.services";

const PAGE_SIZE = 12;

const useListaProductos = () => {
  const { categoria } = useParams();
  const { busqueda } = useSearchContext();
  const navigate = useNavigate();

  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [prodSeleccionado, setProdSeleccionado] = useState(null);

  const [paginaActual, setPaginaActual] = useState(1);
  const contentRef = useRef(null);

  useEffect(() => {
    let active = true;

    const loadProductos = async () => {
      try {
        setCargando(true);
        setError(null);

        const data = await ProductServices.fetchProductos(categoria);

        if (active) {
          setProductos(data);
        }
      } catch (err) {
        console.log(err);
        if (active) {
          setError("Error al cargar productos. Intente más tarde.");
          setProductos([]);
        }
      } finally {
        if (active) setCargando(false);
      }
    };

    loadProductos();
    setPaginaActual(1);

    return () => {
      active = false;
    };
  }, [categoria]);

  const productosFiltrados = useMemo(() => {
    if (!busqueda || !busqueda.trim()) return productos;

    const q = normalizeString(busqueda);
    return productos.filter((p) => {
      const fields = [p.nombre, p.subtitulo, p.descripcion, p.categoria];

      return fields.some((field) => normalizeString(field || "").includes(q));
    });
  }, [busqueda, productos]);

  const totalItems = productosFiltrados.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));

  const startIndex = (paginaActual - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const productosPagina = productosFiltrados.slice(startIndex, endIndex);

  useEffect(() => {
    if (paginaActual > totalPages) setPaginaActual(totalPages);
    if (paginaActual < 1) setPaginaActual(1);
  }, [paginaActual, totalPages]);

  const handlePageChange = (p) => {
    setPaginaActual(p);
    contentRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

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
      await ProductServices.deleteProduct(prodSeleccionado.id);
      setProductos((prev) => prev.filter((p) => p.id !== prodSeleccionado.id));

      toast.success(`Producto "${prodSeleccionado.nombre}" eliminado`);
    } catch (err) {
      console.error(err);
      toast.error("No se pudo eliminar el producto");
    } finally {
      closeModalDelete();
    }
  };

  const editProduct = (prod) => {
    navigate("/admin", { state: { mode: "edit", product: prod } });
  };

  const isEmptyResults = !cargando && productosFiltrados.length === 0;
  const showErrorStatus = !cargando && error;

  return {
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
    totalItems,
    pageSize: PAGE_SIZE,
    contentRef,
    handlePageChange,
    openModalDelete,
    closeModalDelete,
    confirmDelete,
    editProduct,
  };
};

export default useListaProductos;
