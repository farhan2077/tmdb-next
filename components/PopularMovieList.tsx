"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDebounce } from "@uidotdev/usehooks";
import { z } from "zod";

import EmptyStatePlaceholder from "@/components/EmptyStatePlaceholder";
import MovieCard from "@/components/MovieCard";
import Spinner from "@/components/Spinner";
import { searchSchema } from "@/libs/form-schma";
import { useMovies } from "@/libs/queries";
import { cn } from "@/libs/utils";

type SearchFormValues = z.infer<typeof searchSchema>;

function MovieCardSkeleton() {
  return (
    <div className="group relative animate-pulse overflow-hidden rounded-lg border border-gray-300 shadow-lg transition-shadow duration-300 hover:shadow-xl">
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

export default function PopularMovieList() {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      search: "",
    },
    mode: "onChange", // This will validate on change
  });
  const searchTerm = watch("search");
  const debouncedSearch = useDebounce(searchTerm, 500);

  const { data, isLoading, error, fetchNextPage, isFetchingNextPage } =
    useMovies({
      page: 1,
      searchTerm: debouncedSearch.length >= 3 ? debouncedSearch : "",
    });

  if (isLoading)
    return (
      <div>
        <div className="mb-8">
          <input
            type="text"
            value={searchTerm}
            placeholder="Search for movies..."
            disabled={true}
            className="w-full rounded-lg border border-gray-200 bg-gray-100 px-4 py-2 focus:outline-none"
          />
        </div>
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
      </div>
    );

  if (error)
    return (
      <EmptyStatePlaceholder
        type="error"
        title="Error"
        message={`Error: ${error.message}`}
      />
    );

  if (!data)
    return (
      <EmptyStatePlaceholder
        type="empty-data"
        title="Empty"
        message="Data not found"
      />
    );

  if (data.pages[0].length === 0)
    return (
      <div>
        <div className="mb-5">
          <input
            autoFocus
            id="search"
            type="search"
            placeholder="Search for movies..."
            {...register("search")}
            value={searchTerm}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {searchTerm ? (
          <EmptyStatePlaceholder
            type="empty-data"
            title="Not found"
            message={`Nothing found for "${searchTerm}". Try searching for something else.`}
          />
        ) : null}
      </div>
    );

  return (
    <div>
      <div className="relative mb-8">
        <input
          autoFocus
          id="search"
          type="search"
          placeholder="Search for movies..."
          {...register("search")}
          value={searchTerm}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="absolute">
          {searchTerm && errors.search?.message ? (
            <p className="mt-1 text-sm">{errors.search.message}</p>
          ) : null}
        </div>
      </div>
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
          {isFetchingNextPage ? (
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
