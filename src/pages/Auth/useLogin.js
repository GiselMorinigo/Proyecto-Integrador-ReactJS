import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../components/context/AuthContext";

const useLogin = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [messageError, setMessageError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setMessageError("");

    if (user === "admin" && password === "admin") {
      login(user);
      navigate("/");
    } else {
      setMessageError("Usuario o contraseña incorrectos");
    }
    setLoading(false);
  };

  return {
    user,
    setUser,
    password,
    setPassword,
    messageError,
    handleSubmit,
    loading,
  };
};
export default useLogin;
