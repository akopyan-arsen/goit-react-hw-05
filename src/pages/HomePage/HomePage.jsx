import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { fetchTrendingMovies } from "../../components/movies-api";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getMovie() {
      try {
        const data = await fetchTrendingMovies();
        setMovies(data.results);
      } catch (error) {
        setError(error);
      }
    }
    getMovie();
  }, []);

  return (
    <div>
      <h1>Trending today</h1>
      <MovieList movies={movies} />
      {error && <ErrorMessage />}
    </div>
  );
};
export default HomePage;
