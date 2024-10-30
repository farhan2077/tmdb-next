"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { getPlaiceholder } from "plaiceholder";

import { NEXT_PUBLIC_TMDB_API_KEY } from "@/env";
import { TMDB_BASE_URL } from "@/libs/constants";
import {
  type MovieDetails,
  type MovieMembers,
  type MovieRecommendations,
} from "@/libs/types";
import {
  MovieCastResponseSchema,
  MovieDetailsResponseSchema,
  MovieRecommendationsResponseSchema,
} from "@/libs/validations/responses";

const BASE_URL = TMDB_BASE_URL;
const API_KEY = NEXT_PUBLIC_TMDB_API_KEY;

export async function getMovieDetails(id: string): Promise<MovieDetails> {
  const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Failed to fetch movie details");

  const data = await res.json();
  const parsedData = MovieDetailsResponseSchema.parse(data);

  return parsedData;
}

export async function getMovieMembers(id: string): Promise<MovieMembers> {
  const res = await fetch(
    `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`,
    {
      cache: "force-cache",
    }
  );
  if (!res.ok) throw new Error("Failed to fetch movie cast details");

  const data = await res.json();
  const parsedData = MovieCastResponseSchema.parse(data);
  return parsedData;
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

  const data = await res.json();
  const parsedData = MovieRecommendationsResponseSchema.parse(data);
  return parsedData;
}

export const getImageAndPlaceHolder = async (src: string) => {
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

export async function setDemoCookie() {
  const oneDay = 24 * 60 * 60 * 1000;
  cookies().set("demoAuthCookie", "deliciousRamen", {
    secure: true,
    httpOnly: true,
    maxAge: oneDay,
    path: "/",
    sameSite: "lax",
  });

  revalidatePath("/login");
  revalidatePath("/watchlist");
}

export async function removeDemoCookie() {
  cookies().delete("demoAuthCookie");

  revalidatePath("/login");
  revalidatePath("/watchlist");
}
