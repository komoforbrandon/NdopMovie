import { Bookmark } from "lucide-react";
import VideoCard from "../components/videoCard";
import { useSavedMedia } from "../hooks/useSavedMedia";

export default function SavedMovies() {
  const { savedItems } = useSavedMedia();
  const savedMovies = savedItems.filter((item) => item.mediaType === "movie");
  const savedTvShows = savedItems.filter((item) => item.mediaType === "tv");

  return (
    <main className="min-h-screen bg-[var(--bg)] px-4 pt-18 pb-28 text-[var(--text)] md:px-8 md:pt-16 md:pb-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-3">
        <section className="rounded-[2rem] text-white shadow-2xl">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em]">
              <Bookmark size={14} />
              Saved list
            </span>
          </div>
        </section>

        <VideoCard
          title="Saved Movies"
          items={savedMovies}
          mediaType="movie"
          emptyMessage="Your saved movies will show up here after you bookmark them."
        />

        <VideoCard
          title="Saved TV Shows"
          items={savedTvShows}
          mediaType="tv"
          emptyMessage="Your saved TV shows will show up here after you bookmark them."
        />
      </div>
    </main>
  )
}
