import { useEffect, useState } from "react";
import {
  Card,
  Form,
  Button,
  Container,
  Row,
  Col,
  Image,
} from "react-bootstrap";

const INITIAL_VALUES = {
  nombre: "",
  subtitulo: "",
  precio: "",
  descripcion: "",
  imagenUrl: "",
};

const CrearProducto = ({
  onAgregar,
  modo = "create",
  initialValues = null,
}) => {
  const [formValues, setFormValues] = useState(INITIAL_VALUES);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (modo === "edit" && initialValues) {
      setFormValues(initialValues);
    } else {
      setFormValues(INITIAL_VALUES);
    }
  }, [modo, initialValues]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const priceNumber = parseFloat(formValues.precio);
  const isPriceValid = !Number.isNaN(priceNumber) && priceNumber > 0;

  const isImageUrlValid = () => {
    const url = formValues.imagenUrl.trim();
    if (!url) return false;

    return /^https?:\/\/.+/i.test(url);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    const validPrice = isPriceValid;
    const validImageUrl = isImageUrlValid();

    if (form.checkValidity() === false || !validPrice || !validImageUrl) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(true);

    const nuevoProducto = {
      nombre: formValues.nombre.trim(),
      subtitulo: formValues.subtitulo.trim(),
      precio: priceNumber,
      descripcion: formValues.descripcion.trim(),
      imagenUrl: formValues.imagenUrl.trim(),
    };

    await onAgregar?.(nuevoProducto);

    if (modo === "create") {
      setFormValues(INITIAL_VALUES);
      setValidated(false);
    }
  };

  const showPreview = isImageUrlValid();

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card className="shadow-sm border-0">
            <Card.Body className="p-4">
              <Card.Title className="mb-3">
                {" "}
                {modo === "edit" ? "Editar producto" : "Crear producto"}{" "}
              </Card.Title>

              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                {/* Nombre */}
                <Form.Group className="mb-3" controlId="productName">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="nombre"
                    placeholder="Ej: Taza decorativa"
                    value={formValues.nombre}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    El nombre es obligatorio.
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Subtitulo */}
                <Form.Group className="mb-3" controlId="productSubtitle">
                  <Form.Label>Subtitulo</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="subtitulo"
                    placeholder="Ingrese subtítulo"
                    value={formValues.subtitulo}
                    onChange={handleChange}
                  />
                </Form.Group>

                {/* Precio */}
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

                {/* Imagen URL */}
                <Form.Group className="mb-3" controlId="productImageUrl">
                  <Form.Label>URL de la imagen</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="imagenUrl"
                    placeholder="Ej: https://mis-imagenes.com/taza.png"
                    value={formValues.imagenUrl}
                    onChange={handleChange}
                    isInvalid={validated && !isImageUrlValid()}
                  />
                  <Form.Control.Feedback type="invalid">
                    Ingresá una URL válida que comience con http o https.
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Previsualización */}
                {showPreview && (
                  <div className="text-center mb-3">
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

                {/* Descripción */}
                <Form.Group className="mb-3" controlId="productDescription">
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="descripcion"
                    required
                    placeholder="Ej: Taza de cerámica de 300ml"
                    value={formValues.descripcion}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    La descripción es obligatoria.
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="d-flex justify-content-end">
                  <Button type="submit" variant="primary">
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
