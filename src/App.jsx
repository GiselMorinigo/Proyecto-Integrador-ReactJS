import { Toaster } from "react-hot-toast";
import AppRouter from "./routers/AppRouter";

const App = () => {
  return (
    <>
      <AppRouter />
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default App;
