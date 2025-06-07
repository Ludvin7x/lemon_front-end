import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Spinner, ShoppingCart, ArrowLeft } from "phosphor-react";
import { getImage } from "../../api/images/getImage";
import { Button } from "@/components/ui/button"; 
import { Card, CardContent } from "@/components/ui/card";

const MenuItemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_URL}/api/menu-items/${id}/`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || "Error al obtener el ítem del menú");
        }
        const data = await response.json();
        setItem(data);

        const fetchedImage = await getImage(data.title);
        if (fetchedImage) setImageUrl(fetchedImage);
      } catch (err) {
        console.error("Error al obtener el ítem:", err);
        setError(err.message || "Error inesperado");
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [API_URL, id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center my-20 space-y-4">
        <Spinner size={48} className="animate-spin text-gray-600 dark:text-gray-300" weight="bold" />
        <p className="text-gray-700 dark:text-gray-300 text-lg">Cargando detalle del producto...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="max-w-md mx-auto my-20 border-red-400 dark:border-red-700 bg-red-100 dark:bg-red-900">
        <CardContent>
          <h2 className="text-red-700 dark:text-red-300 text-2xl font-semibold mb-2">Error</h2>
          <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
          <Button variant="destructive" onClick={() => navigate(-1)} className="inline-flex items-center">
            <ArrowLeft size={20} weight="bold" className="mr-2" />
            Volver al menú
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!item) return null;

  return (
    <Card className="max-w-lg mx-auto my-12 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-700">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={item.title || "Imagen del producto"}
          className="w-full h-64 object-cover rounded-lg mb-6"
          loading="lazy"
        />
      )}
      <CardContent>
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">{item.title || "Título no disponible"}</h1>
        <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">{item.description || "Sin descripción"}</p>
        <p className="text-xl font-semibold mb-8 text-gray-900 dark:text-gray-100">
          Price: <span className="text-green-600 dark:text-green-400">${Number(item.price || 0).toFixed(2)}</span>
        </p>
        <div className="flex gap-4">
          <Button
            className="flex items-center gap-2 bg-green-600 dark:bg-green-500 hover:bg-green-700 dark:hover:bg-green-600"
            onClick={() => alert("Producto añadido al carrito")}
          >
            <ShoppingCart size={24} weight="bold" />
            Add to Cart
          </Button>
          <Button
            variant="secondary"
            className="flex items-center gap-2"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={24} weight="bold" />
            Back to Menu
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MenuItemDetail;