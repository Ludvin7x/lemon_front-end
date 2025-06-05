import React, { useEffect, useState } from 'react';
import {
  ShoppingCart,
  NumberSquareEight,
  CurrencyDollar,
  CreditCard,
  WarningCircle,
} from 'phosphor-react';
import { useCart } from '../../contexts/CartContext';
import { loadStripe } from '@stripe/stripe-js';

const API_URL = import.meta.env.VITE_API_URL.replace(/\/+$/, '');

// Carga la instancia Stripe una sola vez fuera del componente para no recargarla
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function Checkout() {
  const { cart } = useCart();
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (Array.isArray(cart) && cart.length > 0) {
      const totalAmount = cart.reduce(
        (sum, item) => sum + item.unit_price * item.quantity,
        0
      );
      setTotal(totalAmount);
    } else {
      setTotal(0);
    }
  }, [cart]);

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);

    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) throw new Error('No estás autenticado.');

      const res = await fetch(`${API_URL}/api/checkout/create-session/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({}), // Ajusta si necesitas enviar datos específicos
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'Error al crear la sesión de pago.');
      }

      const data = await res.json();

      const stripe = await stripePromise;
      if (!stripe) throw new Error('Error al inicializar Stripe.');

      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId: data.id,
      });

      if (stripeError) {
        throw new Error(stripeError.message);
      }
    } catch (err) {
      setError(err.message || 'Error inesperado.');
    } finally {
      setLoading(false);
    }
  };

  if (!Array.isArray(cart) || cart.length === 0) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning text-center fs-5 d-flex align-items-center justify-content-center gap-2">
          <WarningCircle size={24} weight="bold" />
          Tu carrito está vacío.
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5" style={{ maxWidth: '700px' }}>
      <h2 className="mb-4 text-center fw-bold d-flex align-items-center justify-content-center gap-2">
        <ShoppingCart size={28} weight="bold" />
        Resumen del pedido
      </h2>

      {error && (
        <div
          className="alert alert-danger text-center d-flex align-items-center justify-content-center gap-2"
          role="alert"
        >
          <WarningCircle size={24} weight="bold" />
          {error}
        </div>
      )}

      <div className="table-responsive shadow-sm rounded">
        <table className="table table-hover align-middle mb-0 bg-white">
          <thead className="table-light">
            <tr>
              <th>Producto</th>
              <th className="text-center">
                <NumberSquareEight size={16} weight="bold" className="me-1" />
                Cantidad
              </th>
              <th className="text-end">
                <CurrencyDollar size={16} weight="bold" className="me-1" />
                Precio unitario
              </th>
              <th className="text-end">
                <CurrencyDollar size={16} weight="bold" className="me-1" />
                Subtotal
              </th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id}>
                <td>{item.menuitem?.title || 'Producto'}</td>
                <td className="text-center">{item.quantity}</td>
                <td className="text-end">${Number(item.unit_price).toFixed(2)}</td>
                <td className="text-end">${(item.unit_price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="d-flex flex-column align-items-center mt-4 pt-3 border-top w-100">
        <div className="d-flex justify-content-between align-items-center w-100 mb-2">
          <h4 className="fw-semibold mb-0 d-flex align-items-center gap-1">
            <CurrencyDollar size={24} weight="bold" />
            Total: ${total.toFixed(2)}
          </h4>
          <button
            className="btn btn-primary btn-lg d-flex align-items-center gap-2"
            onClick={handleCheckout}
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? (
              <>
                Procesando...
                <span
                  className="spinner-border spinner-border-sm ms-2"
                  role="status"
                  aria-hidden="true"
                />
              </>
            ) : (
              <>
                <CreditCard size={22} />
                Pagar con tarjeta
              </>
            )}
          </button>
        </div>

        <img
          src="/img/pagoseguro-stripe.png"
          alt="Pago seguro con Stripe"
          style={{ maxWidth: '180px', marginTop: '10px', userSelect: 'none' }}
        />
      </div>
    </div>
  );
}