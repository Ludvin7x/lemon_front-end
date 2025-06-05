import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext'; 

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
      .then(async res => {
        const contentType = res.headers.get("content-type");
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Error: ${text}`);
        }
        if (contentType && contentType.includes("application/json")) {
          return res.json();
        } else {
          const text = await res.text();
          throw new Error(`Respuesta inesperada: ${text}`);
        }
      })
      .then(data => setSession(data))
      .catch(err => setError(err.message));
  }, [sessionId, token]);

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