import { Alert, Button, Card, Col, Form, Row, Spinner } from "react-bootstrap";
import useLogin from "./useLogin";
import "../../assets/css/Login.css";

const Login = () => {
  const {
    user,
    setUser,
    password,
    setPassword,
    messageError,
    handleSubmit,
    loading,
  } = useLogin();

  return (
    <Row className="min-vh-100 justify-content-center align-items-center">
      <Col xs={12} sm={10} md={8} lg={6} xl={4}>
        <Card className="shadow login-card">
          <Card.Body className="p-5">
            <h2 className="text-center mb-4">Iniciar Sesión</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Usuario</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese su usuario"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Ingrese su contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              {messageError && <Alert variant="danger">{messageError}</Alert>}

              <div className="w-100">
                <Button
                  className="w-100"
                  type="submit"
                  variant="primary"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spinner
                        animation="border"
                        aria-hidden="true"
                        role="status"
                        size="sm"
                      />{" "}
                      Login
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};
export default Login;
