import { useInfiniteQuery } from "@tanstack/react-query";

import { fetchMovies } from "@/libs/api";
import { type FetchMovieQueryParams, Movie } from "@/libs/types";

export const useMovies = (query: FetchMovieQueryParams) =>
  useInfiniteQuery<Movie[], Error>({
    queryKey: ["movies", query],
    queryFn: ({ pageParam = 1 }) =>
      fetchMovies({ page: pageParam as number, searchTerm: query.searchTerm }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length > 0 ? allPages.length + 1 : undefined,
    enabled: !query.searchTerm || query.searchTerm.length >= 3,
  });
