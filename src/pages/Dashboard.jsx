import { Container, Row, Col, Card } from 'react-bootstrap';

const Dashboard = () => {
  const stats = [
    { title: 'Usuarios', value: 120, variant: 'primary' },
    { title: 'Productos', value: 58, variant: 'success' },
    { title: 'Pedidos', value: 34, variant: 'warning' },
    { title: 'Pagos pendientes', value: 5, variant: 'danger' },
  ];

  return (
    <Container fluid className="mt-3">
      <h2 className="mb-4">Dashboard</h2>
      <Row className="g-3">
        {stats.map((s) => (
          <Col key={s.title} xs={12} md={6} lg={3}>
            <Card bg={s.variant} text="white">
              <Card.Body>
                <Card.Title>{s.title}</Card.Title>
                <Card.Text className="fs-3 fw-bold">{s.value}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Dashboard;


