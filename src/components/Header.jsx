import { Link } from "react-router-dom";
import "../assets/css/style.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-title">Bienvenido a mi App React</div>
      <Link to="/admin" className="header-admin">
        Admin
      </Link>
    </header>
  );
};

export default Header;
