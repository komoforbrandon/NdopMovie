import { useQuery } from "@tanstack/react-query";
import { FetchtmdbData } from "../service/api";
import { FetchTrendingMovies } from "../service/api";

export default function VideoCard() {
    const { data, isLoading, error } = useQuery({
        queryKey: ["trending"],
        queryFn: FetchTrendingMovies,
      });
}