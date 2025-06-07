import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { getImage } from "../../api/images/getImage";
import { useCart } from "../../../contexts/CartContext";
import { useUser } from "../../../contexts/UserContext";
import { useToast } from "../../../contexts/ToastContext";

const getCategoryName = (category) => {
  if (!category) return "";
  return typeof category === "string" ? category : category.title || category.slug || "";
};

const MenuItemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useUser();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const [item, setItem] = useState(location.state?.item || null);
  const [image, setImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(!item);
  const [adding, setAdding] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (item) {
      const query = `${item.title} ${getCategoryName(item.category)}`.trim();
      getImage(query, item.id).then(setImage);
      setLoading(false);
      return;
    }

    const fetchItem = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/api/menu-items/${id}/`);
        if (!res.ok) throw new Error("Failed to fetch item");
        const data = await res.json();
        setItem(data);

        const query = `${data.title} ${getCategoryName(data.category)}`.trim();
        const imageUrl = await getImage(query, data.id);
        setImage(imageUrl);
      } catch (err) {
        console.error("Error fetching item:", err);
        showToast("Could not load item details.", "danger");
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [API_URL, id, showToast, item]);

  const handleAddToCart = async () => {
    if (!user) return navigate("/login");
    if (quantity < 1 || quantity > 99) {
      showToast("Quantity must be between 1 and 99", "warning");
      return;
    }
    setAdding(true);
    try {
      const { ok } = await addToCart(item, quantity);
      showToast(
        ok ? `${quantity} × ${item.title} added to cart!` : `Failed to add ${item.title} to cart.`,
        ok ? "success" : "danger"
      );
    } catch (error) {
      showToast("Error adding to cart.", "danger");
    } finally {
      setAdding(false);
    }
  };

  const handleQuantityChange = (e) => {
    const val = Math.max(1, Math.min(99, parseInt(e.target.value) || 1));
    setQuantity(val);
  };

  if (loading) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-4 p-6"
        aria-busy="true"
        aria-live="polite"
      >
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-muted-foreground font-semibold">Loading item details...</p>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="text-center text-red-500 mt-10" role="alert">
        <p>Item not found</p>
        <Button onClick={() => navigate("/menuPage", { replace: true })} className="mt-4">
          Back to Menu
        </Button>
      </div>
    );
  }

  return (
    <motion.div
      className="container mx-auto px-4 py-8 max-w-4xl"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Button
        variant="outline"
        onClick={() => navigate("/menuPage")}
        className="mb-6 dark:border-gray-600 dark:text-gray-300"
      >
        ← Back to Menu
      </Button>

      <Card className="flex flex-col md:flex-row gap-6 p-4 md:p-6 rounded-lg shadow-lg
                       bg-white text-gray-900
                       dark:bg-[#0e1a2b] dark:text-white">
        {image && (
          <motion.img
            src={image}
            alt={item.title}
            className="w-full md:w-1/2 rounded-xl object-cover max-h-[240px] md:max-h-[400px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          />
        )}

        <div className="flex-1 flex flex-col justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">{item.title}</h2>
            <p className="text-sm mt-1 capitalize text-gray-600 dark:text-gray-400">
              {getCategoryName(item.category)}
            </p>

            <div className="h-px bg-gray-300 my-4 dark:bg-gray-700" />

            <p className="text-base text-gray-800 dark:text-gray-200">{item.description}</p>

            <p className="mt-4 text-lg font-semibold text-yellow-600 dark:text-yellow-400">
              Price: ${Number(item.price).toFixed(2)}
            </p>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <label htmlFor="quantity" className="font-medium text-gray-900 dark:text-white">
                Qty:
              </label>
              <Input
                id="quantity"
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                min={1}
                max={99}
                className="w-20 bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white
                           placeholder-gray-500 dark:placeholder-gray-400
                           focus:ring-2 focus:ring-yellow-400 focus:outline-none rounded-md"
                aria-live="polite"
                aria-label="Quantity"
              />
            </div>

            <Button
              onClick={handleAddToCart}
              className="flex-1 sm:flex-none sm:w-auto"
              disabled={adding}
              aria-disabled={adding}
            >
              {adding ? "Adding..." : "Add to Cart"}
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default MenuItemDetail;