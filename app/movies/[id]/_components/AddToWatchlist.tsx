import { movies } from "@/libs/stores/in-memory";
import { type MovieDetails } from "@/libs/types";
import { isMovieInWatchList, toggleFavouriteMovie } from "@/libs/utils";

import AddToWatchlistButton from "@/app/movies/[id]/_components/AddToWatchlistButton";

export default function AddToWatchList({
  movieDetails,
}: {
  movieDetails: MovieDetails;
}) {
  const initialIsFav = isMovieInWatchList(movies, movieDetails);

  async function toggleFavouriteMovieAction() {
    "use server";

    toggleFavouriteMovie(movies, movieDetails);
  }

  return (
    <AddToWatchlistButton
      initialIsFav={initialIsFav}
      toggleFavouriteMovieAction={toggleFavouriteMovieAction}
    />
  );
}
