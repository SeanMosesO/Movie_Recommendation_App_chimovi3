import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../services/tmdb";
import MovieList from "../components/MovieList";

const MoviePage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await getMovieDetails(id, controller.signal);
        setMovie(result);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
          setError("Failed to load movie details.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => controller.abort();
  }, [id]);

  if (loading) return <p className="p-4 text-gray-500">Loading movie...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;
  if (!movie) return <p className="p-4 text-red-500">Movie not found.</p>;

  const trailerKey = movie.videos?.results?.find(v => v.type === "Trailer")?.key;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
      <p className="mb-2">{movie.overview}</p>
      <p className="text-sm text-gray-600">Release Date: {movie.release_date}</p>
      <p className="text-sm text-gray-600">Rating: {movie.vote_average}</p>

      {trailerKey && (
        <div className="my-4">
          <iframe
            title="Trailer"
            width="100%"
            height="400"
            src={`https://www.youtube.com/embed/${trailerKey}`}
            style={{ border: 0 }}
            allowFullScreen
          />
        </div>
      )}

      {movie.recommendations?.results?.length > 0 && (
        <>
          <h3 className="text-xl mt-6 mb-2 font-semibold">Recommended</h3>
          <MovieList movies={movie.recommendations.results.slice(0, 8)} />
        </>
      )}
    </div>
  );
};

export default MoviePage;
