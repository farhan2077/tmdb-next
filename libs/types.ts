export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
}

interface Genre {
  id: number;
  name: string;
}
export interface MovieDetails {
  id: number;
  adult: boolean;
  original_language: string;
  title: string;
  backdrop_path: string | null;
  overview: string;
  poster_path: string | null;
  release_date: string;
  genres: Genre[];
}

export interface Cast {
  id: number;
  name: string;
  profile_path: string | null;
}

export interface MovieMembers {
  cast: Cast[];
}

export interface RecommendedMovie {
  id: number;
  title: string;
  poster_path: string | null;
}

export interface MovieRecommendations {
  results: RecommendedMovie[];
}

export interface FetchMovieQueryParams {
  page: number;
  searchTerm?: string;
}
