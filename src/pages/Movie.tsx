import { useQuery } from "@tanstack/react-query";
import { Sparkles } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import VideoCard from "../components/videoCard";
import { FetchMoviesByGenre, FetchtmdbData, FetchTrendingMovies } from "../service/api";

const movieGenres = [
  { id: 28, title: "Action Movies" },
  { id: 10749, title: "Romance Movies" },
  { id: 35, title: "Comedy Movies" },
  { id: 27, title: "Horror Movies" },
];

export default function Movie() {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("query")?.trim() ?? "";

  const { data: searchResults, isLoading: isSearchLoading } = useQuery({
    queryKey: ["movie-search", searchTerm],
    queryFn: () => FetchtmdbData(searchTerm),
    enabled: Boolean(searchTerm),
  });

  const { data: trendingMovies, isLoading: isTrendingLoading, error: trendingError } = useQuery({
    queryKey: ["trending-movies"],
    queryFn: FetchTrendingMovies,
  });

  const actionMoviesQuery = useQuery({
    queryKey: ["movie-genre", 28],
    queryFn: () => FetchMoviesByGenre(28),
  });

  const romanceMoviesQuery = useQuery({
    queryKey: ["movie-genre", 10749],
    queryFn: () => FetchMoviesByGenre(10749),
  });

  const comedyMoviesQuery = useQuery({
    queryKey: ["movie-genre", 35],
    queryFn: () => FetchMoviesByGenre(35),
  });

  const horrorMoviesQuery = useQuery({
    queryKey: ["movie-genre", 27],
    queryFn: () => FetchMoviesByGenre(27),
  });

  const genreSections = [
    { title: movieGenres[0].title, query: actionMoviesQuery },
    { title: movieGenres[1].title, query: romanceMoviesQuery },
    { title: movieGenres[2].title, query: comedyMoviesQuery },
    { title: movieGenres[3].title, query: horrorMoviesQuery },
  ];

  return (
    <main className="min-h-screen bg-[var(--bg)] px-4 pt-18 pb-28 text-[var(--text)] md:px-8 md:pt-28 md:pb-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-3">
        <section className="rounded-[2rem] text-white shadow-2xl md:px-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em]">
              <Sparkles size={14} />
              Movie hub
            </span>
          </div>
        </section>

        {searchTerm ? (
          <VideoCard
            title={`Search Results for "${searchTerm}"`}
            items={searchResults?.results ?? []}
            mediaType="movie"
            emptyMessage={
              isSearchLoading
                ? "Searching movies..."
                : `No movies matched "${searchTerm}". Try another title.`
            }
          />
        ) : null}

        <VideoCard
          title="Trending Movies"
          items={trendingMovies?.results ?? []}
          mediaType="movie"
          emptyMessage={
            isTrendingLoading
              ? "Loading trending movies..."
              : trendingError
                ? "Trending movies could not be loaded right now."
                : "No trending movies are available yet."
          }
        />

        {genreSections.map(({ title, query }) => (
          <VideoCard
            key={title}
            title={title}
            items={query.data?.results ?? []}
            mediaType="movie"
            emptyMessage={
              query.isLoading
                ? `Loading ${title.toLowerCase()}...`
                : `No ${title.toLowerCase()} are available right now.`
            }
          />
        ))}
      </div>
    </main>
  );
}