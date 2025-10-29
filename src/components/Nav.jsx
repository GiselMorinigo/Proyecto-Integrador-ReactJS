import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <Nav justify variant="tabs" defaultActiveKey="/">
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
        <Nav.Link as={NavLink} to="/carrito">
          Carrito
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};
export default NavBar;
