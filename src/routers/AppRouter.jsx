import { Route, Routes } from "react-router-dom";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";
import Inicio from "../pages/Inicio/Inicio";
import ListaProductos from "../pages/Productos/ListaProductos";
import ProductoDetalle from "../pages/Productos/ProductoDetalle";
import SobreNosotros from "../pages/SobreNosotros/SobreNosotros";
import Contacto from "../pages/Contacto/Contacto";
import Perfil from "../pages/Perfil/Perfil";
import Carrito from "../pages/Carrito/Carrito";
import Admin from "../pages/Admin/Admin";
import CrearProducto from "../pages/Productos/CrearProducto";
import LayoutPublico from "../components/layouts/LayoutPublico";
import RutaProtegida from "../components/layouts/RutaProtegida";

function AppRouter() {
  return (
    <Routes>
      <Route element={<LayoutPublico />}>
        <Route path="/" element={<Inicio />} />
        <Route path="/productos" element={<ListaProductos />} />
        <Route path="/productos/:id" element={<ProductoDetalle />} />
        <Route path="/sobre-nosotros" element={<SobreNosotros />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/carrito" element={<Carrito />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

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
}

export default AppRouter;
