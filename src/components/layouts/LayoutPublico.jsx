import NavBar from "../Navbar";
import Footer from "../Footer";
import "../../assets/css/Layout.css";
import { Outlet } from "react-router-dom";

const LayoutPublico = () => (
  <div className="layout">
    <NavBar />
    <main className="layout-content">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default LayoutPublico;
