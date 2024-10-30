function MovieRecommendationSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-lg border-2 border-white/50">
      <div className="relative aspect-square h-auto w-full">
        <div className="h-full w-full overflow-hidden bg-gray-200 object-cover"></div>
      </div>
      <div className="relative">
        <div className="absolute inset-0 overflow-hidden rounded-b-md bg-white/20 backdrop-blur"></div>
        <div className="relative truncate bg-gray-200 px-3 py-2 text-sm"></div>
      </div>
    </div>
  );
}

function MovieRecommendationsWrapperSkeleton() {
  return (
    <>
      <MovieRecommendationSkeleton />
      <MovieRecommendationSkeleton />
      <MovieRecommendationSkeleton />
      <MovieRecommendationSkeleton />
    </>
  );
}

export default MovieRecommendationsWrapperSkeleton;
