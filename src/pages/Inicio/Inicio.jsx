import { Helmet } from "react-helmet-async";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../assets/css/Inicio.css";

const CATEGORIES = [
  {
    key: "mujer",
    title: "Mujer",
    subtitle: "Últimas novedades",
    img: "https://cdn-static.farfetch-contents.com/cms-ccloud/caas/v1/media/10237870/data/8d586afc805ba8fa94ebc71547f5dd47/3x4_four-columns/480/no-search-results-women-clothing.jpeg",
    alt: "Ropa para mujer",
  },
  {
    key: "hombre",
    title: "Hombre",
    subtitle: "Colección masculina",
    img: "https://cdn-static.farfetch-contents.com/cms-ccloud/caas/v1/media/10238168/data/4ce91ba9be3e9c84335c511eec72aadb/3x4_four-columns/480/no-search-results-men-clothing.jpeg",
    alt: "Ropa para hombre",
  },
  {
    key: "ninos",
    title: "Kids",
    subtitle: "Para los más chicos",
    img: "https://cdn-static.farfetch-contents.com/cms-ccloud/caas/v1/media/10238750/data/c4f3a69822adba9d55b3f49bcefd2008/3x4_four-columns/480/no-search-results-kids-boys.jpeg",
    alt: "Ropa para niños/as",
  },
];

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
                      onError={(e) => {
                        e.currentTarget.style.backgroundColor = "#f2f2f2";
                        e.currentTarget.src =
                          "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%221200%22%20height%3D%22750%22%20xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%23eee%22%22/%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20dominant-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22%23999%22%20font-family%3D%22Arial%2C%20sans-serif%22%20font-size%3D%2240%22%3EImagen%20no%20disponible%3C/text%3E%3C/svg%3E";
                      }}
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
