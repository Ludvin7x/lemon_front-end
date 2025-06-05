import React, { useState, useEffect } from "react";
import { useCart } from "../../contexts/CartContext";
import { PlusCircle, MinusCircle, Trash } from "phosphor-react";
import Checkout from "./Checkout";
import "./Cart.css";

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
    ? cart.reduce((acc, item) => acc + item.unit_price * item.quantity, 0)
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
    <div className="cart-container mt-4">
      <h2>Tu carrito</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <table className="table table-hover align-middle cart-table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio unitario</th>
            <th>Subtotal</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cart.map(({ id, menuitem, quantity, unit_price }) => (
            <tr key={id}>
              <td>{menuitem?.title}</td>
              <td>
                <div className="d-flex align-items-center cart-actions">
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => handleDecrease(id, quantity)}
                    title="Disminuir cantidad"
                    disabled={isUpdating}
                  >
                    <MinusCircle size={20} weight="bold" />
                  </button>
                  <span className="mx-2">{quantity}</span>
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => handleIncrease(id, quantity)}
                    title="Aumentar cantidad"
                    disabled={isUpdating}
                  >
                    <PlusCircle size={20} weight="bold" />
                  </button>
                </div>
              </td>
              <td>${Number(unit_price).toFixed(2)}</td>
              <td>${(Number(unit_price) * quantity).toFixed(2)}</td>
              <td>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() =>
                    removeFromCart(id).catch(() =>
                      setError("Error eliminando el ítem.")
                    )
                  }
                  title="Eliminar ítem"
                  disabled={isUpdating}
                >
                  <Trash size={18} weight="bold" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="cart-total">
        <h4>Total: ${total.toFixed(2)}</h4>
        <div>
          <button
            className="btn btn-danger me-2"
            onClick={handleClearCart}
            disabled={isUpdating}
          >
            Vaciar carrito
          </button>

          <button
            className="btn btn-primary"
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