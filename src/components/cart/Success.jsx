import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import { CheckCircle, WarningCircle, Hourglass } from 'phosphor-react';

export default function Success() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [session, setSession] = useState(null);
  const [error, setError] = useState(null);
  const { token } = useUser();

  useEffect(() => {
    if (!sessionId) {
      setError('No se encontró la sesión de pago.');
      return;
    }

    if (!token) {
      setError('No estás autenticado.');
      return;
    }

    const API_URL = import.meta.env.VITE_API_URL;

    fetch(`${API_URL}/api/checkout/session/${sessionId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        const contentType = res.headers.get('content-type');
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Error: ${text}`);
        }
        if (contentType && contentType.includes('application/json')) {
          return res.json();
        } else {
          const text = await res.text();
          throw new Error(`Respuesta inesperada: ${text}`);
        }
      })
      .then((data) => setSession(data))
      .catch((err) => setError(err.message));
  }, [sessionId, token]);

  if (error) {
    return (
      <div className="container mx-auto max-w-lg mt-10 p-6 bg-red-50 border border-red-300 rounded-md flex items-center gap-3 text-red-700">
        <WarningCircle size={32} weight="bold" />
        <p className="text-lg font-semibold">Error: {error}</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="container mx-auto max-w-lg mt-10 p-6 bg-yellow-50 border border-yellow-300 rounded-md flex items-center gap-3 text-yellow-700">
        <Hourglass size={32} weight="bold" className="animate-spin" />
        <p className="text-lg font-semibold">Cargando detalles del pago...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-lg mt-10 p-8 bg-white rounded-lg shadow-md text-center">
      <CheckCircle size={48} weight="bold" className="mx-auto mb-4 text-green-600" />
      <h1 className="text-3xl font-bold mb-2 text-gray-900">Pago exitoso</h1>
      <p className="text-lg text-gray-700 mb-4">
        Gracias por tu compra, <span className="font-semibold">{session.customer_details?.email}</span>
      </p>
      <p className="text-xl font-semibold text-gray-900">
        Monto total: ${(session.amount_total / 100).toFixed(2)}{' '}
        <span className="uppercase">{session.currency}</span>
      </p>
    </div>
  );
}