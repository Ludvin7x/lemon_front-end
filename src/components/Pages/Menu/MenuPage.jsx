import { useState, useEffect, useCallback, useRef } from "react";
import { Container, Row, Col, Alert, Spinner } from "react-bootstrap";
import { ClockClockwise } from "phosphor-react";
import { getImage } from "../../api/images/getImage";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../contexts/CartContext";
import { useUser } from "../../../contexts/UserContext";
import { useToast } from "../../../contexts/ToastContext";

import MenuSearch from "./MenuSearch";
import MenuCategoryFilter from "./MenuCategoryFilter";
import MenuSortButtons from "./MenuSortButtons";
import MenuItemCard from "./MenuItemCard";
import MenuPagination from "./MenuPagination";

const PAGE_SIZE = 10;

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [images, setImages] = useState({});
  const [quantities, setQuantities] = useState({});
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user } = useUser();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const lastFetchRef = useRef({ page: null, category: null });
  const imagesCacheRef = useRef({});

  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  const fetchMenu = useCallback(
    async (pageNum = 1, categorySlug = "all") => {
      
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

        // Obtener imágenes y cachearlas
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

        // Mapear imágenes y cantidades (preservar cantidades previas)
        setImages((prev) => {
          const newImages = { ...prev };
          imgs.forEach(({ id, url }) => (newImages[id] = url));
          return newImages;
        });

        setQuantities((prev) => {
          const newQty = { ...prev };
          imgs.forEach(({ id }) => {
            if (!newQty[id]) newQty[id] = 1;
          });
          return newQty;
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [API_URL]
  );

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

  // Cuando cambia la categoría, resetear filtros y buscar menú
  useEffect(() => {
    setSearchTerm("");
    setSortField(null);
    setSortDirection("asc");
    fetchMenu(1, selectedCategory);
  }, [selectedCategory, fetchMenu]);

  // Filtrado y ordenamiento local
  const filteredSortedItems = menuItems
    .filter((item) =>
      item.title.toLowerCase().includes(searchTerm.trim().toLowerCase())
    )
    .sort((a, b) => {
      if (!sortField) return 0;
      let aVal = sortField === "price" ? Number(a.price) : a.title.toLowerCase();
      let bVal = sortField === "price" ? Number(b.price) : b.title.toLowerCase();

      if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

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

  const gotoPage = (p) => {
    if (p >= 1 && p <= totalPages) {
      fetchMenu(p, selectedCategory);
    }
  };

  const handleSearchChange = (value) => setSearchTerm(value);
  const clearSearch = () => setSearchTerm("");
  const toggleSort = (field) => {
    if (sortField === field) {
      setSortDirection((dir) => (dir === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  if (loading)
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "60vh" }}
      >
        <div className="text-center p-4 shadow-sm">
          <ClockClockwise
            size={48}
            weight="duotone"
            className="mb-3 text-primary"
          />
          <p className="mb-3 fw-semibold">
            The backend automatically deactivates after 15 minutes of
            inactivity and is now waking up. This may take a few seconds…
          </p>
          <Spinner animation="border" />
        </div>
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

      <MenuSearch
        value={searchTerm}
        onChange={handleSearchChange}
        onClear={clearSearch}
      />

      <MenuCategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategorySelect}
      />

      <MenuSortButtons
        sortField={sortField}
        sortDirection={sortDirection}
        onToggleSort={toggleSort}
      />

      <Row className="g-4">
        {filteredSortedItems.length === 0 ? (
          <Col>
            <Alert variant="warning" className="text-center">
              No items found
            </Alert>
          </Col>
        ) : (
          filteredSortedItems.map((item) => (
            <Col key={item.id} xs={6} sm={6} md={4} lg={3}>
              <MenuItemCard
                item={item}
                image={images[item.id]}
                quantity={quantities[item.id] || 1}
                onQuantityChange={handleQuantityChange}
                onAddToCart={handleAddToCart}
                onViewMore={handleViewMore}
              />
            </Col>
          ))
        )}
      </Row>

      <MenuPagination page={page} totalPages={totalPages} onPageChange={gotoPage} />
    </Container>
  );
};

export default MenuPage;