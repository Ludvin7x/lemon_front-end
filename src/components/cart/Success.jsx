import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function Success() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [session, setSession] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!sessionId) {
      setError('No se encontró la sesión de pago.');
      return;
    }

    fetch(`/api/checkout/session/${sessionId}`)
      .then(res => {
        if (!res.ok) throw new Error('Error al obtener datos de pago');
        return res.json();
      })
      .then(data => setSession(data))
      .catch(err => setError(err.message));
  }, [sessionId]);

  if (error) return <p>Error: {error}</p>;
  if (!session) return <p>Cargando detalles del pago...</p>;

  return (
    <div>
      <h1>Pago exitoso</h1>
      <p>Gracias por tu compra, {session.customer_details?.email}</p>
      <p>Monto total: ${(session.amount_total / 100).toFixed(2)} {session.currency.toUpperCase()}</p>
      <p>ID de sesión: {session.id}</p>
    </div>
  );
}