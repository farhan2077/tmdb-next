export interface Movie {
  id: number;
  title: string;
  poster_path: string;
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
  backdrop_path: string;
  overview: string;
  poster_path: string;
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

export interface MovieRecommendations {
  results: {
    id: number;
    title: string;
    poster_path: string;
  }[];
}

export interface FetchMovieQueryParams {
  page: number;
  searchTerm?: string;
}
