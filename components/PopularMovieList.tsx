"use client";

import React from "react";

import Image from "next/image";
import Link from "next/link";

import Spinner from "@/components/Spinner";
import { useMovies } from "@/libs/api";
import { Movie } from "@/libs/types";
import { cn, dateFormatter, imgUrlPrefixer } from "@/libs/utils";

function MovieCardSkeleton() {
  return (
    <div className="group relative animate-pulse overflow-hidden rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-xl">
      <div className="relative aspect-[2/3]">
        <div className="h-full w-full bg-gray-200"></div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="mb-1 h-4 w-10/12 truncate rounded bg-gray-300"></div>
        <div className="h-3 w-1/3 rounded bg-gray-300"></div>
      </div>
    </div>
  );
}

function MovieCard({ movie }: { movie: Movie }) {
  return (
    <Link
      href={`/movies/${movie.id}`}
      className="group relative overflow-hidden rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-xl"
    >
      <div className="relative aspect-[2/3]">
        <Image
          src={imgUrlPrefixer(movie.poster_path, "low")}
          alt={movie.title}
          fill
          className="object-cover duration-300 ease-out group-hover:scale-105"
          priority={false}
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[hsl(0,0%,10%)] to-transparent p-4">
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

export default function PopularMovieList() {
  const { data, isLoading, error, fetchNextPage, isFetchingNextPage } =
    useMovies({ pageSize: 1 });

  if (isLoading)
    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        <MovieCardSkeleton />
        <MovieCardSkeleton />
        <MovieCardSkeleton />
        <MovieCardSkeleton />
        <MovieCardSkeleton />
        <MovieCardSkeleton />
        <MovieCardSkeleton />
        <MovieCardSkeleton />
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>Error: Data not found</div>;

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {data.pages
          .flatMap((page) => page)
          .map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
      </div>
      <div className="my-10 flex w-full justify-center">
        <button
          onClick={() => fetchNextPage()}
          className={cn(
            "flex h-12 w-fit items-center justify-between rounded-lg px-6 font-semibold text-white",
            {
              "bg-blue-700 shadow-md shadow-blue-100 hover:bg-blue-600":
                !isFetchingNextPage,
              "cursor-not-allowed bg-gray-500": isFetchingNextPage,
            }
          )}
          disabled={isFetchingNextPage}
        >
          {!isFetchingNextPage ? (
            <>
              <Spinner color="text-white" />
              <span>Loading&#8230;</span>
            </>
          ) : (
            "Load more"
          )}
        </button>
      </div>
    </div>
  );
}
