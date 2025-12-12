import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const RutaProtegida = () => {
  const { user } = useAuthContext();
  if (!user) return <Navigate to="/login" replace />;
  return <Outlet />;
};

export default RutaProtegida;
