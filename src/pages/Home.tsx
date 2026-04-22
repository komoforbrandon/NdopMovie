import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import Loader from "../components/Loader";
import VideoCard from "../components/videoCard";
import HeroSection from "../components/herosection";
import Footer from "../components/footer";
import {
  FetchTrendingMovies,
  FetchtrendingTvShows,
  FetchtmdbData,
  SearchTvShows,
} from "../service/api";

export default function Home() {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("query")?.trim() ?? "";

  const { data: movieSearchResults, isLoading: isMovieSearchLoading } =
    useQuery({
      queryKey: ["home-movie-search", searchTerm],
      queryFn: () => FetchtmdbData(searchTerm),
      enabled: Boolean(searchTerm),
    });

  const { data: tvSearchResults, isLoading: isTvSearchLoading } = useQuery({
    queryKey: ["home-tv-search", searchTerm],
    queryFn: () => SearchTvShows(searchTerm),
    enabled: Boolean(searchTerm),
  });

  const {
    data: trendingMovies,
    isLoading: isTrendingMoviesLoading,
    error: trendingMoviesError,
  } = useQuery({
    queryKey: ["home-trending-movies"],
    queryFn: FetchTrendingMovies,
  });

  const {
    data: trendingTvShows,
    isLoading: isTrendingTvShowsLoading,
    error: trendingTvShowsError,
  } = useQuery({
    queryKey: ["home-trending-tv-shows"],
    queryFn: FetchtrendingTvShows,
  });

  console.log("Trending Movies Data:", trendingMovies);

  return (
    <main className="min-h-screen bg-(--bg) px-0 pt-14 pb-16 text-(--text) md:px-8 md:pt-3 md:pb-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-3">
        {searchTerm ? (
          <>
            {isMovieSearchLoading ? (
              <Loader title="Searching movies" badge="movie" />
            ) : (
              <section className="rounded-2xl bg-(--bg) px-4 text-(--text)">
              <VideoCard
                title={`Movie Results for "${searchTerm}"`}
                items={movieSearchResults?.results ?? []}
                mediaType="movie"
                emptyMessage={`No movies matched "${searchTerm}". Try another title.`}
              />
              </section>
            )}

            {isTvSearchLoading ? (
              <Loader title="Searching TV shows" badge="tv" />
            ) : (
              <section className="rounded-2xl bg-(--bg) px-4 text-(--text)">
              <VideoCard
                title={`TV Results for "${searchTerm}"`}
                items={tvSearchResults?.results ?? []}
                mediaType="tv"
                emptyMessage={`No TV shows matched "${searchTerm}". Try another title.`}
              />
              </section>
            )}
          </>
        ) : (
          <>
            <section className="rounded-2xl bg-(--bg) text-(--text)">
              <div className="">
                {/* <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] border border-slate-900/10 dark:bg-slate-700/8">
              <Sparkles size={14} />
              Featured today
            </span> */}
                <HeroSection />
              </div>
            </section>
            <section className="rounded-2xl bg-(--bg) px-4 text-(--text)">
            {isTrendingMoviesLoading ? (
              <Loader title="Loading trending movies" badge="movie" />
            ) : (
              <VideoCard
                title="Trending Movies"
                items={trendingMovies?.results ?? []}
                mediaType="movie"
                emptyMessage={
                  trendingMoviesError
                    ? "Trending movies could not be loaded right now."
                    : "No trending movies are available right now."
                }
              />
            )}

            {isTrendingTvShowsLoading ? (
              <Loader title="Loading trending TV shows" badge="tv" />
            ) : (
              <VideoCard
                title="Trending TV Shows"
                items={trendingTvShows?.results ?? []}
                mediaType="tv"
                emptyMessage={
                  trendingTvShowsError
                    ? "Trending TV shows could not be loaded right now."
                    : "No trending TV shows are available right now."
                }
              />
            )}
            </section>
          </>
        )}

        <Footer />
      </div>
    </main>
  );
}
