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
    if (e && typeof e.preventDefault === "function") e.preventDefault();
    if (!validarCampos()) return;

    setLoading(true);

    try {
      const name = user.trim();
      if (name === "admin" && password === "admin") {
        login(name, "admin");
        navigate("/");
        setErrors({ user: null, password: null });
      } else {
        login(name || "Usuario", "user");
        navigate("/");
        setErrors({ user: null, password: null });
      }
    } catch (error) {
      console.error(error);
      setErrors((prev) => ({
        ...prev,
        password: "Error al iniciar sesión. Inténtelo de nuevo.",
      }));
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
