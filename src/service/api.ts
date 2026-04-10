import type { MediaDetails, MediaSummary, TmdbResponse } from "../types/type";

const apiKey = import.meta.env.VITE_TMD_API_KEY;
const apiBaseUrl = "https://api.themoviedb.org/3";

function buildUrl(path: string, params: Record<string, string | number | undefined> = {}) {
  const searchParams = new URLSearchParams({ api_key: apiKey });

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      searchParams.set(key, String(value));
    }
  });

  return `${apiBaseUrl}${path}?${searchParams.toString()}`;
}

async function fetchTmdb<T>(path: string, params?: Record<string, string | number | undefined>) {
  const response = await fetch(buildUrl(path, params));

  if (!response.ok) {
    throw new Error(`TMDB request failed with status ${response.status}`);
  }

  return (await response.json()) as T;
}

export async function FetchtmdbData(query: string) {
  return fetchTmdb<TmdbResponse<MediaSummary>>("/search/movie", { query });
}

export async function SearchTvShows(query: string) {
  return fetchTmdb<TmdbResponse<MediaSummary>>("/search/tv", { query });
}

export async function FetchTrendingMovies() {
  return fetchTmdb<TmdbResponse<MediaSummary>>("/trending/movie/day");
}

export async function FetchMoviesByGenre(genreId: number) {
  return fetchTmdb<TmdbResponse<MediaSummary>>("/discover/movie", {
    with_genres: genreId,
    sort_by: "popularity.desc",
  });
}

export async function FetchTvShows() {
  return fetchTmdb<TmdbResponse<MediaSummary>>("/discover/tv", {
    sort_by: "popularity.desc",
  });
}

export async function FetchtrendingTvShows() {
  return fetchTmdb<TmdbResponse<MediaSummary>>("/trending/tv/day");
}

export async function FetchMovieDetails(movieId: string) {
  return fetchTmdb<MediaDetails>(`/movie/${movieId}`);
}

export async function FetchTvShowDetails(tvShowId: string) {
  return fetchTmdb<MediaDetails>(`/tv/${tvShowId}`);
}