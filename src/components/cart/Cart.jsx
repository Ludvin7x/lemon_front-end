import React, { useState, useEffect } from "react";
import { useCart } from "../../contexts/CartContext";
import { PlusCircle, MinusCircle, Trash, ShoppingCartSimple } from "phosphor-react";
import Checkout from "./Checkout";
import { motion, AnimatePresence } from "framer-motion";

export default function Cart() {
  const { cart, loading, setQuantity, removeFromCart, clearCart, fetchCart } = useCart();
  const [error, setError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  useEffect(() => {
    fetchCart().catch(() => setError("Error al obtener el carrito"));
  }, []);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const updateQuantity = async (id, quantity) => {
    if (isUpdating) return;
    setIsUpdating(true);
    try {
      await setQuantity(id, quantity);
    } catch {
      setError("Error actualizando el carrito. Intenta nuevamente.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDecrease = (id, quantity) => {
    if (quantity <= 1) {
      removeFromCart(id).catch(() => setError("Error eliminando el ítem."));
    } else {
      updateQuantity(id, quantity - 1);
    }
  };

  const handleIncrease = (id, quantity) => {
    updateQuantity(id, quantity + 1);
  };

  const handleClearCart = async () => {
    if (window.confirm("¿Seguro quieres vaciar el carrito?")) {
      try {
        await clearCart();
      } catch {
        setError("Error vaciando el carrito. Intenta nuevamente.");
      }
    }
  };

  const handleProceedToCheckout = () => {
    setShowCheckout(true); 
  };

  const total = Array.isArray(cart)
    ? cart.reduce((acc, item) => acc + (Number(item.unit_price) || 0) * item.quantity, 0)
    : 0;

  // Loading con spinner animado
  if (loading)
    return (
      <div className="mt-20 flex justify-center items-center">
        <svg
          className="animate-spin h-10 w-10 text-blue-600 dark:text-blue-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-label="Cargando"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
      </div>
    );

  // Carrito vacío con diseño mejorado y animación fade in
  if (!loading && cart.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-20 flex flex-col items-center justify-center text-center px-4"
      >
        <ShoppingCartSimple size={80} className="text-gray-400 dark:text-gray-600 mb-6" />
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
          Tu carrito está vacío
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
          Aún no has agregado ningún producto. Explora nuestro menú y encuentra algo delicioso para ti.
        </p>
        <a
          href="/MenuPage"
          className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg transition shadow-md dark:shadow-blue-800/40"
        >
          Ver menú
        </a>
      </motion.div>
    );
  }

  // Mostrar checkout dentro del carrito
  if (showCheckout) {
    return <Checkout />;
  }

  return (
    <div className="cart-container mt-20 p-6 max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-lg transition-colors">
      <h2 className="text-3xl font-semibold mb-6 text-gray-900 dark:text-gray-100">Tu carrito</h2>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-400 p-4 mb-6 rounded shadow-sm"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="overflow-x-auto rounded-lg border border-gray-300 dark:border-gray-700">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-gray-700 dark:text-gray-300 font-medium">
                Producto
              </th>
              <th className="px-6 py-3 text-center text-gray-700 dark:text-gray-300 font-medium">
                Cantidad
              </th>
              <th className="px-6 py-3 text-center text-gray-700 dark:text-gray-300 font-medium">
                Precio unitario
              </th>
              <th className="px-6 py-3 text-center text-gray-700 dark:text-gray-300 font-medium">
                Subtotal
              </th>
              <th className="px-6 py-3 text-center text-gray-700 dark:text-gray-300 font-medium">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {cart.map(({ id, menuitem, quantity, unit_price }) => (
              <tr
                key={id}
                className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100 font-medium">
                  {menuitem?.title || "Sin nombre"}
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="inline-flex items-center space-x-2">
                    <button
                      className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 transition"
                      onClick={() => handleDecrease(id, quantity)}
                      title="Disminuir cantidad"
                      disabled={isUpdating}
                    >
                      <MinusCircle size={20} weight="bold" />
                    </button>
                    <span className="font-semibold text-gray-900 dark:text-gray-100">
                      {quantity}
                    </span>
                    <button
                      className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 transition"
                      onClick={() => handleIncrease(id, quantity)}
                      title="Aumentar cantidad"
                      disabled={isUpdating}
                    >
                      <PlusCircle size={20} weight="bold" />
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 text-center text-gray-700 dark:text-gray-300">
                  ${Number(unit_price).toFixed(2)}
                </td>
                <td className="px-6 py-4 text-center font-semibold text-gray-900 dark:text-gray-100">
                  ${(Number(unit_price) * quantity).toFixed(2)}
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    className="p-1 text-red-600 hover:text-red-800 dark:hover:text-red-400 disabled:opacity-50 transition"
                    onClick={() =>
                      removeFromCart(id).catch(() =>
                        setError("Error eliminando el ítem.")
                      )
                    }
                    title="Eliminar ítem"
                    disabled={isUpdating}
                  >
                    <Trash size={20} weight="bold" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
        <h4 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Total: ${total.toFixed(2)}
        </h4>
        <div className="flex gap-4">
          <button
            className="bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 text-white font-semibold px-5 py-2 rounded-lg disabled:opacity-50 transition shadow-md"
            onClick={handleClearCart}
            disabled={isUpdating}
          >
            Vaciar carrito
          </button>
          <button
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-semibold px-5 py-2 rounded-lg disabled:opacity-50 transition shadow-md"
            onClick={handleProceedToCheckout}
            disabled={isUpdating}
          >
            Proceder al pago
          </button>
        </div>
      </div>
    </div>
  );
}