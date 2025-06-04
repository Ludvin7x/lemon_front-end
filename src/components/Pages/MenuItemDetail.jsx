import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Spinner, Button, Container, Card, Alert } from "react-bootstrap";
import { getImage } from "../api/images/getImage";

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
      <div className="text-center my-5">
        <Spinner animation="border" />
        <p className="mt-3">Cargando detalle del producto...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="my-5">
        <Alert.Heading>Error</Alert.Heading>
        <p>{error}</p>
        <Button variant="secondary" onClick={() => navigate(-1)}>
          Volver al menú
        </Button>
      </Alert>
    );
  }

  if (!item) {
    return null; // O un mensaje que diga "No se encontró el ítem"
  }

  return (
    <Container className="my-5" style={{ maxWidth: "600px" }}>
      <Card className="shadow-lg">
        {imageUrl && (
          <Card.Img
            variant="top"
            src={imageUrl}
            alt={item.title || "Imagen del producto"}
            className="img-fluid"
            style={{ maxHeight: "400px", objectFit: "cover", width: "100%" }}
          />
        )}
        <Card.Body>
          <Card.Title as="h2">{item.title || "Título no disponible"}</Card.Title>
          <Card.Text className="fs-5">{item.description || "Sin descripción"}</Card.Text>
          <Card.Text className="fw-bold fs-4">
            Precio: ${Number(item.price || 0).toFixed(2)}
          </Card.Text>
          <div className="d-flex gap-3 mt-4">
            <Button variant="success" onClick={() => alert("Producto añadido al carrito")}>
              Añadir al carrito
            </Button>
            <Button variant="secondary" onClick={() => navigate(-1)}>
              Volver al menú
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default MenuItemDetail;