export type MediaType = "movie" | "tv";

export type Genre = {
  id: number;
  name: string;
}

export type MediaSummary = {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  first_air_date: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  genre_ids: number[];
  name?: string;
};

export type SavedMediaItem = MediaSummary & {
  mediaType: MediaType;
};

export type MediaDetails = MediaSummary & {
  genres?: Genre[];
  tagline?: string;
  status?: string;
  homepage?: string;
  runtime?: number; // For movies
  number_of_seasons?: number; // For TV shows
  number_of_episodes?: number[]; // For TV shows
  spoken_languages?: { english_name: string }[]; // For movies and TV shows
  production_countries?: { name: string }[]; // For movies and TV shows
};

export type Movie = {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  genre_ids: number[];
};

export type SearchProp ={
  OnSearch: (query: string) => void;
  initialValue?: string;
};

export type TmdbResponse<T> = {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
};

export type VideoCardProps = {
  title: string;
  items: MediaSummary[];
  mediaType: MediaType;
  emptyMessage?: string;
};

export type MovieDetailsCardProps = {
  item: MediaDetails | null;
  mediaType: MediaType;
  onClose: () => void;
};
