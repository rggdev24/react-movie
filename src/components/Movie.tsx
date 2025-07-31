import type { IAppwriteTopMovie, IMovie } from "../interface/Movie";

export const Movie = (props: { movie: IMovie }) => {
  const { title, poster_path } = props.movie;

  return (
    <div>
      <h3>{title}</h3>
      <img
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500/${poster_path}`
            : "/no-movie.png"
        }
      />
    </div>
  );
};

export const TopMovie = (props: { movie: IAppwriteTopMovie }) => {
  const { count, poster_url } = props.movie;

  return (
    <div>
      <h3>{count}</h3>
      <img src={poster_url} />
    </div>
  );
};
