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

export default MovieCardSkeleton;
