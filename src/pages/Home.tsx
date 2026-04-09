import { FetchTrendingMovies } from "../service/api";

export default function Home() {
  FetchTrendingMovies();
  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Welcome to the Movie App!</h1>
    </div>
  );
}
