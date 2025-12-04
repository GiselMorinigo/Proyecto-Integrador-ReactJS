import { Alert, Button, Card, Col, Form, Row, Spinner } from "react-bootstrap";
import useLogin from "./useLogin";
import "../../assets/css/Login.css";

const Login = () => {
  const {
    user,
    setUser,
    password,
    setPassword,
    errors,
    handleSubmit,
    loading,
  } = useLogin();

  return (
    <Row className="min-vh-100 justify-content-center align-items-center">
      <Col xs={12} sm={10} md={8} lg={5} xl={4}>
        <Card className="card-elegante">
          <Card.Body className="p-5">
            <h2 className="text-center mb-4 login-title">Iniciar Sesión</h2>

            <Form onSubmit={handleSubmit} noValidate className="form-elegante">
              <Form.Group className="mb-3" controlId="loginUser">
                <Form.Label>Usuario</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese su usuario"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  isInvalid={!!errors.user}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.user}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="loginPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Ingrese su contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>

              <div className="w-100">
                <Button
                  className="btn-elegante w-100"
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
