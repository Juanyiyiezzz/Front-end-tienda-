import { useEffect, useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const EditarUsuario = ({ usuario, onGuardar, onClose }) => {
  const [form, setForm] = useState({ nombre: '', email: '', rol: 'Cliente' });

  useEffect(() => {
    if (usuario) {
      // Normalize backend fields (correo) to form's `email`
      setForm({
        nombre: usuario.nombre || usuario.name || '',
        email: usuario.correo || usuario.email || '',
        rol: usuario.rol || 'Cliente',
        id: usuario.id_usuario || usuario.id,
      });
    }
  }, [usuario]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Map email -> correo to match backend expectations
    const payload = {
      ...form,
      correo: form.email,
    };
    delete payload.email;
    onGuardar(payload);
  };

  return (
    <Modal show={!!usuario} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar usuario</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
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
          <Form.Group className="mb-2">
            <Form.Label>Rol</Form.Label>
            <Form.Select name="rol" value={form.rol} onChange={handleChange}>
              <option>Admin</option>
              <option>Cliente</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary">
            Guardar
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditarUsuario;


