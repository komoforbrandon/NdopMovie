const api_key = import.meta.env.VITE_TMD_API_KEY;

export async function FetchtmdbData(query: string) {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${query}`,
  );
  const data = await response.json();
  return data;
}

export async function FetchTrendingMovies() {
  const response = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${api_key}`);
  const data = await response.json();
  console.log('This is the data from the api:', data)
  return data;
}

export async function FetchTvShows() {
    const response = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${api_key}`);
    const data = await response.json();
    return data;
}

export async function FetchtrendingTvShows() {
  const response = await fetch(
    `https://api.themoviedb.org/3/trending/tv/day?api_key=${api_key}`,
  );
  const data = await response.json();
  return data;
}

export async function FetchMovieDetails(movieId: string) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${api_key}`,
  );
  const data = await response.json();
  return data;
}

export async function FetchTvShowDetails(tvShowId: string) {
  const response = await fetch(
    `https://api.themoviedb.org/3/tv/${tvShowId}?api_key=${api_key}`,
  );
  const data = await response.json();
  return data;
}