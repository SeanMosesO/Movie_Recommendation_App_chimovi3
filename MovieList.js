import MovieCard from "./MovieCard";

const MovieList = ({ movies }) => {
  if (!Array.isArray(movies) || movies.length === 0) {
    return <p className="text-center p-4">No movies found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;
            