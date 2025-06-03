import { useEffect, useState } from "react";
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
import { useToast } from "../../contexts/ToastContext";

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [images, setImages] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [addingToCart, setAddingToCart] = useState({});

  const { user } = useUser();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch(`${API_URL}/api/menu-items/`);
        if (!res.ok) throw new Error("Failed to fetch menu");
        const data = await res.json();
        setMenuItems(data.results);

        // Paralelizar carga de imágenes
        const imgs = await Promise.all(
          data.results.map(async (item) => ({
            id: item.id,
            url: await fetchUnsplashImage(item.title),
          }))
        );

        const imgsMap = {};
        const qtys = {};
        imgs.forEach(({ id, url }) => {
          imgsMap[id] = url;
          qtys[id] = 1;
        });

        setImages(imgsMap);
        setQuantities(qtys);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, [API_URL]);

  const handleQuantityChange = (id, value) => {
    let qty = parseInt(value);
    if (isNaN(qty) || qty < 1) qty = 1;
    else if (qty > 99) qty = 99; // tope máximo arbitrario
    setQuantities((q) => ({ ...q, [id]: qty }));
  };

  const handleAddToCart = async (item) => {
    if (!user) {
      navigate("/login");
      return;
    }
    setAddingToCart((prev) => ({ ...prev, [item.id]: true }));

    const qty = quantities[item.id] || 1;
    const { ok } = await addToCart(item, qty);
    if (ok) {
      showToast(`${qty} × ${item.title} added to cart successfully!`, "success");
    } else {
      showToast(`Failed to add ${item.title} to cart.`, "danger");
    }

    setAddingToCart((prev) => ({ ...prev, [item.id]: false }));
  };

  const handleViewMore = (id) => navigate(`/menu/${id}`);

  if (loading)
    return (
      <div className="text-center my-5">
        <Spinner animation="border" role="status" />
        <p className="mt-3">Loading menu...</p>
      </div>
    );
  if (error)
    return (
      <Alert variant="danger" className="my-5">
        <Alert.Heading>Error</Alert.Heading>
        <p>{error}</p>
      </Alert>
    );

  return (
    <Container className="my-5">
      <h1 className="mb-4 text-center">Menu</h1>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {menuItems.map((item) => (
          <Col key={item.id}>
            <Card className="h-100 shadow-sm">
              <Card.Img variant="top" src={images[item.id]} alt={item.title} />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{item.title}</Card.Title>
                <Card.Text className="flex-grow-1">{item.description}</Card.Text>
                <div className="mb-2">
                  <span className="fw-bold fs-5">${Number(item.price).toFixed(2)}</span>
                </div>
                <InputGroup className="mb-3">
                  <Form.Control
                    type="number"
                    min={1}
                    max={99}
                    aria-label={`Quantity for ${item.title}`}
                    value={quantities[item.id]}
                    onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                    disabled={addingToCart[item.id]}
                  />
                  <Button
                    variant="primary"
                    onClick={() => handleAddToCart(item)}
                    disabled={addingToCart[item.id]}
                  >
                    {addingToCart[item.id] ? "Adding..." : "Add to Cart"}
                  </Button>
                </InputGroup>
                <Button variant="outline-secondary" onClick={() => handleViewMore(item.id)}>
                  View More
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