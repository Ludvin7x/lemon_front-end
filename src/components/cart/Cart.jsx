import React, { useState, useEffect } from "react";
import { useCart } from "../../contexts/CartContext";
import { PlusCircle, MinusCircle, Trash } from "phosphor-react";
import Checkout from "./Checkout";

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
    setShowCheckout(true); // Mostrar el componente Checkout
  };

  const total = Array.isArray(cart)
    ? cart.reduce((acc, item) => acc + (Number(item.unit_price) || 0) * item.quantity, 0)
    : 0;

  if (loading)
    return <div className="alert alert-info mt-4">Cargando carrito...</div>;

  if (!loading && cart.length === 0)
    return <div className="alert alert-info mt-4">El carrito está vacío.</div>;

  if (showCheckout) {
    // Renderizar Checkout dentro del carrito
    return <Checkout />;
  }

  return (
    <div className="cart-container mt-4 p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Tu carrito</h2>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 mb-4 rounded">{error}</div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-lg divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-gray-700 font-medium">Producto</th>
              <th className="px-4 py-2 text-center text-gray-700 font-medium">Cantidad</th>
              <th className="px-4 py-2 text-center text-gray-700 font-medium">Precio unitario</th>
              <th className="px-4 py-2 text-center text-gray-700 font-medium">Subtotal</th>
              <th className="px-4 py-2 text-center text-gray-700 font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {cart.map(({ id, menuitem, quantity, unit_price }) => (
              <tr key={id} className="hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap text-gray-900">
                  {menuitem?.title || "Sin nombre"}
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="inline-flex items-center space-x-2">
                    <button
                      className="p-1 rounded-md hover:bg-gray-200 disabled:opacity-50"
                      onClick={() => handleDecrease(id, quantity)}
                      title="Disminuir cantidad"
                      disabled={isUpdating}
                    >
                      <MinusCircle size={20} weight="bold" />
                    </button>
                    <span className="font-medium">{quantity}</span>
                    <button
                      className="p-1 rounded-md hover:bg-gray-200 disabled:opacity-50"
                      onClick={() => handleIncrease(id, quantity)}
                      title="Aumentar cantidad"
                      disabled={isUpdating}
                    >
                      <PlusCircle size={20} weight="bold" />
                    </button>
                  </div>
                </td>
                <td className="px-4 py-3 text-center text-gray-700">
                  ${(Number(unit_price) || 0).toFixed(2)}
                </td>
                <td className="px-4 py-3 text-center font-semibold text-gray-900">
                  ${((Number(unit_price) || 0) * quantity).toFixed(2)}
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    className="p-1 text-red-600 hover:text-red-800 disabled:opacity-50"
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

      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
        <h4 className="text-xl font-semibold">Total: ${total.toFixed(2)}</h4>
        <div className="flex gap-3">
          <button
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded disabled:opacity-50 transition"
            onClick={handleClearCart}
            disabled={isUpdating}
          >
            Vaciar carrito
          </button>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded disabled:opacity-50 transition"
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