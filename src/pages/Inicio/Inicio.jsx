import { Helmet } from "react-helmet-async";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CATEGORIES, handleImageError } from "./helpers/inicio.utils";
import "../../assets/css/Inicio.css";

const Inicio = () => {
  return (
    <>
      <Helmet>
        <title>Gérmoni | Tienda de ropa y accesorios de moda</title>
        <meta
          name="description"
          content="Página de inicio de Gérmoni, tienda de ropa y accesorios de moda."
        />
      </Helmet>

      <main className="inicio-main">
        <Container fluid className="hero-container px-0">
          <Row className="gx-0">
            {CATEGORIES.map((c) => (
              <Col
                key={c.key}
                xs={12}
                md={4}
                className="hero-col"
                aria-label={`${c.title} - Ir a ${c.title}`}
              >
                <Link
                  to={`/productos/${c.key}`}
                  className="hero-link"
                  aria-label={`Ir a ${c.title}`}
                >
                  <div className="hero-card">
                    <img
                      className="hero-img"
                      src={c.img}
                      alt={c.alt}
                      loading="lazy"
                      onError={handleImageError}
                    />
                    <div className="hero-overlay">
                      <div className="hero-text">
                        <h3 className="hero-title">{c.title}</h3>
                        <p className="hero-subtitle">{c.subtitle}</p>
                        <Button variant="dark" className="hero-btn">
                          Ver colección
                        </Button>
                      </div>
                    </div>
                  </div>
                </Link>
              </Col>
            ))}
          </Row>
        </Container>

        <section className="py-5 container">
          <h2 className="mb-3">Novedades</h2>
          <p className="text-muted">
            Explora lo último en nuestra tienda. Inicia sesión para ver los
            productos.
          </p>
        </section>
      </main>
    </>
  );
};

export default Inicio;
