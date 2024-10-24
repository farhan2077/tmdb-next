import assert from "assert";

assert(
  process.env.NEXT_PUBLIC_TMDB_API_KEY,
  `WARNING: env variable 'NEXT_PUBLIC_TMDB_API_KEY' not set`
);

export const NEXT_PUBLIC_TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
