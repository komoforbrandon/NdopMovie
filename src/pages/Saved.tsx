import VideoCard from "../components/videoCard";
import { useSavedMedia } from "../hooks/useSavedMedia";
import Footer from "../components/footer";

export default function SavedMovies() {
  const { savedItems } = useSavedMedia();
  const savedMovies = savedItems.filter((item) => item.mediaType === "movie");
  const savedTvShows = savedItems.filter((item) => item.mediaType === "tv");

  return (
    <main className="min-h-screen bg-(--bg) pt-18 pb-19 text-(--text) md:px-8 md:pt-16 md:pb-12">
      <div className="mx-auto flex max-w-full flex-col gap-3 mb-5">

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
      <div className="hidden md:block">
        <Footer />
      </div>
    </main>
  )
}
