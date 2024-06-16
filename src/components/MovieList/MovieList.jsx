const MovieList = ({ movies }) => {
  return (
    movies.length > 0 && (
      <ul>
        {movies.map(({ id, title }) => (
          <li key={id}>{title}</li>
        ))}
      </ul>
    )
  );
};

export default MovieList;
