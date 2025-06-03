import React, { useState, useEffect } from "react";
import { useCart } from "../../contexts/CartContext";
import { PlusCircle, MinusCircle, Trash } from "phosphor-react";

export default function Cart() {
  const {
    cart,
    loading,
    setQuantity,
    removeFromCart,
    clearCart,
    fetchCart,
  } = useCart();

  const [error, setError] = useState(null);

  // Llamar a fetchCart cada vez que el componente monta
  useEffect(() => {
    fetchCart();
  }, []);

  // Manejar disminución con eliminación si llega a 0
  const handleDecrease = (id, quantity) => {
    if (quantity <= 1) {
      removeFromCart(id);
    } else {
      setQuantity(id, quantity - 1);
    }
  };

  // Calcular total solo si cart es array y tiene items
  const total = Array.isArray(cart)
    ? cart.reduce((acc, item) => acc + item.unit_price * item.quantity, 0)
    : 0;

  // Mostrar error temporal
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  if (loading)
    return <div className="alert alert-info mt-4">Loading cart...</div>;

  if (!loading && cart.length === 0)
    return <div className="alert alert-info mt-4">Empty cart.</div>;

  return (
    <div className="container mt-4">
      <h2>Your Cart</h2>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <table className="table table-hover align-middle">
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
              <td>{menuitem.name}</td>
              <td>
                <div className="d-flex align-items-center">
                  <button
                    className="btn btn-sm btn-outline-secondary me-2"
                    onClick={() => handleDecrease(id, quantity)}
                    title="Disminuir cantidad"
                  >
                    <MinusCircle size={20} weight="bold" />
                  </button>
                  <span>{quantity}</span>
                  <button
                    className="btn btn-sm btn-outline-secondary ms-2"
                    onClick={() => setQuantity(id, quantity + 1)}
                    title="Aumentar cantidad"
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
                  onClick={() => removeFromCart(id)}
                  title="Eliminar producto"
                >
                  <Trash size={18} weight="bold" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="d-flex justify-content-between align-items-center mt-3">
        <h4>Total: ${total.toFixed(2)}</h4>
        <button
          className="btn btn-outline-danger"
          onClick={() => {
            clearCart().catch(() =>
              setError("Error al vaciar el carrito. Intente de nuevo.")
            );
          }}
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
}