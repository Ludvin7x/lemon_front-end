import { useEffect, useState } from "react";

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch(`${API_URL}/api/menu-items/`);
        const data = await response.json();
        setMenuItems(data);
      } catch (error) {
        console.error("Error fetching menu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, [API_URL]);

  if (loading) return <p>Cargando menú...</p>;

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