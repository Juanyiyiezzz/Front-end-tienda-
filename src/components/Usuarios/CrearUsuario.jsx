import { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';

const CrearUsuario = ({ onCrear }) => {
  const [form, setForm] = useState({ nombre: '', email: '', rol: 'Cliente' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCrear(form);
    setForm({ nombre: '', email: '', rol: 'Cliente' });
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Crear usuario</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-2">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Rol</Form.Label>
            <Form.Select name="rol" value={form.rol} onChange={handleChange}>
              <option>Admin</option>
              <option>Cliente</option>
            </Form.Select>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button type="submit" variant="primary" size="sm">
              Guardar
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default CrearUsuario;


