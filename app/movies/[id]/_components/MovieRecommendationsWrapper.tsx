import RecommendedMovieCard from "@/components/RecommendedMovieCard";

import { getMovieRecommendations } from "@/app/actions";

async function MovieRecommendationsWrapper({ id }: { id: string }) {
  const movieRecommendations = await getMovieRecommendations(id);

  return movieRecommendations.results.map((recommendedMovie) => {
    return (
      <RecommendedMovieCard
        recommendedMovie={recommendedMovie}
        key={recommendedMovie.id}
      />
    );
  });
}

export default MovieRecommendationsWrapper;
