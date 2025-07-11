import axios from "axios";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const baseUrl = "https://api.themoviedb.org/3";

export const searchMovies = async (query, filters = {}) => {
  try {
    const params = {
      api_key: apiKey,
      query,
      ...filters,
    };
    const res = await axios.get(`${baseUrl}/search/movie`, { params });
    return res.data.results;
  } catch (error) {
    console.error("Search failed:", error.response?.data || error.message);
    throw new Error("Movie search failed");
  }
};

export const discoverMovies = async (filters = {}) => {
  try {
    const params = {
      api_key: apiKey,
      sort_by: filters.sortBy || "popularity.desc",
    };
    if (filters.genre) params.with_genres = filters.genre;
    if (filters.year) params.primary_release_year = filters.year;
    if (filters.rating) params["vote_average.gte"] = filters.rating;

    const res = await axios.get(`${baseUrl}/discover/movie`, { params });
    return res.data.results;
  } catch (error) {
    console.error("Discover failed:", error.response?.data || error.message);
    throw new Error("Movie discovery failed");
  }
};

export const getMovieDetails = async (movieId) => {
  try {
    const res = await axios.get(`${baseUrl}/movie/${movieId}`, {
      params: {
        api_key: apiKey,
        append_to_response: "videos,recommendations",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Details fetch failed:", error.response?.data || error.message);
    throw new Error("Failed to fetch movie details");
  }
};
