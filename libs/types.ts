export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
}

export interface FetchMovieQueryParams {
  page: number;
  searchTerm?: string;
}
