import { Suspense } from "react";

import Image from "next/image";
import { notFound } from "next/navigation";

import CastCardSkeletonWrapper from "@/components/skeletons/CastCardSkeletonWrapper";
import MovieRecommendationsWrapperSkeleton from "@/components/skeletons/MovieRecommendationsWrapperSkeleton";
import { dateFormatter, imgUrlPrefixer } from "@/libs/utils";

import { getImageAndPlaceHolder, getMovieDetails } from "@/app/actions";
import AddToWatchList from "@/app/movies/[id]/_components/AddToWatchlist";
import CastCardWrapper from "@/app/movies/[id]/_components/CastCardWrapper";
import MovieRecommendationsWrapper from "@/app/movies/[id]/_components/MovieRecommendationsWrapper";

interface PageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = params;
  const movieDetails = await getMovieDetails(id);

  if (!movieDetails) {
    notFound();
  }

  return {
    title: movieDetails.title,
    description: movieDetails.overview,
  };
}

export default async function MovieDetails({ params }: PageProps) {
  const { id } = params;

  const movieDetails = await getMovieDetails(id);

  if (!movieDetails) {
    notFound();
  }

  const [backdropImage, posterImage] = await Promise.all([
    getImageAndPlaceHolder(imgUrlPrefixer(movieDetails.backdrop_path, "high")),
    getImageAndPlaceHolder(imgUrlPrefixer(movieDetails.poster_path, "low")),
  ]);

  return (
    <main>
      <div className="relative">
        <div className="absolute inset-0 z-0 bg-black/50 backdrop-blur-sm"></div>
        <Image
          src={backdropImage.img}
          alt={movieDetails.title}
          fill
          priority={true}
          placeholder="blur"
          blurDataURL={backdropImage.base64}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="-z-10 hidden min-h-dvh object-cover grayscale md:block"
          unoptimized={true}
        />
        <div className="mx-auto flex max-w-full translate-y-0 flex-col items-center justify-between gap-0 px-0 md:h-dvh md:max-w-screen-xl md:flex-row md:gap-8 md:px-8">
          <div
            className="z-20 order-2 h-[8rem] w-full -translate-y-full bg-gradient-to-t from-black to-transparent to-90% md:hidden"
            aria-hidden="true"
          >
            &nbsp;
          </div>
          <div className="relative z-20 order-3 -mt-[8.1rem] flex w-full flex-col gap-4 bg-black px-4 md:order-1 md:mt-0 md:bg-transparent md:px-0">
            <h1 className="order-1 text-pretty text-center text-3xl font-semibold tracking-tighter text-white sm:text-left md:order-2 md:text-7xl">
              {movieDetails.title}
            </h1>
            <div className="order-2 flex w-full items-center justify-center sm:items-start sm:justify-start md:order-1">
              <div className="flex w-fit items-center gap-1 text-sm md:text-base">
                <span className="text-white">
                  {movieDetails.adult ? "18+" : "PG"}
                </span>
                <span className="text-white">•</span>
                <span className="uppercase text-white">
                  {movieDetails.original_language}
                </span>
                <span className="text-white">•</span>
                <span className="text-white">
                  {dateFormatter(movieDetails.release_date, "full-year")}
                </span>
              </div>
            </div>
            <p className="order-3 line-clamp-3 max-w-xl text-pretty text-sm text-white md:text-left md:text-lg">
              {movieDetails.overview}
            </p>
            <div className="order-4 flex gap-4">
              {movieDetails.genres.map((genre) => {
                return (
                  <span
                    className="text-xs font-semibold uppercase text-neutral-500 md:text-sm md:text-neutral-400"
                    key={genre.id}
                  >
                    {genre.name}
                  </span>
                );
              })}
            </div>
            <div className="order-5 mr-0 lg:mr-52">
              <Suspense fallback={<CastCardSkeletonWrapper />}>
                <CastCardWrapper id={id} />
              </Suspense>
            </div>
          </div>
          <div className="relative order-1 aspect-[2/3] h-[60dvh] w-full overflow-hidden border-0 md:order-2 md:h-auto md:w-96 md:rounded-lg md:border-2 md:border-white/40">
            <div className="absolute right-4 top-7 z-30 md:top-4">
              <AddToWatchList movieDetails={movieDetails} />
            </div>
            <Image
              src={posterImage.img}
              alt={movieDetails.title}
              fill
              placeholder="blur"
              blurDataURL={posterImage.base64}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="z-20 object-cover"
              unoptimized={true}
            />
          </div>
        </div>
      </div>
      <div
        className="relative -z-10 h-[8rem] w-full -translate-y-full bg-gradient-to-t from-black to-transparent to-90% text-white"
        aria-hidden="true"
      >
        &nbsp;
      </div>
      <div className="-mt-[8.1rem] bg-black">
        <div className="mx-auto max-w-screen-xl px-4 text-white md:px-8">
          <h2 className="pb-4 pt-8 font-semibold tracking-tight text-white md:pt-0">
            YOU MAY ALSO LIKE
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:gap-8">
            <Suspense fallback={<MovieRecommendationsWrapperSkeleton />}>
              <MovieRecommendationsWrapper id={id} />
            </Suspense>
          </div>
        </div>
      </div>
      <div className="-mt-0.5 bg-black py-10" aria-hidden="true">
        &nbsp;
      </div>
    </main>
  );
}
