import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../components/context/AuthContext";
import toast from "react-hot-toast";

const ADMIN_CREDENTIALS = { user: "admin", password: "admin", role: "admin" };

const useLogin = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ user: null, password: null });
  const [loading, setLoading] = useState(false);

  const { login } = useAuthContext();
  const navigate = useNavigate();

  const validarCampos = () => {
    const newErrors = {};

    if (!user.trim()) {
      newErrors.user = "El campo usuario es obligatorio";
    }

    if (!password.trim()) {
      newErrors.password = "El campo contraseña es obligatorio";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    if (e?.preventDefault) e.preventDefault();

    if (!validarCampos()) return;

    setLoading(true);

    try {
      const username = user.trim();
      let role = "user";

      if (
        username === ADMIN_CREDENTIALS.user &&
        password === ADMIN_CREDENTIALS.password
      ) {
        role = ADMIN_CREDENTIALS;
      }

      login(username, role);
      toast(`Bienvenido, ${username}`);
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Error en el login:", error);
      toast.error(
        "Error al iniciar sesión. Credenciales incorrectas o fallo de red."
      );

      setErrors((prev) => ({
        ...prev,
        password: "Contraseña incorrecta. Intente de nuevo.",
        user: "Usuario incorrecto. Intente de nuevo.",
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
