import { useContext, useState } from "react";
import { Navbar, Nav, Container, Badge, Form, Button } from "react-bootstrap";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { BsBag } from "react-icons/bs";
import { CarritoContext } from "./context/CarritoContext";
import { useAuthContext } from "./context/AuthContext";

const NavBar = () => {
  const { cantProductos } = useContext(CarritoContext);
  const { user, logout } = useAuthContext();
  const [expanded, setExpanded] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const close = () => setExpanded(false);

  const handleSearch = (e) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    navigate(`/productos?busqueda=${encodeURIComponent(q)}`);
    close();
  };

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
          {/* Links izquierdos */}
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

          {/* Derecha: buscador + carrito + auth */}
          <Nav className="ms-auto d-flex align-items-center gap-3">
            {/* Buscador */}
            <Form className="d-flex" onSubmit={handleSearch}>
              <Form.Control
                type="search"
                placeholder="Buscar"
                size="sm"
                className="me-2"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Buscar productos"
              />
              <Button variant="outline-secondary" size="sm" type="submit">
                Buscar
              </Button>
            </Form>

            {/* Carrito */}
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

            {/* Auth: solo texto */}
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
