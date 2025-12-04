import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../components/context/AuthContext";

const useLogin = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ user: null, password: null });
  const [loading, setLoading] = useState(false);

  const { login } = useAuthContext();
  const navigate = useNavigate();

  const validarCampos = () => {
    const next = { user: null, password: null };

    if (!user || user.trim() === "") {
      next.user = "El campo usuario es obligatorio";
    }

    if (!password || password.trim() === "") {
      next.password = "El campo contraseña es obligatorio";
    }

    setErrors(next);

    return !next.user && !next.password;
  };

  const handleSubmit = (e) => {
    if (e && typeof e.preventDefault === "function") {
      e.preventDefault();
    }

    const ok = validarCampos();
    if (!ok) return;

    setLoading(true);

    try {
      if (user.trim() === "admin" && password === "admin") {
        login(user.trim());
        navigate("/");
        setErrors({ user: null, password: null });
      } else {
        setErrors((prev) => ({
          ...prev,
          password: "Credenciales inválidas",
        }));
      }
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        password: "Error al iniciar sesión. Inténtelo de nuevo.",
      }));
      console.error("Error en el login:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    setUser,
    password,
    setPassword,
    errors,
    handleSubmit,
    loading,
  };
};
export default useLogin;
