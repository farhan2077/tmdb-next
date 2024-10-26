"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { useCounterStore } from "@/libs/stores/counter-store";
import { cn } from "@/libs/utils";

interface AddToWatchlistButtonProps {
  initialIsFav: boolean;
  toggleFavouriteMovieAction: () => Promise<void>;
}

function AddToWatchlistButton({
  initialIsFav,
  toggleFavouriteMovieAction,
}: AddToWatchlistButtonProps) {
  const router = useRouter();
  const { increment, decrement } = useCounterStore();
  const [optimisticIsFav, setOptimisticIsFav] = useState(initialIsFav);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOptimisticIsFav(!optimisticIsFav);

    if (optimisticIsFav) {
      decrement();
    } else {
      increment();
    }

    try {
      await toggleFavouriteMovieAction();
      router.refresh();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error toggling favourite:", error);
      setOptimisticIsFav(optimisticIsFav);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="group overflow-hidden rounded-full"
    >
      <button
        type="submit"
        className="relative h-10 w-10 overflow-hidden rounded-full"
      >
        <div className="absolute inset-0 overflow-hidden rounded-full border border-white/10 bg-white/20 backdrop-blur"></div>
        <div className="relative flex h-full w-full items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            className={cn("size-6", {
              "fill-rose-500 stroke-rose-500 group-hover:fill-rose-500/80":
                optimisticIsFav,
              "fill-rose-500/20 stroke-rose-500 group-hover:fill-rose-500/40":
                !optimisticIsFav,
            })}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
        </div>
      </button>
    </form>
  );
}

export default AddToWatchlistButton;
