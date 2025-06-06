import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import { useCart } from '@/contexts/CartContext';
import { CheckCircle, WarningCircle, Hourglass, House } from 'phosphor-react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function Success() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get('session_id');
  const [session, setSession] = useState(null);
  const [error, setError] = useState(null);
  const { token } = useUser();
  const { resetCart } = useCart();

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!sessionId) {
      setError('No se encontró la sesión de pago.');
      return;
    }

    if (!token) {
      setError('No estás autenticado.');
      return;
    }

    const controller = new AbortController();

    const fetchSession = async () => {
      try {
        const res = await fetch(`${API_URL}/api/checkout/session/${sessionId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          signal: controller.signal,
        });

        const contentType = res.headers.get('content-type');
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Error: ${text}`);
        }

        const data = contentType?.includes('application/json')
          ? await res.json()
          : await res.text();

        if (typeof data === 'object') {
          setSession(data);
          resetCart(); // solo una vez
        } else {
          throw new Error(`Respuesta inesperada: ${data}`);
        }
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      }
    };

    fetchSession();

    return () => controller.abort();
  }, [sessionId, token]); // resetCart intencionalmente fuera

  const animation = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4 },
  };

  if (error) {
    return (
      <motion.div className="container mx-auto max-w-lg mt-10" {...animation}>
        <Card className="bg-red-100 dark:bg-red-950 border border-red-300 dark:border-red-800 text-red-700 dark:text-red-300 p-6 flex items-center gap-3">
          <WarningCircle size={32} weight="bold" />
          <p className="text-lg font-semibold">Error: {error}</p>
        </Card>
      </motion.div>
    );
  }

  if (!session) {
    return (
      <motion.div className="container mx-auto max-w-lg mt-10" {...animation}>
        <Card className="bg-yellow-100 dark:bg-yellow-900 border border-yellow-300 dark:border-yellow-700 text-yellow-700 dark:text-yellow-100 p-6 flex items-center gap-3">
          <Hourglass size={32} weight="bold" className="animate-spin" />
          <p className="text-lg font-semibold">Cargando detalles del pago...</p>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div className="container mx-auto max-w-lg mt-10" {...animation}>
      <Card className="bg-white dark:bg-zinc-900 text-center shadow-md">
        <CardContent className="p-8 flex flex-col items-center">
          <CheckCircle size={48} weight="bold" className="mx-auto mb-4 text-green-600 dark:text-green-400" />
          <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100">Pago exitoso</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            Gracias por tu compra,{' '}
            <span className="font-semibold">
              {session.customer_details?.email}
            </span>
          </p>
          <p className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Monto total: ${(session.amount_total / 100).toFixed(2)}{' '}
            <span className="uppercase">{session.currency}</span>
          </p>

          <Button
            onClick={() => navigate('/')}
            className="mt-2 flex items-center gap-2"
          >
            <House size={20} />
            Volver al inicio
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}