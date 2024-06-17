import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCast } from "../movies-api";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const defaultImg = "https://via.placeholder.com/200x300";

  useEffect(() => {
    async function getMovieCast() {
      try {
        setLoading(true);
        setError(false);
        const data = await fetchMovieCast(movieId);
        const firstTenCast = data.cast.slice(0, 10);
        setCast(firstTenCast);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    getMovieCast();
  }, [movieId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching movie details: {error.message}</div>;
  }

  if (!cast) {
    return <div>Not found</div>;
  }
  return (
    <ul>
      {cast.map((actor) => {
        return (
          <li key={actor.id}>
            <h4>
              {actor.name} - {actor.character}
            </h4>
            <img
              src={
                actor["profile_path"]
                  ? `https://image.tmdb.org/t/p/w200/${actor["profile_path"]}`
                  : defaultImg
              }
              alt={actor.character}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default MovieCast;
