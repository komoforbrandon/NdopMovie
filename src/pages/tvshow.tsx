import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import VideoCard from "../components/videoCard";
import {
  FetchtrendingTvShows,
  FetchTvShows,
  SearchTvShows,
} from "../service/api";
import HeroSection from "../components/herosection";

export default function TVShow() {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("query")?.trim() ?? "";

  const { data: searchResults, isLoading: isSearchLoading } = useQuery({
    queryKey: ["tv-search", searchTerm],
    queryFn: () => SearchTvShows(searchTerm),
    enabled: Boolean(searchTerm),
  });

  const {
    data: trendingTvShows,
    isLoading: isTrendingLoading,
    error: trendingError,
  } = useQuery({
    queryKey: ["trending-tv-shows"],
    queryFn: FetchtrendingTvShows,
  });

  const {
    data: popularTvShows,
    isLoading: isPopularLoading,
    error: popularError,
  } = useQuery({
    queryKey: ["popular-tv-shows"],
    queryFn: FetchTvShows,
  });

  return (
    <main className="min-h-screen bg-(--bg) px-4 pt-18 pb-28 text-(--text) md:px-8 md:pt-3 md:pb-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-3">
        {searchTerm ? (
          <VideoCard
            title={`TV Search Results for "${searchTerm}"`}
            items={searchResults?.results ?? []}
            mediaType="tv"
            emptyMessage={
              isSearchLoading
                ? "Searching TV shows..."
                : `No TV shows matched "${searchTerm}". Try another title.`
            }
          />
        ) : (
          <>
            <section className="text-white">
              <div className="w-full">
                <HeroSection mediaType="tv" />
              </div>
            </section>

            <VideoCard
              title="Trending TV Shows"
              items={trendingTvShows?.results ?? []}
              mediaType="tv"
              emptyMessage={
                isTrendingLoading
                  ? "Loading trending TV shows..."
                  : trendingError
                    ? "Trending TV shows could not be loaded right now."
                    : "No trending TV shows are available yet."
              }
            />

            <VideoCard
              title="Popular TV Shows"
              items={popularTvShows?.results ?? []}
              mediaType="tv"
              emptyMessage={
                isPopularLoading
                  ? "Loading popular TV shows..."
                  : popularError
                    ? "Popular TV shows could not be loaded right now."
                    : "No TV shows are available right now."
              }
            />
          </>
        )}
      </div>
    </main>
  );
}
