import { useContext, useState } from "react";
import { Navbar, Nav, Container, Badge, NavDropdown } from "react-bootstrap";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { BsBag, BsPersonCircle } from "react-icons/bs";
import { CarritoContext } from "./context/CarritoContext";
import { useAuthContext } from "./context/AuthContext";

const NavBar = () => {
  const { cantProductos } = useContext(CarritoContext);
  const { user, logout } = useAuthContext();
  const [expanded, setExpanded] = useState(false);
  const close = () => setExpanded(false);
  const navigate = useNavigate();

  return (
    <Navbar
      bg="light"
      expand="lg"
      className="shadow-sm"
      sticky="top"
      expanded={expanded}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" onClick={close}>
          Logo
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="main-navbar"
          onClick={() => setExpanded((v) => !v)}
        />
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/productos" onClick={close}>
              Productos
            </Nav.Link>
            <Nav.Link as={NavLink} to="/sobre-nosotros" onClick={close}>
              Sobre Nosotros
            </Nav.Link>
            <Nav.Link as={NavLink} to="/contacto" onClick={close}>
              Contacto
            </Nav.Link>

            {user && (
              <Nav.Link as={NavLink} to="/admin" onClick={close}>
                Admin
              </Nav.Link>
            )}
          </Nav>

          <Nav className="ms-auto d-flex align-items-center gap-3">
            <NavDropdown
              align="end"
              title={<BsPersonCircle size={20} className="align-middle" />}
              id="dropdown-usuario"
            >
              {!user ? (
                <>
                  <NavDropdown.Item onClick={() => navigate("/login")}>
                    Iniciar sesión
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => navigate("/signup")}>
                    Registrarse
                  </NavDropdown.Item>
                </>
              ) : (
                <>
                  <NavDropdown.Item onClick={() => navigate("/perfil")}>
                    Perfil
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    onClick={() => {
                      logout();
                      navigate("/");
                    }}
                  >
                    Cerrar sesión
                  </NavDropdown.Item>
                </>
              )}
            </NavDropdown>

            <Nav.Link
              as={NavLink}
              to="/carrito"
              onClick={close}
              className="d-flex align-items-center"
            >
              <span className="d-flex align-items-center position-relative">
                <BsBag size={20} className="align-middle" />
                {cantProductos > 0 && (
                  <Badge bg="primary" pill className="ms-1">
                    {cantProductos}
                  </Badge>
                )}
              </span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default NavBar;
