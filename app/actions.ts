"use server";

import { getPlaiceholder } from "plaiceholder";

import { NEXT_PUBLIC_TMDB_API_KEY } from "@/env";
import { TMDB_BASE_URL } from "@/libs/constants";
import {
  type MovieDetails,
  MovieMembers,
  MovieRecommendations,
} from "@/libs/types";

const BASE_URL = TMDB_BASE_URL;
const API_KEY = NEXT_PUBLIC_TMDB_API_KEY;

export async function getMovieDetails(id: string): Promise<MovieDetails> {
  const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Failed to fetch movie details");
  return res.json();
}

export async function getMovieMembers(id: string): Promise<MovieMembers> {
  const res = await fetch(
    `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`,
    {
      next: { revalidate: 60 },
    }
  );
  if (!res.ok) throw new Error("Failed to fetch movie cast details");
  return res.json();
}

export async function getMovieRecommendations(
  id: string
): Promise<MovieRecommendations> {
  const res = await fetch(
    `${BASE_URL}/movie/${id}/recommendations?api_key=${API_KEY}`,
    {
      next: { revalidate: 60 },
    }
  );
  if (!res.ok) throw new Error("Failed to fetch related movie recommendations");
  return res.json();
}

export const getImage = async (src: string) => {
  const buffer = await fetch(src).then(async (res) =>
    Buffer.from(await res.arrayBuffer())
  );

  const {
    metadata: { height, width },
    ...plaiceholder
  } = await getPlaiceholder(buffer, { size: 10 });

  return {
    ...plaiceholder,
    img: { src, height, width },
  };
};
