import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Spinner } from "phosphor-react";
import { ShoppingCart, ArrowLeft } from "phosphor-react";
import { getImage } from "../../api/images/getImage";

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
        <Spinner size={48} className="animate-spin text-gray-600" weight="bold" />
        <p className="text-gray-700 text-lg">Cargando detalle del producto...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto my-20 p-6 bg-red-100 border border-red-400 rounded-lg shadow">
        <h2 className="text-red-700 text-2xl font-semibold mb-2">Error</h2>
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition"
        >
          <ArrowLeft size={20} weight="bold" className="mr-2" />
          Volver al menú
        </button>
      </div>
    );
  }

  if (!item) {
    return null;
  }

  return (
    <main className="max-w-lg mx-auto my-12 p-6 bg-white rounded-xl shadow-lg">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={item.title || "Imagen del producto"}
          className="w-full h-64 object-cover rounded-lg mb-6"
          loading="lazy"
        />
      )}
      <h1 className="text-3xl font-bold mb-4 text-gray-900">{item.title || "Título no disponible"}</h1>
      <p className="text-gray-700 text-lg mb-6">{item.description || "Sin descripción"}</p>
      <p className="text-xl font-semibold mb-8 text-gray-900">
        Precio: <span className="text-green-600">${Number(item.price || 0).toFixed(2)}</span>
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => alert("Producto añadido al carrito")}
          className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
        >
          <ShoppingCart size={24} weight="bold" />
          Añadir al carrito
        </button>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-6 py-3 bg-gray-300 text-gray-800 rounded-lg shadow hover:bg-gray-400 transition"
        >
          <ArrowLeft size={24} weight="bold" />
          Volver al menú
        </button>
      </div>
    </main>
  );
};

export default MenuItemDetail;