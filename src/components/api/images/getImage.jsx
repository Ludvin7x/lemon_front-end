import React from "react";

const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_KEY;

if (!UNSPLASH_ACCESS_KEY) {
  console.warn("Warning: VITE_UNSPLASH_KEY is not defined. Unsplash API requests will fail.");
}

export async function getImage(query) {
  if (!UNSPLASH_ACCESS_KEY) {
    console.error("Unsplash Access Key not defined");
    throw new Error("Unsplash Access Key no definida. Por favor, revisa tus variables de entorno.");
  }

  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
    query
  )}&client_id=${UNSPLASH_ACCESS_KEY}&orientation=squarish&per_page=1`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      try {
        const errorData = await response.json();
        if (errorData.errors && Array.isArray(errorData.errors)) {
          errorMessage += ` - ${errorData.errors.join(", ")}`;
        } else if (errorData.message) {
          errorMessage += ` - ${errorData.message}`;
        }
      } catch {
        console.warn("Could not parse error response from Unsplash");
      }
      console.error(`Unsplash API error: ${errorMessage}`);
      throw new Error(`Unsplash API error: ${errorMessage}`);
    }

    const data = await response.json();

    if (!data?.results?.length) {
      throw new Error("No se encontró imagen en Unsplash para la consulta.");
    }

    const imageUrl = data.results[0]?.urls?.regular;
    if (!imageUrl) {
      throw new Error("Invalid image URL in Unsplash response");
    }

    return imageUrl;

  } catch (error) {
    if (error.name === "TypeError" && error.message.includes("fetch")) {
      throw new Error("Network error connecting to Unsplash");
    }
    throw error;
  }
}

const Unsplash = ({ query, onSuccess, onError }) => {
  React.useEffect(() => {
    let isMounted = true;
    let timeoutId = null;

    const fetchData = async () => {
      try {
        const timeoutPromise = new Promise((_, reject) =>
          timeoutId = setTimeout(() => reject(new Error("Request timeout")), 10000)
        );

        const imagePromise = getImage(query);
        const imageUrl = await Promise.race([imagePromise, timeoutPromise]);

        if (timeoutId) clearTimeout(timeoutId);
        if (isMounted && imageUrl) onSuccess(imageUrl);

      } catch (error) {
        if (timeoutId) clearTimeout(timeoutId);
        if (isMounted) {
          console.error("Unsplash component error:", error.message);
          onError(error);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [query, onSuccess, onError]);

  return null;
};

export default Unsplash;