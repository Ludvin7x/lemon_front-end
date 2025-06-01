import { useEffect, useState } from "react";
import { Spinner, Card, Button, Container, Row, Col, Alert } from "react-bootstrap";

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  // Función para generar URL de imagen basada en el nombre del plato
  const getImageUrl = (title) => {
    // CDN ejemplo: https://source.unsplash.com/featured/?food,[nombre]
    // Reemplaza espacios por comas para que el CDN busque mejor
    const query = encodeURIComponent(title.split(" ").join(","));
    return `https://source.unsplash.com/400x300/?food,${query}`;
  };

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch(`${API_URL}/api/menu-items/`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || "Error al obtener los datos del menú");
        }
        const data = await response.json();
        setMenuItems(data.results);
      } catch (err) {
        console.error("Error fetching menu:", err);
        setError(err.message || "Error inesperado");
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, [API_URL]);

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" role="status" />
        <p className="mt-3">Cargando menú...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="my-5">
        <Alert.Heading>Error</Alert.Heading>
        <p>{error}</p>
      </Alert>
    );
  }

  return (
    <Container className="my-5">
      <h1 className="mb-4 text-center">Menú</h1>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {menuItems.map((item) => (
          <Col key={item.id}>
            <Card className="h-100 shadow-sm">
              <Card.Img variant="top" src={getImageUrl(item.title)} alt={item.title} />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{item.title}</Card.Title>
                <Card.Text className="flex-grow-1">{item.description}</Card.Text>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="fw-bold fs-5">
                  ${isNaN(Number(item.price)) ? "N/A" : Number(item.price).toFixed(2)}
                </span>
                  <Button variant="primary" onClick={() => alert(`Agregar ${item.title} al carrito`)}>
                    Añadir
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default MenuPage;