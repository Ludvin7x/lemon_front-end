import { useEffect, useState, useContext } from "react";
import {
  Spinner,
  Card,
  Button,
  Container,
  Row,
  Col,
  Alert,
  Form,
  InputGroup,
} from "react-bootstrap";
import { fetchUnsplashImage } from "../api/getUnsplashImage";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { useUser } from "../../contexts/UserContext";


const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [images, setImages] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantities, setQuantities] = useState({});
  const { user, logout } = useUser();

  const { addToCart } = useCart();
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

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

        const newImages = {};
        const newQuantities = {};

        for (const item of data.results) {
          const imageUrl = await fetchUnsplashImage(item.title);
          newImages[item.id] = imageUrl;
          newQuantities[item.id] = 1; // valor inicial
        }

        setImages(newImages);
        setQuantities(newQuantities);
      } catch (err) {
        console.error("Error fetching menu:", err);
        setError(err.message || "Error inesperado");
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, [API_URL]);

  const handleQuantityChange = (itemId, value) => {
    setQuantities((prev) => ({
      ...prev,
      [itemId]: Math.max(1, parseInt(value) || 1),
    }));
  };

  const handleAddToCart = (item) => {
  if (!user) {
    navigate("/login");
    return;
  }
  const quantity = quantities[item.id] || 1;
  addToCart({ ...item, quantity });
};

  const handleViewMore = (id) => {
    navigate(`/menu/${id}`);
  };

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
              <Card.Img
                variant="top"
                src={images[item.id]}
                alt={item.title}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{item.title}</Card.Title>
                <Card.Text className="flex-grow-1">
                  {item.description}
                </Card.Text>
                <div className="mb-2">
                  <span className="fw-bold fs-5">
                    ${isNaN(Number(item.price)) ? "N/A" : Number(item.price).toFixed(2)}
                  </span>
                </div>

                <InputGroup className="mb-3">
                  <Form.Control
                    type="number"
                    min={1}
                    value={quantities[item.id]}
                    onChange={(e) =>
                      handleQuantityChange(item.id, e.target.value)
                    }
                  />
                  <Button
                    variant="primary"
                    onClick={() => handleAddToCart(item)}
                  >
                    Añadir al carrito
                  </Button>
                </InputGroup>

                <Button
                  variant="outline-secondary"
                  onClick={() => handleViewMore(item.id)}
                >
                  Ver más
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default MenuPage;