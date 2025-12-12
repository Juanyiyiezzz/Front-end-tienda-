import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import api from '../services/api';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const authContext = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Por favor completa todos los campos.');
      return;
    }

    // Llamada al backend
    const doLogin = async () => {
      try {
        // Use auth context login action
        await authContext.login(email, password);
        setError('');
        navigate('/dashboard');
      } catch (err) {
        const msg = err?.response?.data?.message || err?.message || 'Error en la solicitud';
        setError(msg);
      }
    };

    doLogin();
  };

  const handleDemoLogin = async () => {
    try {
      await authContext.login('admin@gmail.com', 'abc123');
      navigate('/dashboard');
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || 'Error en demo login';
      setError(msg);
    }
  };

  return (
    <div className="login-bg">
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={4}>
            <Card className="login-card">
              <Card.Body>
                <div className="login-illustration mb-3 d-flex justify-content-center align-items-center">
                  <img src="/vite.svg" alt="logo" width={72} />
                </div>
                <Card.Title className="mb-4 login-title">Iniciar sesión</Card.Title>
                {error && (
                  <Alert variant="danger" onClose={() => setError('')} dismissible>
                    {error}
                  </Alert>
                )}
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="correo@ejemplo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Tu contraseña"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <div className="d-grid">
                    <Button type="submit" variant="primary" className="custom">
                      Entrar
                    </Button>
                    <Button variant="outline-primary" className="mt-2" onClick={handleDemoLogin}>
                      Login demo
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      </div>
  );
};

export default Login;


