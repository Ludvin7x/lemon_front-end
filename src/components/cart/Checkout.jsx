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
      <div className="container mx-auto mt-12 max-w-xl px-4">
        <div
          className="flex items-center justify-center gap-3 bg-yellow-100 text-yellow-800 rounded-lg p-4 text-lg font-medium"
          role="alert"
        >
          <WarningCircle size={28} weight="bold" />
          Tu carrito está vacío.
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-12 max-w-3xl px-4">
      <h2 className="flex items-center justify-center gap-3 text-3xl font-extrabold mb-8 text-gray-900 dark:text-gray-100">
        <ShoppingCart size={32} weight="bold" />
        Resumen del pedido
      </h2>

      {error && (
        <div
          className="flex items-center justify-center gap-3 bg-red-100 text-red-700 rounded-lg p-4 mb-6 font-semibold"
          role="alert"
        >
          <WarningCircle size={28} weight="bold" />
          {error}
        </div>
      )}

      <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300"
              >
                Producto
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-sm font-semibold text-gray-700 dark:text-gray-300"
              >
                <div className="flex items-center justify-center gap-1">
                  <NumberSquareEight size={18} weight="bold" />
                  Cantidad
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-sm font-semibold text-gray-700 dark:text-gray-300"
              >
                <div className="flex items-center justify-end gap-1">
                  <CurrencyDollar size={18} weight="bold" />
                  Precio unitario
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-sm font-semibold text-gray-700 dark:text-gray-300"
              >
                <div className="flex items-center justify-end gap-1">
                  <CurrencyDollar size={18} weight="bold" />
                  Subtotal
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {cart.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <td className="px-6 py-4 text-gray-900 dark:text-gray-100">{item.menuitem?.title || 'Producto'}</td>
                <td className="px-6 py-4 text-center text-gray-700 dark:text-gray-300">{item.quantity}</td>
                <td className="px-6 py-4 text-right text-gray-700 dark:text-gray-300">
                  ${Number(item.unit_price).toFixed(2)}
                </td>
                <td className="px-6 py-4 text-right font-semibold text-gray-900 dark:text-gray-100">
                  ${(item.unit_price * item.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 border-t border-gray-300 dark:border-gray-700 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-2xl font-semibold text-gray-900 dark:text-gray-100">
          <CurrencyDollar size={28} weight="bold" />
          Total: ${total.toFixed(2)}
        </div>

        <button
          onClick={handleCheckout}
          disabled={loading}
          aria-busy={loading}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-500 text-white font-semibold rounded-lg px-6 py-3 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              Procesando...
              <svg
                className="animate-spin h-5 w-5 ml-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
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
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
            </>
          ) : (
            <>
              <CreditCard size={24} weight="bold" />
              Pagar con tarjeta
            </>
          )}
        </button>
      </div>

      <div className="mt-4 flex justify-center">
        <img
          src="/img/pagoseguro-stripe.png"
          alt="Pago seguro con Stripe"
          className="max-w-[180px] select-none"
          draggable={false}
        />
      </div>
    </div>
  );
}