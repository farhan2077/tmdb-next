import { NEXT_PUBLIC_TMDB_API_KEY } from "@/env";
import { TMDB_BASE_URL } from "@/libs/constants";
import { Movie } from "@/libs/types";

const BASE_URL = TMDB_BASE_URL;
const API_KEY = NEXT_PUBLIC_TMDB_API_KEY;

interface FetchMovieQueryParams {
  page: number;
  searchTerm?: string;
}

export async function fetchMovies({
  page = 1,
  searchTerm,
}: FetchMovieQueryParams): Promise<Movie[]> {
  const queryPrefix = searchTerm
    ? `${BASE_URL}/search/movie`
    : `${BASE_URL}/movie/popular`;

  const response = await fetch(
    `${queryPrefix}?api_key=${API_KEY}&page=${page}${searchTerm ? `&query=${encodeURIComponent(searchTerm)}` : ""}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data.results;
}
