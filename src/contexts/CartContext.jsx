import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./UserContext";
const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { token } = useUser();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_URL = `${import.meta.env.VITE_API_URL}/api/cart/menu-items/`;

  // Cargar carrito desde la API
  const fetchCart = async () => {
    if (!token) return;

    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setCart(data); // el backend ya entrega quantity y price
      } else {
        console.error("Error al obtener el carrito");
      }
    } catch (error) {
      console.error("Error en fetchCart:", error);
    } finally {
      setLoading(false);
    }
  };

  // Añadir item al carrito (o incrementar cantidad)
  const addToCart = async (item, quantity = 1) => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          menuitem_id: item.id,
          quantity,
        }),
      });

      if (res.ok) {
        fetchCart(); // Actualizar estado
      } else {
        console.error("Error al añadir al carrito");
      }
    } catch (error) {
      console.error("Error en addToCart:", error);
    }
  };

  // Establecer cantidad exacta (sobrescribe)
  const setQuantity = async (id, quantity) => {
    await addToCart({ id }, quantity); // La API suma, por lo que se necesita backend con PUT para esto.
  };

  // Eliminar un ítem del carrito
  const removeFromCart = async (id) => {
    try {
      const res = await fetch(`${API_URL}${id}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      if (res.ok) {
        fetchCart();
      } else {
        console.error("Error al eliminar item");
      }
    } catch (error) {
      console.error("Error en removeFromCart:", error);
    }
  };

  // Vaciar carrito completo
  const clearCart = async () => {
    try {
      const res = await fetch(API_URL, {
        method: "DELETE",
        headers: {
          Authorization: `Token ${token}`,
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

  // Calcular totales
  const totalItems = cart.reduce((acc, i) => acc + i.quantity, 0);
  const totalPrice = cart.reduce((acc, i) => acc + i.unit_price * i.quantity, 0);

  useEffect(() => {
    fetchCart();
  }, [token]);

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