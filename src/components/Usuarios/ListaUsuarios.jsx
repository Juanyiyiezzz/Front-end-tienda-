import { useState } from 'react';
import { Table, Button, Modal, Alert } from 'react-bootstrap';
import CrearUsuario from './CrearUsuario';
import EditarUsuario from './EditarUsuario';

const ListaUsuarios = () => {
  const [usuarios, setUsuarios] = useState([
    { id: 1, nombre: 'Juan Pérez', email: 'juan@example.com', rol: 'Admin' },
    { id: 2, nombre: 'Ana Gómez', email: 'ana@example.com', rol: 'Cliente' },
  ]);
  const [selected, setSelected] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [alert, setAlert] = useState({ show: false, variant: 'success', message: '' });

  const handleCrear = (nuevo) => {
    setUsuarios((prev) => [...prev, { ...nuevo, id: Date.now() }]);
    setAlert({ show: true, variant: 'success', message: 'Usuario creado correctamente.' });
  };

  const handleEditar = (editado) => {
    setUsuarios((prev) => prev.map((u) => (u.id === editado.id ? editado : u)));
    setAlert({ show: true, variant: 'info', message: 'Usuario actualizado.' });
    setSelected(null);
  };

  const handleConfirmDelete = () => {
    if (selected) {
      setUsuarios((prev) => prev.filter((u) => u.id !== selected.id));
      setAlert({ show: true, variant: 'danger', message: 'Usuario eliminado.' });
      setSelected(null);
    }
    setShowDelete(false);
  };

  return (
    <div>
      <h2 className="mb-3">Usuarios</h2>
      {alert.show && (
        <Alert
          variant={alert.variant}
          onClose={() => setAlert({ ...alert, show: false })}
          dismissible
        >
          {alert.message}
        </Alert>
      )}
      <CrearUsuario onCrear={handleCrear} />

      <Table striped bordered hover responsive className="mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u, index) => (
            <tr key={u.id}>
              <td>{index + 1}</td>
              <td>{u.nombre}</td>
              <td>{u.email}</td>
              <td>{u.rol}</td>
              <td>
                <div className="table-actions">
                  <Button
                    size="sm"
                    variant="outline-secondary"
                    onClick={() => setSelected(u)}
                  >
                    Editar
                  </Button>
                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() => {
                      setSelected(u);
                      setShowDelete(true);
                    }}
                  >
                    Eliminar
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <EditarUsuario usuario={selected} onGuardar={handleEditar} onClose={() => setSelected(null)} />

      <Modal show={showDelete} onHide={() => setShowDelete(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Seguro que deseas eliminar este usuario?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDelete(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ListaUsuarios;


