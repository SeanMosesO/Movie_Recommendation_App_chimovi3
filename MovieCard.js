import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  if (!movie) return null;

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    : "/fallback.jpg";

  return (
    <article className="bg-white shadow hover:shadow-lg transition rounded p-2">
      <Link to={`/movie/${movie.id}`} className="block hover:opacity-90">
        <img
          src={imageUrl}
          alt={movie.title || "Movie Poster"}
          className="w-full rounded"
        />
        <h3 className="text-lg font-bold mt-2">
          {movie.title}{" "}
          {movie.release_date && (
            <span className="text-sm text-gray-500">
              ({movie.release_date.slice(0, 4)})
            </span>
          )}
        </h3>
        <p className="text-sm text-gray-700">Rating: {movie.vote_average}</p>
      </Link>
    </article>
  );
};

export default MovieCard;
