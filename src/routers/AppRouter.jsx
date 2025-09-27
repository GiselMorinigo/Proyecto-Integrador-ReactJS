import { Route, Routes } from "react-router-dom";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";
import Inicio from "../pages/Inicio/Inicio";
import ListaProductos from "../pages/Productos/ListaProductos";
import ProductoDetalle from "../pages/Productos/ProductoDetalle";
import SobreNosotros from "../pages/SobreNosotros/SobreNosotros";
import Contacto from "../pages/Contacto/Contacto";
import Carrito from "../pages/Carrito/Carrito";
import RutaProtegida from "../components/layouts/RutaProtegida";

function AppRouter({ isAuthenticate, setIsAuthenticate }) {
  return (
    <Routes>
      <Route>
        <Route
          path="/login"
          element={<Login setIsAuthenticate={setIsAuthenticate} />}
        />
        <Route path="/signup" element={<Signup />} />
      </Route>
      <Route element={<RutaProtegida isAuthenticate={isAuthenticate} />}>
        <Route path="/" element={<Inicio />} />
        <Route path="/productos" element={<ListaProductos />} />
        <Route path="/productos/:id" element={<ProductoDetalle />} />
        <Route path="/sobre-nosotros" element={<SobreNosotros />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/carrito" element={<Carrito />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
