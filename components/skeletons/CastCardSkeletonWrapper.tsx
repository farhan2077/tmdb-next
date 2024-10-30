function CastCardSkeleton() {
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

function CastCardSkeletonWrapper() {
  return (
    <>
      <div className="mb-4 mt-8 flex items-center gap-2">
        <h2 className="font-semibold tracking-tight text-white">CASTS</h2>
        <button
          disabled={true}
          className="overflow-hidden rounded text-sm text-white/50 underline decoration-white/50 outline-none transition-colors hover:text-white focus:ring-0 focus:ring-offset-0"
        >
          See all
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:gap-8">
        <CastCardSkeleton />
        <CastCardSkeleton />
        <CastCardSkeleton />
        <CastCardSkeleton />
      </div>
    </>
  );
}

export default CastCardSkeletonWrapper;
