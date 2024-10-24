import { useInfiniteQuery } from "@tanstack/react-query"; // Ensure this is correct

import { NEXT_PUBLIC_TMDB_API_KEY } from "@/env";
import { TMDB_BASE_URL } from "@/libs/constants";
import { Movie } from "@/libs/types";

const BASE_URL = TMDB_BASE_URL;
const API_KEY = NEXT_PUBLIC_TMDB_API_KEY;

async function getMovies({ page = 1 }): Promise<Movie[]> {
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data.results;
}

interface UserQuery {
  pageSize: number;
}

export const useMovies = (query: UserQuery) =>
  useInfiniteQuery<Movie[], Error>({
    queryKey: ["movies", query],
    queryFn: ({ pageParam = 1 }) => getMovies({ page: pageParam as number }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length > 0 ? allPages.length + 1 : undefined,
  });
