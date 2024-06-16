import MovieList from "../../components/MovieList/MovieList";
import { toast } from "react-hot-toast";

const MoviesPage = ({ movies, onSearch }) => {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const form = evt.target;
    const topic = form.elements.topic.value;
    if (!topic.trim()) {
      toast.error("You must write something", {
        position: "top-right",
        duration: 1000,
      });
      return;
    }
    onSearch(topic);
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
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;
