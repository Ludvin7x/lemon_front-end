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
  Pagination,
} from "react-bootstrap";
import { fetchUnsplashImage } from "../api/getUnsplashImage";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { useUser } from "../../contexts/UserContext";
import { useToast } from "../../contexts/ToastContext";

const PAGE_SIZE = 10;                     // debe coincidir con tu paginador Django

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [images, setImages] = useState({});
  const [quantities, setQuantities] = useState({});
  const [adding, setAdding] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { user } = useUser();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  /* ──────── Petición al backend + imágenes ──────── */
  const fetchMenu = async (targetPage = 1) => {
    try {
      setLoading(true);
      const res = await fetch(
        `${API_URL}/api/menu-items/?page=${targetPage}`
      );
      if (!res.ok) throw new Error("Failed to fetch menu");

      const data = await res.json();
      setMenuItems(data.results);
      setTotalPages(Math.ceil(data.count / PAGE_SIZE));
      setPage(targetPage);

      /* imágenes en paralelo: título + categoría  */
      const imgs = await Promise.all(
        data.results.map(async (item) => {
          const categoryName =
            typeof item.category === "string"
              ? item.category
              : item.category?.title || item.category?.slug || "";
          const query = `${item.title} ${categoryName}`.trim();
          const url = await fetchUnsplashImage(query, item.id);
          return { id: item.id, url };
        })
      );

      /* Se guardan en un map para acceso O(1) */
      const map = {};
      const qty = {};
      imgs.forEach(({ id, url }) => {
        map[id] = url;
        qty[id] = 1;
      });
      setImages(map);
      setQuantities(qty);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu(1);
  }, [API_URL]);

  /* ──────── Helpers ──────── */
  const handleQuantityChange = (id, value) => {
    const qty = Math.max(1, Math.min(99, parseInt(value) || 1));
    setQuantities((prev) => ({ ...prev, [id]: qty }));
  };

  const handleAddToCart = async (item) => {
    if (!user) return navigate("/login");
    setAdding((prev) => ({ ...prev, [item.id]: true }));
    const qty = quantities[item.id] || 1;
    const { ok } = await addToCart(item, qty);
    showToast(
      ok
        ? `${qty} × ${item.title} added to cart!`
        : `Failed to add ${item.title} to cart.`,
      ok ? "success" : "danger"
    );
    setAdding((prev) => ({ ...prev, [item.id]: false }));
  };

  const handleViewMore = (id) => navigate(`/menu/${id}`);
  const gotoPage = (p) => p >= 1 && p <= totalPages && fetchMenu(p);

  /* ──────── Render ──────── */
  if (loading)
    return (
      <div className="text-center my-5">
        <Spinner animation="border" />
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
        {menuItems.map((item) => {
          const categoryName =
            typeof item.category === "string"
              ? item.category
              : item.category?.title || item.category?.slug || "";
          return (
            <Col key={item.id}>
              <Card className="h-100 shadow-sm">
                <Card.Img
                  variant="top"
                  src={images[item.id]}
                  alt={item.title}
                  loading="lazy"
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{item.title}</Card.Title>
                  {categoryName && (
                    <Card.Text className="text-muted text-capitalize">
                      {categoryName}
                    </Card.Text>
                  )}
                  <Card.Text className="flex-grow-1">
                    {item.description}
                  </Card.Text>
                  <div className="fw-bold fs-5 mb-2">
                    ${Number(item.price).toFixed(2)}
                  </div>

                  <InputGroup className="mb-3">
                    <Form.Control
                      type="number"
                      min={1}
                      max={99}
                      value={quantities[item.id]}
                      onChange={(e) =>
                        handleQuantityChange(item.id, e.target.value)
                      }
                      disabled={adding[item.id]}
                    />
                    <Button
                      variant="primary"
                      onClick={() => handleAddToCart(item)}
                      disabled={adding[item.id]}
                    >
                      {adding[item.id] ? "Adding..." : "Add to Cart"}
                    </Button>
                  </InputGroup>

                  <Button
                    variant="outline-secondary"
                    onClick={() => handleViewMore(item.id)}
                  >
                    View More
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>

      {totalPages > 1 && (
        <Pagination className="justify-content-center mt-4">
          <Pagination.Prev
            disabled={page === 1}
            onClick={() => gotoPage(page - 1)}
          />
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <Pagination.Item
              key={n}
              active={n === page}
              onClick={() => gotoPage(n)}
            >
              {n}
            </Pagination.Item>
          ))}
          <Pagination.Next
            disabled={page === totalPages}
            onClick={() => gotoPage(page + 1)}
          />
        </Pagination>
      )}
    </Container>
  );
};

export default MenuPage;