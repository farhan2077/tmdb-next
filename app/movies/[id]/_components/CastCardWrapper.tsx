import CastCard from "@/components/CastCard";

import { getMovieMembers } from "@/app/actions";
import ViewCasts from "@/app/movies/[id]/_components/ViewCasts";

async function CastCardWrapper({ id }: { id: string }) {
  const movieMembers = await getMovieMembers(id);

  return (
    <>
      <div className="mb-4 mt-8 flex items-center gap-2">
        <h2 className="font-semibold tracking-tight text-white">CASTS</h2>
        <ViewCasts casts={movieMembers.cast} />
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:gap-8">
        {movieMembers.cast.slice(0, 4).map((cast) => {
          return <CastCard key={cast.id} cast={cast} />;
        })}
      </div>
    </>
  );
}

export default CastCardWrapper;
