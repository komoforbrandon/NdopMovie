import { Star, Bookmark } from "lucide-react";
import { useState } from "react";
import type { MediaSummary, MediaType } from "../types/type";
import { useSavedMedia } from "../hooks/useSavedMedia";
import MoviedetailsCard from "./MoviedetailsCard";

type VideoCardProps = {
  title: string;
  items: MediaSummary[];
  mediaType: MediaType;
  emptyMessage?: string;
};

const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

function getMediaTitle(item: MediaSummary) {
  return item.title ?? item.name ?? "Untitled";
}

function getReleaseDate(item: MediaSummary) {
  return item.release_date ?? item.first_air_date ?? "";
}

export default function VideoCard({
  title,
  items,
  mediaType,
  emptyMessage = "No titles are available right now.",
}: VideoCardProps) {
  const [selectedItem, setSelectedItem] = useState<MediaSummary | null>(null);
  const { isSaved, toggleSaved } = useSavedMedia();

  return (
    <>
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-[var(--text-h)]">{title}</h2>
          <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-blue-500">
            {mediaType}
          </span>
        </div>

        {items.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-[var(--border)] bg-white/40 px-6 py-10 text-center text-sm text-[var(--text)] shadow-sm dark:bg-slate-900/30">
            {emptyMessage}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {items.map((item) => {
              const itemIsSaved = isSaved(item.id, mediaType);

              return (
                <article
                  key={`${mediaType}-${item.id}`}
                  className="group overflow-hidden rounded-2xl border border-[var(--border)] bg-white/3 text-left shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setSelectedItem(item)}
                      className="block w-full text-left"
                    >
                      {item.poster_path ? (
                        <img
                          src={`${imageBaseUrl}${item.poster_path}`}
                          alt={getMediaTitle(item)}
                          className="h-42 w-full object-cover md:h-70"
                        />
                      ) : (
                        <div className="flex h-auto w-full items-center justify-center bg-slate-200 px-4 text-center text-sm font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-300">
                          Poster unavailable
                        </div>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleSaved(item, mediaType)}
                      className={`absolute top-2 right-2 z-10 rounded-full p-2 text-white transition-colors duration-200 ${
                        itemIsSaved ? "bg-blue-600" : "bg-slate-950/50"
                      }`}
                      aria-label={itemIsSaved ? "Remove from saved" : "Save title"}
                    >
                      <Bookmark
                        className="h-4 w-4"
                        fill={itemIsSaved ? "currentColor" : "none"}
                      />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedItem(item)}
                    className="w-full space-y-2 p-2 text-left"
                  >
                    <div className="flex items-start justify-between">
                      <h3 className="line-clamp-2 w-full text-base font-semibold text-[var(--text-h)]">
                        {getMediaTitle(item)}
                      </h3>
                    </div>
                    <div className="flex items-start justify-between gap-3">
                    <p className="text-sm text-[var(--text)]">
                      {getReleaseDate(item) ? new Date(getReleaseDate(item)).getFullYear() : "Coming soon"}
                    </p>
                      <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-amber-400/15 px-2 py-1 text-xs font-semibold text-amber-600">
                        <Star size={12} fill="currentColor" />
                        {item.vote_average ? item.vote_average.toFixed(1) : "N/A"}
                      </span>
                    </div>

                    <p className="line-clamp-3 text-sm text-[var(--text)] hidden">
                      {item.overview.trim() || "No overview available yet."}
                    </p>
                  </button>
                </article>
              );
            })}
          </div>
        )}
      </section>

      <MoviedetailsCard
        item={selectedItem}
        mediaType={mediaType}
        onClose={() => setSelectedItem(null)}
      />
    </>
  );
}
