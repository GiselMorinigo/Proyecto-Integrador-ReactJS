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
      <Navbar.Brand as={Link} to="/" className="logo-title" onClick={close}>
        Gérmoni
      </Navbar.Brand>

      <Navbar.Toggle
        aria-controls="main-navbar"
        onClick={() => setExpanded((v) => !v)}
      />
      <Navbar.Collapse id="main-navbar">
        <Nav className="me-auto justify-content-center">
          <Nav.Link as={NavLink} to="/productos/mujer" onClick={close}>
            Mujer
          </Nav.Link>
          <Nav.Link as={NavLink} to="/productos/hombre" onClick={close}>
            Hombre
          </Nav.Link>
          <Nav.Link as={NavLink} to="/productos/ninos" onClick={close}>
            Niños/as
          </Nav.Link>

          {user?.role?.role === "admin" && (
            <Nav.Link as={NavLink} to="/admin" onClick={close}>
              Admin
            </Nav.Link>
          )}
        </Nav>

        <Nav className="ms-auto d-flex align-items-center gap-2 nav-right">
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
                <Badge bg="dark" pill className="mb-3">
                  {cantProductos}
                </Badge>
              )}
            </span>
          </Nav.Link>

          {!user ? (
            <Button
              className="button"
              size="sm"
              onClick={() => {
                navigate("/login");
                close();
              }}
            >
              Iniciar Sesión
            </Button>
          ) : (
            <>
              <div className="d-flex align-item-center" style={{ gap: 8 }}>
                <span className="small text-muted span-custom-right">{`¡Hola, ${user.name}!`}</span>
              </div>

              <Button
                className="button"
                size="sm"
                onClick={() => {
                  logout();
                  navigate("/");
                  close();
                }}
              >
                Cerrar Sesión
              </Button>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
