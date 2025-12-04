import { Route, Routes } from "react-router-dom";
import Login from "../pages/Auth/Login";
import Inicio from "../pages/Inicio/Inicio";
import ListaProductos from "../pages/Productos/ListaProductos";
import ProductoDetalle from "../pages/Productos/ProductoDetalle";
import Carrito from "../pages/Carrito/Carrito";
import Admin from "../pages/Admin/Admin";
import CrearProducto from "../pages/Productos/CrearProducto";
import LayoutPublico from "../components/layouts/LayoutPublico";
import RutaProtegida from "../components/layouts/RutaProtegida";

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<LayoutPublico />}>
        <Route path="/" element={<Inicio />} />
        <Route path="/productos" element={<ListaProductos />} />
        <Route path="/productos/:categoria" element={<ListaProductos />} />
        <Route path="/producto/:id" element={<ProductoDetalle />} />
        <Route path="/carrito" element={<Carrito />} />

        <Route path="/login" element={<Login />} />

        <Route element={<RutaProtegida />}>
          <Route path="/admin" element={<Admin />} />
          <Route
            path="/crear-producto"
            element={<CrearProducto onAgregar={() => {}} />}
          />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRouter;
