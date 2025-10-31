import Nav from "../Nav";
import Footer from "../Footer";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../Header";
import { useAuthContext } from "../context/AuthContext";

const RutaProtegida = () => {
  const { user } = useAuthContext();

  if (!user) {
    return <Navigate to="/login" />;
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
