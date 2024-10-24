import { type ClassValue, clsx } from "clsx";

import {
  TMBD_IMG_PREFIX_HIGH_QUALITY,
  TMBD_IMG_PREFIX_LOW_QUALITY,
} from "@/libs/constants";

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
