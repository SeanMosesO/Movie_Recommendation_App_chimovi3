import dotenv from 'dotenv';
import fetch from 'node-fetch';
import Movie from '../models/movies_schema.js';

dotenv.config();

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_API_BASE_URL = 'https://api.themoviedb.org/3';

if (!TMDB_API_KEY) {
  throw new Error("TMDB_API_KEY is not defined in .env");
}

const getOrAddLocalDb = async (tmdbId) => {
  let movie = await Movie.findOne({ tmdbId });

  if (!movie) {
    const url = `${TMDB_API_BASE_URL}/movie/${tmdbId}?api_key=${TMDB_API_KEY}&append_to_response=videos,genres`;
    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Failed to fetch movie ${tmdbId} from TMDB: ${response.status} - ${errorText}`);
      return null;
    }

    const data = await response.json();

    if (!data.id || !data.title) {
      console.error(`Incomplete movie data from TMDB for ID ${tmdbId}`);
      return null;
    }

    const videoKey = data.videos?.results?.find(v => v.type === 'Trailer' && v.site === 'YouTube')?.key || null;

    movie = new Movie({
      tmdbId: data.id,
      title: data.title,
      releaseDate: data.release_date,
      posterPath: data.poster_path,
      overview: data.overview,
      videoKey,
      genres: data.genres?.map(genre => genre.name) || [],
      voteAverage: data.vote_average,
      popularity: data.popularity || 0,
      backdropPath: data.backdrop_path || null,
    });

    await movie.save();
  }

  return movie;
};

export default getOrAddLocalDb;
