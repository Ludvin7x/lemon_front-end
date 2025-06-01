import { useEffect, useState } from "react";

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch(`${API_URL}/api/menu-items/`);

        if (!response.ok) {
          const errorData = await response.json();
          // Usa el mensaje de error del backend si está disponible
          throw new Error(errorData.detail || "Error al obtener los datos del menú");
        }

        const data = await response.json();
        setMenuItems(data);
      } catch (err) {
        console.error("Error fetching menu:", err);
        setError(err.message || "Error inesperado");
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, [API_URL]);

  if (loading) return <p className="p-6">Cargando menú...</p>;

  if (error) {
    return (
      <div className="p-6 text-red-600 bg-red-100 rounded">
        <h2 className="text-xl font-bold mb-2">Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Menú</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="border rounded p-4 shadow hover:shadow-lg transition"
          >
            <h2 className="text-lg font-semibold">{item.title}</h2>
            <p className="text-gray-600">{item.description}</p>
            <p className="font-bold mt-2">${item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuPage;