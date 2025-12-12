import { Route, Routes } from "react-router-dom";
import LayoutPublico from "../components/layouts/LayoutPublico";
import Inicio from "../pages/Inicio/Inicio";
import Login from "../pages/Auth/Login";
import RutaProtegida from "../components/layouts/RutaProtegida";
import ListaProductos from "../pages/Productos/ListaProductos/ListaProductos";
import ProductoDetalle from "../pages/Productos/ProductoDetalle/ProductoDetalle";
import Carrito from "../pages/Carrito/Carrito";
import AdminRoute from "../components/layouts/AdminRoute";
import Admin from "../pages/Admin/Admin";
import CrearProducto from "../pages/Productos/CrearProducto/CrearProducto";

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<LayoutPublico />}>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />

        <Route element={<RutaProtegida />}>
          <Route path="/productos" element={<ListaProductos />} />
          <Route path="/productos/:categoria" element={<ListaProductos />} />
          <Route path="/producto/:id" element={<ProductoDetalle />} />
          <Route path="/carrito" element={<Carrito />} />
        </Route>

        <Route element={<AdminRoute />}>
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
