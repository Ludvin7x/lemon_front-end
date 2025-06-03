import React, { useState, useEffect } from "react";
import { useCart } from "../../contexts/CartContext";
import { PlusCircle, MinusCircle, Trash } from "phosphor-react";
import "./Cart.css"; // ✅ solo afecta este componente

export default function Cart() {
  const { cart, loading, setQuantity, removeFromCart, clearCart, fetchCart } =
    useCart();
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleDecrease = async (id, quantity) => {
    try {
      if (quantity <= 1) {
        await removeFromCart(id);
      } else {
        await setQuantity(id, quantity - 1);
      }
    } catch {
      setError("Error updating cart. Please try again.");
    }
  };

  const handleIncrease = async (id, quantity) => {
    try {
      await setQuantity(id, quantity + 1);
    } catch {
      setError("Error updating cart. Please try again.");
    }
  };

  const handleClearCart = async () => {
    if (window.confirm("Are you sure you want to clear the cart?")) {
      try {
        await clearCart();
      } catch {
        setError("Error clearing cart. Please try again.");
      }
    }
  };

  const total = Array.isArray(cart)
    ? cart.reduce((acc, item) => acc + item.unit_price * item.quantity, 0)
    : 0;

  if (loading)
    return <div className="alert alert-info mt-4">Loading cart...</div>;

  if (!loading && cart.length === 0)
    return <div className="alert alert-info mt-4">Empty cart.</div>;

  return (
    <div className="cart-container mt-4">
      <h2>Your Cart</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <table className="table table-hover align-middle cart-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Subtotal</th>
            <th>Actions</th>
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
                    title="Decrease quantity"
                  >
                    <MinusCircle size={20} weight="bold" />
                  </button>
                  <span className="mx-2">{quantity}</span>
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => handleIncrease(id, quantity)}
                    title="Increase quantity"
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
                  onClick={async () => {
                    try {
                      await removeFromCart(id);
                    } catch {
                      setError("Error removing item. Please try again.");
                    }
                  }}
                  title="Remove item"
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
          <button className="btn btn-danger me-2" onClick={handleClearCart}>
            Clear Cart
          </button>

          <button
            className="btn btn-primary"
            onClick={() => alert("Redirect to payment page (Checkout)")}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
