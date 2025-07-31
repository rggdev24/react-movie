import { useEffect, useState } from "react";
import { Movie, TopMovie } from "./components/Movie";
import Search from "./components/Search";
import type { IAppwriteTopMovie, IMovie } from "./interface/Movie";
import { useDebounce } from "react-use";
import { getTrendingMovies, updateSearchCount } from "./services/appwrite";

const TMDB_BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
const TMDB_API_READ_ACCESS_TOKEN = import.meta.env
  .VITE_TMDB_API_READ_ACCESS_TOKEN;
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TMDB_API_READ_ACCESS_TOKEN}`,
  },
};

function App() {
  const [search, setSearch] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [debounceSearch, setDebounceSearch] = useState("");
  const [topMovies, setTopMovies] = useState<IAppwriteTopMovie[]>([]);

  const loadTrendingMoviews = async () => {
    try {
      const movies = await getTrendingMovies();
      if (movies) {
        setTopMovies(movies);
      }
    } catch (error) {}
  };

  const fetchMovie = async (query = "") => {
    try {
      const endpoint = query
        ? `${TMDB_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${TMDB_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);
      const data = await response.json();

      setMovieList(data.results || []);

      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      console.log(`Error fetching movies `, error);
      setErrorMessage(`Error fetching movies. Please try again later`);
    }
  };

  useEffect(() => {
    loadTrendingMoviews();
  }, []);

  useEffect(() => {
    fetchMovie(debounceSearch);
  }, [debounceSearch]);

  useDebounce(() => setDebounceSearch(search), 1000, [search]);

  return (
    <main>
      <div>
        <header className="text-3xl">Top Movies</header>

        {topMovies.map((movie: IAppwriteTopMovie) => (
          <TopMovie key={movie.movie_id} movie={movie} />
        ))}
      </div>

      <div>
        <header className="text-3xl">Search Movies</header>
      </div>

      <Search search={search} setSearch={setSearch} />

      {errorMessage ? `<h6>${errorMessage}</h6>` : ""}

      {movieList.map((movie: IMovie) => (
        <Movie key={movie.id} movie={movie} />
      ))}
    </main>
  );
}

export default App;
