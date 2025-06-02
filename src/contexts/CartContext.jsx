import { createContext, useContext, useEffect, useReducer } from "react";

// ---------- Utils ----------
const loadCart = () => JSON.parse(localStorage.getItem("cart")) || [];
const saveCart = (cart) => localStorage.setItem("cart", JSON.stringify(cart));

const types = {
  ADD: "add",
  REMOVE: "remove",
  SET_QTY: "set_qty",
  CLEAR: "clear",
};

const reducer = (state, action) => {
  switch (action.type) {
    case types.ADD: {
      const exists = state.find((i) => i.id === action.item.id);
      if (exists) {
        return state.map((i) =>
          i.id === action.item.id
            ? { ...i, quantity: i.quantity + action.quantity }
            : i
        );
      }
      return [...state, { ...action.item, quantity: action.quantity }];
    }
    case types.REMOVE:
      return state.filter((i) => i.id !== action.id);

    case types.SET_QTY:
      return state.map((i) =>
        i.id === action.id ? { ...i, quantity: Math.max(1, action.quantity) } : i
      );

    case types.CLEAR:
      return [];

    default:
      return state;
  }
};

export const CartContext = createContext(); // <--- THIS IS THE CRUCIAL CHANGE: Add 'export' here

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(reducer, [], loadCart);

  /* 🔐 Persistencia */
  useEffect(() => saveCart(cart), [cart]);

  /* 🎯 Selectores útiles */
  const totalItems = cart.reduce((acc, i) => acc + i.quantity, 0);
  const totalPrice = cart.reduce((acc, i) => acc + i.price * i.quantity, 0);

  /* 🛠️ Acciones */
  const addToCart = (item, quantity = 1) =>
    dispatch({ type: types.ADD, item, quantity });

  const removeFromCart = (id) => dispatch({ type: types.REMOVE, id });

  const setQuantity = (id, quantity) =>
    dispatch({ type: types.SET_QTY, id, quantity });

  const clearCart = () => dispatch({ type: types.CLEAR });

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        setQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);