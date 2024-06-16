import { useParams } from "react-router-dom";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  return <div>Now showing product with id - {movieId}</div>;
};

export default MovieDetailsPage;
