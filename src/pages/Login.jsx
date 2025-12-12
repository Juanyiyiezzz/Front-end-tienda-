import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import axiosInstance from '../services/api';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Por favor completa todos los campos.');
      return;
    }

    // Llamada al backend
    const doLogin = async () => {
      try {
        // Enviar `contrasena` (sin ñ) y `contraseña` por compatibilidad
        const body = { correo: email, contrasena: password, contraseña: password };
        const res = await axiosInstance.post('/login', body);
        const data = res.data;
        if (data.token) {
          // Guardar token y configurar header por defecto
          localStorage.setItem('token', data.token);
          axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
          setError('');
          navigate('/dashboard');
        } else {
          setError(data.message || 'Error en autenticación');
        }
      } catch (err) {
        const msg = err.response?.data?.message || err.message || 'Error en la solicitud';
        setError(msg);
      }
    };

    doLogin();
  };

  return (
    <div className="auth-layout">
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={4}>
            <Card>
              <Card.Body>
                <Card.Title className="mb-4 text-center">Iniciar sesión</Card.Title>
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
                    <Button type="submit" variant="primary">
                      Entrar
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


