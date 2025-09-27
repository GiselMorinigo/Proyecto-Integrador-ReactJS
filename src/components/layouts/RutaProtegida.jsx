import Nav from "../Nav";
import Footer from "../Footer";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../Header";

const RutaProtegida = ({ isAuthenticate }) => {
  if (!isAuthenticate) {
    return <Navigate to="/login" replace />;
  }
  return (
    <>
      <Header />
      <Nav />
      <Outlet />
      <Footer />
    </>
  );
};
export default RutaProtegida;
