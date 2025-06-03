const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_KEY;
const FALLBACK = "/fallback-image.jpg";          // coloca tu imagen genérica en /public

/**
 * Devuelve una URL de imagen basada en el query.
 * Añade page y sig para que Unsplash no devuelva siempre la misma foto.
 *
 * @param {string} query - Búsqueda (ej. “Pizza Italian”)
 * @param {number|string} sigSeed - Semilla (id del producto) para cache-busting
 * @returns {Promise<string>}
 */
export const fetchUnsplashImage = async (query, sigSeed = Math.random()) => {
  if (!UNSPLASH_KEY) {
    console.warn("No Unsplash API key provided.");
    return FALLBACK;
  }

  // página aleatoria 1-10 para más variación
  const page = 1 + Math.floor(Math.random() * 10);

  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
        query
      )}&client_id=${UNSPLASH_KEY}&orientation=squarish&per_page=1&page=${page}`
    );

    if (!response.ok) {
      console.error("Unsplash API error:", response.status, response.statusText);
      return FALLBACK;
    }

    const data = await response.json();
    if (!data.results?.length) {
      console.warn("No Unsplash results for:", query);
      return FALLBACK;
    }

    // url + sig -> evita que el navegador sirva la misma del cache
    return `${data.results[0].urls.regular}&sig=${sigSeed}`;
  } catch (err) {
    console.error("Error fetching Unsplash image:", err);
    return FALLBACK;
  }
};