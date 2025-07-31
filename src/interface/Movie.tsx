export interface IMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string; // ISO date string, e.g. "2025-06-06"
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface IAppwriteTopMovie {
  count: number;
  movie_id: number;
  poster_url: string;
  search_term?: string;
}
