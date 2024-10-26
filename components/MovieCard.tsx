import { useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { Movie, MovieDetails } from "@/libs/types";
import { cn, dateFormatter, imgUrlPrefixer } from "@/libs/utils";

function MovieCard({ movie }: { movie: Movie | MovieDetails }) {
  const [isImageLoading, setImageLoading] = useState(true);

  return (
    <Link
      href={`/movies/${movie.id}`}
      className="group relative overflow-hidden rounded-lg border border-gray-100 shadow-lg transition-shadow duration-300 hover:shadow-xl"
    >
      <div className="relative aspect-[2/3]">
        <Image
          src={imgUrlPrefixer(movie.poster_path, "low")}
          alt={movie.title}
          fill
          priority={false}
          onLoad={() => setImageLoading(false)}
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkiKurBwACnwFdJzWtQgAAAABJRU5ErkJggg=="
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover duration-300 ease-out group-hover:scale-105"
        />
      </div>
      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[hsl(0,0%,10%)] to-transparent p-4 transition-opacity duration-300",
          {
            "opacity-100": !isImageLoading,
            "opacity-0": isImageLoading,
          }
        )}
      >
        <h2 className="truncate text-base font-semibold text-white drop-shadow sm:translate-y-3 sm:text-lg sm:transition-transform sm:duration-300 sm:ease-out sm:group-hover:translate-y-0">
          {movie.title}
        </h2>
        <p className="text-sm text-gray-200 drop-shadow sm:translate-y-1 sm:opacity-0 sm:transition-all sm:duration-300 sm:ease-out sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
          {dateFormatter(movie.release_date, "full-year")}
        </p>
      </div>
    </Link>
  );
}

export default MovieCard;
