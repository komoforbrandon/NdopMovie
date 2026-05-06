import failImage from "../assets/loadfail.png";
import WatchModal from "./WatchModal";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import {
  FetchTrendingMovies,
  FetchMovieDetails,
  FetchtrendingTvShows,
  FetchTvShowDetails,
} from "../service/api";
import { Star, Download, Tv, Play, Film, Clock3, InfoIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { MediaDetails } from "../types/type";

const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

export default function HeroSection({
  mediaType = "movie",
}: {
  mediaType?: "movie" | "tv";
}) {
  const queryClient = useQueryClient();
  const [index, setIndex] = useState(0);
  const [isModalOpen, setModalIsOpen] = useState(false);
  const { data: trendingMovies } = useQuery({
    queryKey: ["trendingMovies"],
    queryFn: () =>
      mediaType === "movie" ? FetchTrendingMovies() : FetchtrendingTvShows(),
  });
  const movies = useMemo(() => trendingMovies?.results || [], [trendingMovies]);

  useEffect(() => {
    if (!movies.length || isModalOpen) return;
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [movies, isModalOpen]);

  useEffect(() => {
    if (movies.length === 0) return;
    const nextIndex = (index + 1) % movies.length;
    const nextMovie = movies[nextIndex];

    queryClient.prefetchQuery({
      queryKey: ["movieDetails", "movie", nextMovie.id],
      queryFn: () => mediaType === "movie" ? FetchMovieDetails(String(nextMovie.id)) : FetchTvShowDetails(String(nextMovie.id)),
    });
  }, [movies, mediaType, index, queryClient]);

  const currentMovie = movies[index];

  const { data: movieDetails } = useQuery({
    queryKey: ["movieDetails", "movie", currentMovie?.id],
    queryFn: () => mediaType === "movie" ? FetchMovieDetails(String(currentMovie?.id)) : FetchTvShowDetails(String(currentMovie?.id)),
    enabled: !!currentMovie,
  });

  const item: MediaDetails | null = movieDetails ?? currentMovie ?? null;

  console.log("Details", trendingMovies)
  return (
    <div className="static inset-0 z-100 flex items-center justify-center bg-slate-950/10 backdrop-blur-sm md:h-fit md:w-full md:rounded-md">
      <div className="relative h-68 w-full overflow-hidden bg-(--bg) md:h-fit md:w-full rounded-sm md:rounded-none">
        {item?.backdrop_path ? (
          <div className="relative h-68 w-full overflow-hidden md:h-140">
            <img
              src={
                item.backdrop_path
                  ? `${imageBaseUrl}${item.backdrop_path}`
                  : failImage
              }
              alt={item.title ?? item.name ?? "Untitled"}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-(--bg) via-gray-950/60 to-transparent " />
          </div>
        ) : null}

        <div className="space-y-6 px-6 py-6 sm:px-8">
          <div className="flex flex-col gap-6 md:flex-col">
            <div className="absolute left-4 bottom-4 w-auto md:left-8 md:bottom-12 md:w-full">
              <div className="flex flex-row h-80 items-end justify-start gap-4">
                <div
                  className="w-full rounded-3xl  md:w-1/2 md:h-full"
                >
                  <h1 className="font-extrabold text-xl md:text-5xl text-white">
                    {item?.title ?? item?.name ?? "Untitled"}
                  </h1>
                  <p className="mt-1 text-md hidden md:block text-white md:text-lg">
                    {item?.overview} 
                  </p>
                  <div className="flex gap-4 py-4">
                    <button 
                    onClick={()=>setModalIsOpen(true)}
                    className="flex gap-2  items-center rounded-md px-6 py-3 bg-white cursor-pointer">
                      <Play size={20} fill="black"/>
                      Play  
                    </button>
                    <button className="px-6 py-3 flex gap-2 items-center rounded-md bg-gray-700 text-white cursor-pointer">
                     <InfoIcon size={20} color="gray" fill="white" />
                      More Info
                    </button>
                  </div>
                  </div>
                <div className="m-2 hidden">
                  <div>
                    <h2 className="text-[25px] font-bold  md:text-4xl text-blue-500/70">
                      {item?.title ?? item?.name ?? "Untitled"}
                    </h2>
                    {item?.tagline ? (
                      <p className="mt-1 text-md italic text-(--text) hidden md:block">
                        {item?.tagline}
                      </p>
                    ) : null}
                  </div>


                  <div className="flex-wrap items-center gap-3 mt-1 text-sm text-(--text) hidden">
                    <span
                      onClick={() => setModalIsOpen(true)}
                      className="inline-flex items-center gap-1 rounded-full cursor-pointer bg-blue-500/10 py-1 px-2 font-medium text-blue-500 md:py-2 md:px-3"
                    >
                      <Play size={21} fill="currentColor" />
                      Play
                      <WatchModal
                        iframelink={`https://vidsrc-embed.ru/embed/movie?tmdb=${item?.id ?? item?.id}&sub_url=https%3A%2F%2Fvidsrc.me%2Fsample.srt&autoplay=1`}
                        onClose={() => setModalIsOpen(false)}
                        isOpen={isModalOpen}
                      />
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 px-2 py-1 font-medium text-blue-500 md:py-2 md:px-3">
                      {mediaType === "movie" ? (
                        <Film size={20} />
                      ) : (
                        <Tv size={20} />
                      )}
                      {mediaType === "movie" ? "Movie" : "TV"}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/15 px-3 py-1 font-medium text-amber-600 md:py-2 md:px-3">
                      <Star size={16} fill="currentColor" />
                      {item?.vote_average.toFixed(1)}
                    </span>
                    <a
                      href={`https://vidsrc-embed.ru/embed/movie?tmdb=${item?.id ?? item?.id}&sub_url=https%3A%2F%2Fvidsrc.me%2Fsample.srt&autoplay=1`}
                      className="items-center gap-2 rounded-full bg-blue-500/10 p-3 font-medium text-blue-500 hidden md:inline-flex"
                      download={`https://vidsrc-embed.ru/embed/movie?tmdb=${item?.id ?? item?.id}&sub_url=https%3A%2F%2Fvidsrc.me%2Fsample.srt&autoplay=1.mp4`}
                    >
                      <Download size={20} />
                    </a>

                    {item?.release_date ? (
                      <span className="hidden md:inline-flex">
                        {new Date(item.release_date).toDateString()}
                      </span>
                    ) : null}
                    {item?.runtime ? (
                      <span className="items-center gap-1 font-bold rounded-full border border-(--border) px-2 py-1 inline-flex md:hidden">
                        <Clock3 size={16} />
                        {Math.floor(item.runtime / 60)}h {item.runtime % 60}m
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <div className="space-y-3"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
