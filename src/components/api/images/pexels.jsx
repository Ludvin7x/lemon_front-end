
import React from "react";

const PEXELS_ACCESS_KEY = import.meta.env.VITE_PEXELS_KEY;

if (!PEXELS_ACCESS_KEY) {
  console.warn("Warning: VITE_PEXELS_KEY is not defined. Pexels API requests will fail.");
}

async function fetchPexelsImage(query) {
  if (!PEXELS_ACCESS_KEY) {
    console.error("Pexels Access Key not defined");
    throw new Error("Pexels Access Key no definida. Por favor, revisa tus variables de entorno.");
  }

  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(
    query
  )}&per_page=1&orientation=square`;

  try {
    console.log(`Fetching from Pexels: ${query}`);
    const response = await fetch(url, {
      headers: {
        Authorization: PEXELS_ACCESS_KEY,
      },
    });

    // Check for HTTP errors
    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      
      try {
        const errorData = await response.json();
        if (errorData.error) {
          errorMessage += ` - ${errorData.error}`;
        }
      } catch (parseError) {
        console.warn("Could not parse error response from Pexels");
      }

      console.error(`Pexels API error: ${errorMessage}`);
      throw new Error(`Pexels API error: ${errorMessage}`);
    }

    const data = await response.json();

    // Validate response structure
    if (!data || !data.photos || !Array.isArray(data.photos)) {
      throw new Error("Invalid response structure from Pexels API");
    }

    if (data.photos.length === 0) {
      console.log(`No images found on Pexels for query: ${query}`);
      throw new Error("No se encontró imagen en Pexels para la consulta.");
    }

    const imageUrl = data.photos[0]?.src?.medium;
    if (!imageUrl) {
      throw new Error("Invalid image URL in Pexels response");
    }

    console.log(`Pexels image found: ${imageUrl}`);
    return imageUrl;

  } catch (error) {
    // Re-throw with more context
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error("Network error connecting to Pexels");
    }
    throw error;
  }
}

const Pexels = ({ query, onSuccess, onError }) => {
  React.useEffect(() => {
    let isMounted = true;
    let timeoutId = null;

    const fetchData = async () => {
      try {
        // Add timeout to prevent hanging requests
        const timeoutPromise = new Promise((_, reject) => {
          timeoutId = setTimeout(() => reject(new Error("Request timeout")), 10000);
        });

        const imagePromise = fetchPexelsImage(query);
        const imageUrl = await Promise.race([imagePromise, timeoutPromise]);

        if (timeoutId) {
          clearTimeout(timeoutId);
        }

        if (isMounted && imageUrl) {
          onSuccess(imageUrl);
        }
      } catch (error) {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        
        if (isMounted) {
          console.error("Pexels component error:", error.message);
          onError(error);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [query, onSuccess, onError]);

  return null;
};

export default Pexels;