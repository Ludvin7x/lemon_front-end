const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_KEY;

export const fetchUnsplashImage = async (query) => {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
        query
      )}&client_id=${UNSPLASH_KEY}&orientation=squarish&per_page=1`
    );
    const data = await response.json();
    return data.results[0]?.urls?.regular || null;
  } catch (err) {
    console.error("Error fetching Unsplash image:", err);
    return null;
  }
};