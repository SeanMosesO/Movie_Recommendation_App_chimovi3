import { useEffect, useState } from "react";
import { discoverMovies, searchMovies } from "../services/tmdb";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import MovieList from "../components/MovieList";

const Discover = () => {
  const [movies, setMovies] = useState([]);
  const [filters, setFilters] = useState({ genre: "", year: "", rating: "", sortBy: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController(); // helps cancel fetch on re-render
    const loadMovies = async () => {
      setLoading(true);
      setError("");
      try {
        const results = searchTerm
          ? await searchMovies(searchTerm, filters, controller.signal)
          : await discoverMovies(filters, controller.signal);
        setMovies(results);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
          setError("Failed to load movies. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };
    loadMovies();
    return () => controller.abort(); // cleanup to avoid race conditions
  }, [filters, searchTerm]);

  return (
    <div className="p-4 space-y-4">
      <SearchBar onSearch={setSearchTerm} />
      <Filters filters={filters} setFilters={setFilters} />
      {loading && <p className="text-gray-500">Loading movies...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <MovieList movies={movies} />
    </div>
  );
};

export default Discover;
