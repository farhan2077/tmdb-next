import { type ClassValue, clsx } from "clsx";

import {
  TMBD_IMG_PREFIX_HIGH_QUALITY,
  TMBD_IMG_PREFIX_LOW_QUALITY,
} from "@/libs/constants";
import { type MovieDetails } from "@/libs/types";

export function imgUrlPrefixer(
  imgPath: string,
  quality: "low" | "high"
): string {
  if (imgPath === null) {
    return "https://picsum.photos/200/300/?blur"; // fallback image
  }

  if (quality === "low") {
    return `${TMBD_IMG_PREFIX_LOW_QUALITY}${imgPath}`;
  }

  if (quality === "high") {
    return `${TMBD_IMG_PREFIX_HIGH_QUALITY}${imgPath}`;
  }

  throw new Error("Invalid params");
}

export function dateFormatter(
  date: string,
  type: "full-year"
): number | string {
  if (date === "") {
    return "Not available";
  }

  if (type === "full-year") {
    return new Date(date).getFullYear();
  }

  throw new Error("Invalid params");
}

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function findMovieIndex(array: MovieDetails[], item: MovieDetails) {
  return array.findIndex((existingItem) => existingItem.id === item.id);
}

export function isMovieInWatchList(array: MovieDetails[], item: MovieDetails) {
  return findMovieIndex(array, item) !== -1;
}

export function toggleFavouriteMovie(
  array: MovieDetails[],
  item: MovieDetails
) {
  const index = findMovieIndex(array, item);

  if (index !== -1) {
    array.splice(index, 1);
    return "fill-rose-500 stroke-rose-500";
  } else {
    array.push(item);
    return "stroke-rose-500 fill-rose-50";
  }
}
