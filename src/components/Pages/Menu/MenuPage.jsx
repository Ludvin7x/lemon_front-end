import { useState, useEffect, useCallback, useRef } from "react";
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

  const fetchMenu = useCallback(async (pageNum = 1, categorySlug = "all") => {
    if (
      lastFetchRef.current.page === pageNum &&
      lastFetchRef.current.category === categorySlug
    ) return;

    lastFetchRef.current = { page: pageNum, category: categorySlug };
    setLoading(true);
    setError(null);

    try {
      let url = `${API_URL}/api/menu-items/?page=${pageNum}`;
      if (categorySlug !== "all") url += `&category=${categorySlug}`;

      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch menu");

      const data = await res.json();
      setMenuItems(data.results);
      setTotalPages(Math.ceil(data.count / PAGE_SIZE));
      setPage(pageNum);

      const imgs = await Promise.all(
        data.results.map(async (item) => {
          if (imagesCacheRef.current[item.id]) {
            return { id: item.id, url: imagesCacheRef.current[item.id] };
          }
          const categoryName = typeof item.category === "string"
            ? item.category
            : item.category?.title || item.category?.slug || "";
          const query = `${item.title} ${categoryName}`.trim();
          const url = await getImage(query, item.id);
          imagesCacheRef.current[item.id] = url;
          return { id: item.id, url };
        })
      );

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
  }, [API_URL]);

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

  useEffect(() => {
    setSearchTerm("");
    setSortField(null);
    setSortDirection("asc");
    fetchMenu(1, selectedCategory);
  }, [selectedCategory, fetchMenu]);

  const filteredSortedItems = menuItems
    .filter((item) =>
      item.title.toLowerCase().includes(searchTerm.trim().toLowerCase())
    )
    .sort((a, b) => {
      if (!sortField) return 0;
      let aVal = sortField === "price" ? Number(a.price) : a.title.toLowerCase();
      let bVal = sortField === "price" ? Number(b.price) : b.title.toLowerCase();
      return sortDirection === "asc"
        ? aVal > bVal ? 1 : -1
        : aVal < bVal ? 1 : -1;
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
      ok ? `${qty} × ${item.title} added to cart!` : `Failed to add ${item.title} to cart.`,
      ok ? "success" : "danger"
    );
  };

  const handleViewMore = (item) => navigate("/menu/" + item.id, { state: { item } });

  const gotoPage = (p) => {
    if (p >= 1 && p <= totalPages) fetchMenu(p, selectedCategory);
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

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-4 p-6">
        <ClockClockwise size={48} weight="duotone" className="text-primary" />
        <p className="text-muted-foreground font-semibold max-w-lg">
          The backend is waking up. This may take a few seconds…
        </p>
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-destructive text-destructive-foreground rounded-md p-4 my-6 text-center max-w-xl mx-auto">
        <h2 className="font-bold text-lg">Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Menu</h1>

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

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-6">
        {filteredSortedItems.length === 0 ? (
          <div className="col-span-full text-center text-yellow-600 font-medium bg-yellow-100 border border-yellow-300 rounded p-4">
            No items found
          </div>
        ) : (
          filteredSortedItems.map((item) => (
            <MenuItemCard
              key={item.id}
              item={item}
              image={images[item.id]}
              quantity={quantities[item.id] || 1}
              onQuantityChange={handleQuantityChange}
              onAddToCart={handleAddToCart}
              onViewMore={() => handleViewMore(item)}
            />
          ))
        )}
      </div>

      <MenuPagination
        page={page}
        totalPages={totalPages}
        onPageChange={gotoPage}
      />
    </div>
  );
};

export default MenuPage;