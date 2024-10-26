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
export interface MovieDetails extends Movie {
  adult: boolean;
  original_language: string;
  title: string;
  backdrop_path: string;
  overview: string;
  genres: Genre[];
}

interface Cast {
  id: number;
  name: string;
  profile_path: string;
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
