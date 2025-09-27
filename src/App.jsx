import { useEffect, useState } from "react";
import AppRouter from "./routers/AppRouter";

const App = () => {
  const [isAuthenticate, setIsAuthenticate] = useState(
    () => localStorage.getItem("isAuthenticate") === "true"
  );

  useEffect(() => {
    localStorage.setItem("isAuthenticate", isAuthenticate);
  }, [isAuthenticate]);

  return (
    <AppRouter
      isAuthenticate={isAuthenticate}
      setIsAuthenticate={setIsAuthenticate}
    />
  );
};

export default App;
