import MovieList from "../../components/MovieList/MovieList";
import { toast } from "react-hot-toast";
import { fetchMoviesWithTopic } from "../../components/movies-api";
import { useState, useEffect } from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { useSearchParams } from "react-router-dom";

const MoviesPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(false);
  const [params, setSearchParams] = useSearchParams();
  const topic = params.get("query") ?? "";

  useEffect(() => {
    if (topic === "") {
      return;
    }
    const fetchMovies = async () => {
      try {
        setError(false);
        const data = await fetchMoviesWithTopic(topic);
        setSearchResults(data.results);
      } catch (error) {
        setError(error);
      }
    };
    fetchMovies();
  }, [topic]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const form = evt.target;
    const newTopic = form.elements.topic.value.trim();
    if (!newTopic) {
      toast.error("You must write something", {
        position: "top-right",
        duration: 1000,
      });
      return;
    }
    setSearchParams({ query: newTopic });
    form.reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="topic"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
        />
        <button type="submit">Search</button>
      </form>
      <MovieList movies={searchResults} />
      {error && <ErrorMessage />}
    </div>
  );
};

export default MoviesPage;
