import { useContext, useState } from "react";
import { Navbar, Nav, Container, Badge, Form, Button } from "react-bootstrap";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { BsBag } from "react-icons/bs";
import { CarritoContext } from "./context/CarritoContext";
import { useAuthContext } from "./context/AuthContext";
import { useSearchContext } from "./context/SearchContext";

const NavBar = () => {
  const { cantProductos } = useContext(CarritoContext);
  const { user, logout } = useAuthContext();
  const { busqueda, setBusqueda } = useSearchContext();
  const [expanded, setExpanded] = useState(false);

  const navigate = useNavigate();

  const close = () => setExpanded(false);

  return (
    <Navbar
      bg="light"
      expand="lg"
      className="shadow-sm"
      sticky="top"
      expanded={expanded}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="logo-title" onClick={close}>
          Gié
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="main-navbar"
          onClick={() => setExpanded((v) => !v)}
        />
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/productos/mujer" onClick={close}>
              Mujer
            </Nav.Link>
            <Nav.Link as={NavLink} to="/productos/hombre" onClick={close}>
              Hombre
            </Nav.Link>
            <Nav.Link as={NavLink} to="/productos/ninos" onClick={close}>
              Niño/a
            </Nav.Link>

            {user && (
              <Nav.Link as={NavLink} to="/admin" onClick={close}>
                Admin
              </Nav.Link>
            )}
          </Nav>

          <Nav className="ms-auto d-flex align-items-center gap-3">
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Buscar"
                size="sm"
                className="me-2"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                aria-label="Buscar productos"
              />
              <Button variant="outline-secondary" size="sm" type="submit">
                Buscar
              </Button>
            </Form>

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

            {!user ? (
              <Nav.Link
                onClick={() => {
                  navigate("/login");
                  close();
                }}
              >
                Iniciar sesión
              </Nav.Link>
            ) : (
              <Nav.Link
                onClick={() => {
                  logout();
                  navigate("/");
                  close();
                }}
              >
                Cerrar sesión
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
