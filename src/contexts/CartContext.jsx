import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./UserContext";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { token } = useUser();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_URL = `${import.meta.env.VITE_API_URL}/api/cart/`;

  // Cargar carrito desde la API
  const fetchCart = async () => {
    if (!token) return;

    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        if (data && Array.isArray(data.results)) {
          setCart(data.results);
        } else {
          setCart([]);
        }
      } else {
        console.error("Error al obtener el carrito");
      }
    } catch (error) {
      console.error("Error en fetchCart:", error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (item, quantity = 1) => {
    const existingItem = cart.find((i) => i.menuitem.id === item.id);

    try {
      const url = existingItem ? `${API_URL}${existingItem.id}/` : API_URL;
      const method = existingItem ? "PATCH" : "POST";
      const body = existingItem
        ? JSON.stringify({ quantity: existingItem.quantity + quantity })
        : JSON.stringify({ menuitem_id: item.id, quantity });

      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body,
      });

      if (res.ok) {
        fetchCart();
      } else {
        console.error("Error al añadir/actualizar item en el carrito");
      }
    } catch (error) {
      console.error("Error en addToCart:", error);
    }
  };

  const setQuantity = async (id, quantity) => {
    try {
      const res = await fetch(`${API_URL}${id}/`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity }),
      });

      if (res.ok) {
        fetchCart();
      } else {
        console.error("Error al actualizar la cantidad");
      }
    } catch (error) {
      console.error("Error en setQuantity:", error);
    }
  };

  const clearCart = async () => {
    try {
      const res = await fetch(API_URL, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setCart([]);
      } else {
        console.error("Error al vaciar carrito");
      }
    } catch (error) {
      console.error("Error en clearCart:", error);
    }
  };

  const totalItems = Array.isArray(cart)
    ? cart.reduce((acc, i) => acc + i.quantity, 0)
    : 0;

  const totalPrice = Array.isArray(cart)
    ? cart.reduce((acc, i) => acc + i.unit_price * i.quantity, 0)
    : 0;

  useEffect(() => {
    fetchCart();
  }, [token]);

  const removeFromCart = async (id) => {
    try {
      const res = await fetch(`${API_URL}${id}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        fetchCart();
      } else {
        console.error("Error al eliminar el item del carrito");
      }
    } catch (error) {
      console.error("Error en removeFromCart:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        removeFromCart,
        setQuantity,
        clearCart,
        totalItems,
        totalPrice,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
