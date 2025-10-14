import { Route, Routes } from "react-router-dom";
import Login from "../pages/Auth/Login.jsx";
import Signup from "../pages/Auth/Signup.jsx";
import Inicio from "../pages/Inicio/Inicio.jsx";
import ListaProductos from "../pages/Productos/ListaProductos.jsx";
import ProductoDetalle from "../pages/Productos/ProductoDetalle.jsx";
import SobreNosotros from "../pages/SobreNosotros/SobreNosotros.jsx";
import Contacto from "../pages/Contacto/Contacto.jsx";
import Carrito from "../pages/Carrito/Carrito.jsx";
import RutaProtegida from "../components/layouts/RutaProtegida.jsx";

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
