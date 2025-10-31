import { useContext } from "react";
import Nav from "react-bootstrap/Nav";
import { BsBag, BsPersonCircle } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { CarritoContext } from "./context/CarritoContext";

const NavBar = () => {
  const { cantProductos } = useContext(CarritoContext);
  return (
    <Nav className="navbar" justify variant="underline" defaultActiveKey="/">
      <Nav.Item>
        <Nav.Link as={NavLink} to="/">
          Logo
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={NavLink} to="/productos">
          Productos
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={NavLink} to="/sobre-nosotros">
          Sobre Nosotros
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={NavLink} to="/contacto">
          Contacto
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <BsPersonCircle size={20} />
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={NavLink} to="/carrito">
          {cantProductos > 0 ? (
            <>
              <BsBag /> {cantProductos}
            </>
          ) : (
            <>
              {" "}
              <BsBag />
            </>
          )}
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};
export default NavBar;
