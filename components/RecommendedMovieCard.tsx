"use client";

import { useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { RecommendedMovie } from "@/libs/types";
import { cn, imgUrlPrefixer } from "@/libs/utils";

function RecommendedMovieCard({
  recommendedMovie,
}: {
  recommendedMovie: RecommendedMovie;
}) {
  const [isImageLoading, setImageLoading] = useState(true);

  return (
    <Link href={`/movies/${recommendedMovie.id}`} className="group rounded-lg">
      <div className="relative aspect-[4/5] h-auto w-full overflow-hidden rounded-lg border-2 border-white/0 transition-colors group-hover:border-white/50">
        <Image
          fill
          src={imgUrlPrefixer(recommendedMovie.poster_path, "low")}
          alt={recommendedMovie.title}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onLoad={() => setImageLoading(false)}
          className={cn("h-full w-full overflow-hidden object-cover", {
            "scale-110 blur-2xl grayscale": isImageLoading,
            "scale-100 blur-0 grayscale-0": !isImageLoading,
          })}
          unoptimized={true}
        />
      </div>
      <p className="mt-3 truncate">{recommendedMovie.title}</p>
    </Link>
  );
}

export default RecommendedMovieCard;
