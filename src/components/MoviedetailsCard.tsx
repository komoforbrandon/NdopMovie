import { useQuery } from "@tanstack/react-query";
import type { MediaSummary, MovieDetailsCardProps } from "../types/type";
import { FetchMovieDetails, FetchTvShowDetails } from "../service/api";
import { Star, ArrowLeft, Tv, Play, Film, Clock3 } from "lucide-react";

const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

function getMediaTitle(
  item?: MediaSummary | null,
  fallback: string = "Untitled",
): string {
  if (!item) return fallback;
  return item.title ?? item.name ?? fallback;
}

function getMediaReleaseDate(item?: MediaSummary | null): string {
  if (!item) return "Unknown";
  return item.release_date ?? item.first_air_date ?? "Unknown";
}

export default function MovieDetailsCard({
  item,
  mediaType,
  onClose,
}: MovieDetailsCardProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["mediaDetails", mediaType, item?.id],
    queryFn: () =>
      mediaType === "movie"
        ? FetchMovieDetails(String(item!.id))
        : FetchTvShowDetails(String(item!.id)),
    enabled: Boolean(item),
  });
  console.log('This is the data', data)
  if (!item) return null;

  const releaseDate = getMediaReleaseDate(data ?? item);
  const title = getMediaTitle(data ?? item);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-sm md:h-screen md:w-full">
      <div className="relative h-screen w-full overflow-y-auto bg-[var(--bg)] shadow-2xl md:h-screen md:w-full">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 left-4 z-10 rounded-full bg-slate-950/70 p-2 text-white transition-colors hover:bg-slate-950"
          aria-label="Go back"
        >
          <ArrowLeft size={18} />
        </button>

        {data?.backdrop_path || item.backdrop_path ? (
          <div className="relative h-64 w-full overflow-hidden">
            <img
              src={`${imageBaseUrl}${data?.backdrop_path ?? item.backdrop_path}`}
              alt={title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-slate-950/30 to-transparent " />
          </div>
        ) : null}

        <div className="space-y-6 px-6 py-6 sm:px-8">
          <div className="flex flex-col gap-6 md:flex-col">
            <div className="pointer-events-none absolute top-2 w-30 md:w-72 md:w-full ">
              {data?.poster_path || item.poster_path ? (
                <div className="flex h-80 items-center justify-center ">
                  <img
                    src={`${imageBaseUrl}${data?.poster_path ?? item.poster_path}`}
                    alt={title}
                    className="w-60 rounded-3xl object-cover shadow-lg"
                  />
                </div>
              ) : (
                <div className="flex h-80 items-center justify-center rounded-3xl bg-slate-200 px-4 text-center text-sm text-slate-500 dark:bg-slate-800 dark:text-slate-300">
                  Poster unavailable
                </div>
              )}
            </div>

            <div className="flex-1 space-y-4">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--text)]">
                  <a
                    href={`https://vidsrc-embed.ru/embed/movie?tmdb=${data?.id ?? item.id}&sub_url=https%3A%2F%2Fvidsrc.me%2Fsample.srt&autoplay=1`}
                    target="_self"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 p-3 font-medium text-blue-500"
                  >
                    <Play size={21} fill="currentColor" />
                  </a>
                  <span className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-3 py-1 font-medium text-blue-500">
                    {mediaType === "movie" ? (
                      <Film size={16} />
                    ) : (
                      <Tv size={16} />
                    )}
                    {mediaType === "movie" ? "Movie" : "TV"}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-amber-400/15 px-3 py-1 font-medium text-amber-600">
                    <Star size={16} fill="currentColor" />
                    {data?.vote_average
                      ? data.vote_average.toFixed(1)
                      : item.vote_average.toFixed(1)}
                  </span>
                  {releaseDate ? (
                    <span>{new Date(releaseDate).toDateString()}</span>
                  ) : null}
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-[var(--text-h)]">
                    {title}
                  </h2>
                  {data?.tagline ? (
                    <p className="mt-2 text-sm italic text-[var(--text)]">
                      {data.tagline}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="flex flex-wrap gap-3 text-sm text-[var(--text)]">
                {data?.runtime ? (
                  <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-3 py-1">
                    <Clock3 size={16} />
                    {data.runtime} min
                  </span>
                ) : null}

                {data?.number_of_seasons ? (
                  <span className="rounded-full border border-[var(--border)] px-3 py-1">
                    {data.number_of_seasons} season
                    {data.number_of_seasons > 1 ? "s" : ""}
                  </span>
                ) : null}

                {data?.number_of_episodes ? (
                  <span className="rounded-full border border-[var(--border)] px-3 py-1">
                    {data.number_of_episodes} episodes
                  </span>
                ) : null}

                {data?.status ? (
                  <span className="rounded-full border border-[var(--border)] px-3 py-1">
                    {data.status}
                  </span>
                ) : null}
              </div>

              {data?.genres?.length ? (
                <div className="flex flex-wrap gap-2">
                  {data.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="rounded-full bg-slate-500/10 px-3 py-1 text-sm text-[var(--text)]"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              ) : null}

              <div className="rounded-3xl border border-[var(--border)] bg-slate-500/5 p-4">
                <h3 className="mb-2 text-lg font-semibold text-[var(--text-h)]">
                  Overview
                </h3>
                {isLoading ? (
                  <p className="text-sm text-[var(--text)]">
                    Loading details...
                  </p>
                ) : error ? (
                  <p className="text-sm text-red-500">
                    Unable to load the full details right now.
                  </p>
                ) : (
                  <p className="leading-7 text-[var(--text)]">
                    {data?.overview ||
                      item.overview ||
                      "No overview is available yet."}
                  </p>
                )}
              </div>

              {data?.homepage ? (
                <a
                  href={data.homepage}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
                >
                  <Play size={16} />
                  Watch Now
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
