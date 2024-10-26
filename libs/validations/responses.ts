import { z } from "zod";

export const MovieSchema = z
  .object({
    id: z.number(),
    title: z.string(),
    poster_path: z.string().nullable(),
    release_date: z.string(),
  })
  .passthrough();

export const MoviesResponseSchema = z
  .object({
    results: z.array(MovieSchema),
  })
  .passthrough();

// ---------------------------------------- //

const GenreSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const MovieDetailsResponseSchema = z
  .object({
    id: z.number(),
    adult: z.boolean(),
    original_language: z.string(),
    title: z.string(),
    backdrop_path: z.string().nullable(),
    overview: z.string(),
    poster_path: z.string().nullable(),
    release_date: z.string(),
    genres: z.array(GenreSchema),
  })
  .passthrough();

// ---------------------------------------- //

export const CastSchema = z
  .object({
    id: z.number(),
    name: z.string(),
    profile_path: z.string().nullable(),
  })
  .passthrough();

export const MovieCastResponseSchema = z.object({
  id: z.number(),
  cast: z.array(CastSchema),
});

// ---------------------------------------- //

// Define Zod schema for individual movie recommendation
const MovieRecommendationSchema = z.object({
  id: z.number(),
  title: z.string(),
  poster_path: z.string().nullable(),
});

// Define Zod schema for MovieRecommendations
export const MovieRecommendationsResponseSchema = z.object({
  results: z.array(MovieRecommendationSchema),
});
