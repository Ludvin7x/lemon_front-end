import { useState, useEffect, useCallback, useRef } from "react";
import {
  Button,
  ButtonGroup,
  Spinner,
  Container,
  Row,
  Col,
  Alert,
  InputGroup,
  Form,
  Card,
  Pagination,
} from "react-bootstrap";
import { ClockClockwise } from "phosphor-react";
import { getImage } from "../api/images/getImage";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { useUser } from "../../contexts/UserContext";
import { useToast } from "../../contexts/ToastContext";

const PAGE_SIZE = 10;

const MenuPage = () => {
  /* ──────────── Estados ──────────── */
  const [menuItems, setMenuItems] = useState([]);
  const [images, setImages] = useState({});
  const [quantities, setQuantities] = useState({});
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* ──────────── Contextos ──────────── */
  const { user } = useUser();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  /* ──────────── Refs de control ──────────── */
  const lastFetchRef = useRef({ page: null, category: null });
  const imagesCacheRef = useRef({}); // cache de imágenes

  /* ──────────── Fetch menú ──────────── */
  const fetchMenu = useCallback(
    async (pageNum = 1, categorySlug = "all") => {
      // evita llamadas duplicadas
      if (
        lastFetchRef.current.page === pageNum &&
        lastFetchRef.current.category === categorySlug
      )
        return;

      lastFetchRef.current = { page: pageNum, category: categorySlug };

      try {
        setLoading(true);
        setError(null);

        let url = `${API_URL}/api/menu-items/?page=${pageNum}`;
        if (categorySlug !== "all") url += `&category=${categorySlug}`;

        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch menu");

        const data = await res.json();
        setMenuItems(data.results);
        setTotalPages(Math.ceil(data.count / PAGE_SIZE));
        setPage(pageNum);

        /* ── Cargar imágenes (con cache) ── */
        const imgs = await Promise.all(
          data.results.map(async (item) => {
            if (imagesCacheRef.current[item.id]) {
              return { id: item.id, url: imagesCacheRef.current[item.id] };
            }
            const categoryName =
              typeof item.category === "string"
                ? item.category
                : item.category?.title || item.category?.slug || "";
            const query = `${item.title} ${categoryName}`.trim();
            const url = await getImage(query, item.id);
            imagesCacheRef.current[item.id] = url;
            return { id: item.id, url };
          })
        );

        const map = {};
        const qtyMap = {};
        imgs.forEach(({ id, url }) => {
          map[id] = url;
          qtyMap[id] = quantities[id] || 1;
        });
        setImages(map);
        setQuantities(qtyMap);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [API_URL, quantities]
  );

  /* ──────────── Fetch categorías ──────────── */
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_URL}/api/categories/`);
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data = await res.json();
        setCategories(Array.isArray(data.results) ? data.results : []);
      } catch (err) {
        console.error("Error loading categories:", err);
      }
    };
    fetchCategories();
  }, [API_URL]);

  /* ──────────── Carga inicial & cambio de categoría ──────────── */
  useEffect(() => {
    fetchMenu(1, selectedCategory);
  }, [selectedCategory, fetchMenu]);

  /* ──────────── Handlers ──────────── */
  const handleCategorySelect = (slug) => setSelectedCategory(slug);

  const handleQuantityChange = (id, value) => {
    const qty = Math.max(1, Math.min(99, parseInt(value) || 1));
    setQuantities((prev) => ({ ...prev, [id]: qty }));
  };

  const handleAddToCart = async (item) => {
    if (!user) return navigate("/login");
    const qty = quantities[item.id] || 1;
    const { ok } = await addToCart(item, qty);
    showToast(
      ok
        ? `${qty} × ${item.title} added to cart!`
        : `Failed to add ${item.title} to cart.`,
      ok ? "success" : "danger"
    );
  };

  const handleViewMore = (id) => navigate(`/menu/${id}`);

  const gotoPage = (p) =>
    p >= 1 && p <= totalPages && fetchMenu(p, selectedCategory);

  /* ──────────── Render ──────────── */
  if (loading)
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "60vh" }}
      >
        <Card className="text-center p-4 shadow-sm">
          <Card.Body>
            <ClockClockwise
              size={48}
              weight="duotone"
              className="mb-3 text-primary"
            />
            <Card.Text className="mb-3 fw-semibold">
              The backend automatically deactivates after 15&nbsp;minutes of
              inactivity and is now waking up. This may take a few seconds…
            </Card.Text>
            <Spinner animation="border" />
          </Card.Body>
        </Card>
      </Container>
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
      <h1 className="text-center mb-4">Menu</h1>

      {/* Botones de Categoría */}
      <div className="text-center mb-4">
        <ButtonGroup>
          <Button
            variant={selectedCategory === "all" ? "primary" : "outline-primary"}
            onClick={() => handleCategorySelect("all")}
          >
            All
          </Button>
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={
                selectedCategory === cat.slug ? "primary" : "outline-primary"
              }
              onClick={() => handleCategorySelect(cat.slug)}
            >
              {cat.title}
            </Button>
          ))}
        </ButtonGroup>
      </div>

      {/* Tarjetas de menú */}
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
                    />
                    <Button onClick={() => handleAddToCart(item)}>Add</Button>
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

      {/* Paginación */}
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