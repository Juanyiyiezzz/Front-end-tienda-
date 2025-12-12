import { useState, useEffect } from 'react';
import { Table, Button, Modal, Alert } from 'react-bootstrap';
import CrearUsuario from './CrearUsuario';
import EditarUsuario from './EditarUsuario';
import { getData, createData, updateData, deleteData } from '../../api/apiService';

const ListaUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [alert, setAlert] = useState({ show: false, variant: 'success', message: '' });

  const handleCrear = (nuevo) => {
    const create = async () => {
      try {
        // Provide minimal required fields expected by backend
        const payload = {
          nombre: nuevo.nombre || nuevo.name,
          apellido: nuevo.apellido || '',
          documento: `dev-${Date.now()}`,
          correo: nuevo.email,
          contrasena: 'abc123',
          rol: nuevo.rol || 'Cliente',
          fecha_nacimiento: '1990-01-01'
        };
        const res = await createData('/usuarios', payload);
        setUsuarios((prev) => [...prev, res.data || res]);
        setAlert({ show: true, variant: 'success', message: 'Usuario creado correctamente.' });
      } catch (err) {
        setAlert({ show: true, variant: 'danger', message: err?.response?.data?.message || 'Error al crear usuario' });
      }
    };
    create();
  };

  const handleEditar = (editado) => {
    const doUpdate = async () => {
      try {
        const res = await updateData(`/usuarios/${editado.id}`, editado);
        const newUsuario = res.data || res;
        setUsuarios((prev) => prev.map((u) => (u.id_usuario === newUsuario.id_usuario ? newUsuario : u)));
        setAlert({ show: true, variant: 'info', message: 'Usuario actualizado.' });
        setSelected(null);
      } catch (err) {
        setAlert({ show: true, variant: 'danger', message: err?.response?.data?.message || 'Error al actualizar usuario' });
      }
    };
    doUpdate();
  };

  const handleConfirmDelete = () => {
    const doDelete = async () => {
      try {
        if (selected) {
          await deleteData(`/usuarios/${selected.id_usuario ?? selected.id}`);
          setUsuarios((prev) => prev.filter((u) => (u.id_usuario ?? u.id) !== (selected.id_usuario ?? selected.id)));
          setAlert({ show: true, variant: 'danger', message: 'Usuario eliminado.' });
          setSelected(null);
        }
      } catch (err) {
        setAlert({ show: true, variant: 'danger', message: err?.response?.data?.message || 'Error al eliminar usuario' });
      } finally {
        setShowDelete(false);
      }
    };
    doDelete();
  };

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getData('/usuarios');
        setUsuarios(res.data || res || []);
      } catch (err) {
        setAlert({ show: true, variant: 'danger', message: 'Error al cargar usuarios' });
      }
    };
    load();
  }, []);

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
              <td>{u.correo ?? u.email}</td>
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


