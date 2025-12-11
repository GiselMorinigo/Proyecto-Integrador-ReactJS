import {
  Card,
  Form,
  Button,
  Container,
  Row,
  Col,
  Image,
} from "react-bootstrap";
import useProductoForm from "./useCrearProducto";
import { CATEGORIES } from "../helpers/productForm.utils";
import "../../../assets/css/Productos.css";

const CrearProducto = ({
  onAgregar,
  modo = "create",
  initialValues = null,
}) => {
  const {
    formValues,
    validated,
    isPriceValid,
    validImageUrl,
    showPreview,
    handleChange,
    handleSubmit,
    handleCancel,
  } = useProductoForm({ modo, initialValues, onAgregar });

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card className="card-form">
            <Card.Body className="p-5">
              <Card.Title className="mb-3">
                {modo === "edit" ? "Editar producto" : "Crear producto"}
              </Card.Title>

              <Form
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
                className="form"
              >
                <Form.Group className="mb-3" controlId="productName">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="nombre"
                    placeholder="Ej: Dolce & Gabbana"
                    value={formValues.nombre}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    El nombre es obligatorio.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="productSubtitle">
                  <Form.Label>Subtítulo</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="subtitulo"
                    placeholder="Ej: Buzo con logo estampado"
                    value={formValues.subtitulo}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    El subtítulo es obligatorio.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="productPrice">
                  <Form.Label>Precio</Form.Label>
                  <Form.Control
                    required
                    type="number"
                    name="precio"
                    min="0.01"
                    step="0.01"
                    placeholder="Ej: 1999.99"
                    value={formValues.precio}
                    onChange={handleChange}
                    isInvalid={validated && !isPriceValid}
                  />
                  <Form.Control.Feedback type="invalid">
                    Ingresá un precio válido mayor a 0.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="productImageUrl">
                  <Form.Label>URL de la imagen</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="imagenUrl"
                    placeholder="Ej: https://mis-imagenes.com/camiseta.png"
                    value={formValues.imagenUrl}
                    onChange={handleChange}
                    isInvalid={validated && !validImageUrl}
                  />
                  <Form.Control.Feedback type="invalid">
                    Ingresá una URL válida que comience con http o https.
                  </Form.Control.Feedback>
                </Form.Group>

                {showPreview && (
                  <div className="text-center mb-3 preview-container">
                    <Image
                      src={formValues.imagenUrl}
                      alt="Previsualización del producto"
                      fluid
                      rounded
                      style={{
                        maxHeight: "200px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                )}

                <Form.Group className="mb-3" controlId="productDescription">
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="descripcion"
                    required
                    placeholder="Ej: Buzo de algodón 100%..."
                    value={formValues.descripcion}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    La descripción es obligatoria.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="productCategory">
                  <Form.Label>Categoría</Form.Label>
                  <Form.Select
                    name="categoria"
                    required
                    value={formValues.categoria}
                    onChange={handleChange}
                    aria-label="Seleccionar categoría"
                  >
                    <option value="" disabled>
                      Seleccioná una categoría
                    </option>
                    {CATEGORIES.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    La categoría es obligatoria.
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="d-flex justify-content-end">
                  <Button
                    className="cancel-button"
                    size="sm"
                    variant="outline-dark"
                    onClick={handleCancel}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    size="sm"
                    className="button"
                  >
                    {modo === "edit" ? "Guardar cambios" : "Agregar producto"}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CrearProducto;
