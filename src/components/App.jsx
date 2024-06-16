import { useState, useEffect } from "react";
import { fetchTrendingMovies, fetchMoviesWithTopic } from "./movies-api";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import HomePage from "../pages/HomePage/HomePage";
import MoviesPage from "../pages/MoviesPage/MoviesPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import MovieDetailsPage from "../pages/MovieDetailsPage/MovieDetailsPage";
import Navigation from "./Navigation/Navigation";
import ErrorMessage from "./ErrorMessage/ErrorMessage";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    async function getMovie() {
      try {
        const data = await fetchTrendingMovies();
        setMovies(data.results);
      } catch (error) {
        error;
      }
    }
    getMovie();
  }, []);

  const handleSearch = async (topic) => {
    try {
      const data = await fetchMoviesWithTopic(topic);
      setSearchResults(data.results);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div>
      <Navigation />
      <Toaster />
      {error && <ErrorMessage error={error} />}
      <Routes>
        <Route path="/" element={<HomePage movies={movies} />} />
        <Route
          path="/movies"
          element={
            <MoviesPage movies={searchResults} onSearch={handleSearch} />
          }
        />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/movies/:moviesId" element={<MovieDetailsPage />} />
      </Routes>
    </div>
  );
};

export default App;
