import { Container, Row, Col, Nav } from 'react-bootstrap';
import { NavLink, Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <Container fluid className="dashboard-layout">
      <Row>
        <Col xs={12} md={3} lg={2} className="sidebar p-3">
          <h4 className="mb-4">Tienda Admin</h4>
          <Nav className="flex-column" variant="pills">
            <Nav.Link as={NavLink} to="/dashboard">
              Dashboard
            </Nav.Link>
            <Nav.Link as={NavLink} to="/usuarios">
              Usuarios
            </Nav.Link>
            <Nav.Link as={NavLink} to="/categorias">
              Categorías
            </Nav.Link>
            <Nav.Link as={NavLink} to="/productos">
              Productos
            </Nav.Link>
            <Nav.Link as={NavLink} to="/personalizaciones">
              Personalizaciones
            </Nav.Link>
            <Nav.Link as={NavLink} to="/carrito">
              Carrito
            </Nav.Link>
            <Nav.Link as={NavLink} to="/detalle-carrito">
              Detalle carrito
            </Nav.Link>
            <Nav.Link as={NavLink} to="/detalle-pedido">
              Detalle pedido
            </Nav.Link>
            <Nav.Link as={NavLink} to="/pago">
              Pago
            </Nav.Link>
          </Nav>
        </Col>
        <Col xs={12} md={9} lg={10} className="content-wrapper">
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};

export default MainLayout;


