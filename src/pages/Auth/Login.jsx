import { useState } from "react";
import { Button } from "react-bootstrap";
import { Navigate } from "react-router-dom";

const Login = ({ setIsAuthenticate }) => {
  const [redirect, setRedirect] = useState(false);

  const handleLogin = () => {
    setIsAuthenticate(true);
    setRedirect(true);
  };

  setTimeout(() => {
    setIsAuthenticate(false);
    localStorage.setItem("isAuthenticate", false);
  }, 900000);

  if (redirect) {
    return <Navigate to="/" replace />;
  }
  return (
    <div
      style={{
        minHeight: "100VH",
        margin: "auto",
        alignContent: "center",
        textAlign: "center",
      }}
    >
      <h1>INICIAR SESION</h1>
      <Button onClick={handleLogin}>Iniciar Sesión</Button>
    </div>
  );
};
export default Login;
