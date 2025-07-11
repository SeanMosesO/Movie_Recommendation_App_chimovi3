const Filters = ({ filters, setFilters }) => {
  const handleChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
      <div>
        <label htmlFor="genre" className="sr-only">Genre</label>
        <select
          id="genre"
          value={filters.genre}
          onChange={(e) => handleChange("genre", e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">All Genres</option>
          <option value="28">Action</option>
          <option value="35">Comedy</option>
          <option value="18">Drama</option>
        </select>
      </div>

      <div>
        <label htmlFor="year" className="sr-only">Year</label>
        <input
          id="year"
          type="number"
          placeholder="Year"
          value={filters.year ?? ""}
          onChange={(e) =>
            handleChange("year", e.target.value ? Number(e.target.value) : "")
          }
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label htmlFor="rating" className="sr-only">Rating</label>
        <input
          id="rating"
          type="number"
          placeholder="Rating ≥"
          value={filters.rating ?? ""}
          onChange={(e) =>
            handleChange("rating", e.target.value ? Number(e.target.value) : "")
          }
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label htmlFor="sort_by" className="sr-only">Sort By</label>
        <select
          id="sort_by"
          value={filters.sort_by}
          onChange={(e) => handleChange("sort_by", e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="popularity.desc">Popularity</option>
          <option value="vote_average.desc">Top Rated</option>
          <option value="release_date.desc">Newest</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
