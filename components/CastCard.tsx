import Image from "next/image";

import { Cast } from "@/libs/types";
import { imgUrlPrefixer } from "@/libs/utils";

function CastCard({ cast }: { cast: Cast }) {
  return (
    <div className="overflow-hidden rounded-lg border-2 border-white/50">
      <div className="relative aspect-square h-auto w-full">
        <Image
          fill
          src={imgUrlPrefixer(cast.profile_path, "low")}
          className="h-full w-full overflow-hidden object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          alt={cast.name}
        />
      </div>
      <div className="relative">
        <div
          className="absolute inset-0 overflow-hidden rounded-b-md bg-white/20 backdrop-blur"
          aria-hidden="true"
        ></div>
        <p className="relative truncate px-3 py-2 text-sm text-white">
          {cast.name}
        </p>
      </div>
    </div>
  );
}

export default CastCard;
