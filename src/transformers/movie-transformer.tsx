import type { IAppwriteTopMovie } from "../interface/Movie";

export const transformGetAppwriteMovies = (
  data: any = []
): IAppwriteTopMovie[] => {
  return (
    data?.map((item: IAppwriteTopMovie) => ({
      count: item.count,
      movie_id: item.movie_id,
      poster_url: item.poster_url,
      search_term: item?.search_term ?? "",
    })) ?? []
  );
};
