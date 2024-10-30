import { Metadata } from "next";

import EmptyStatePlaceholder from "@/components/EmptyStatePlaceholder";
import MovieCard from "@/components/MovieCard";
import PageWrapper from "@/components/PageWrapper";
import { movies } from "@/libs/stores/in-memory";

export const metadata: Metadata = {
  title: "Watchlist",
};

export default function Watchlist() {
  return (
    <main className="pt-24">
      <PageWrapper>
        {movies.length === 0 ? (
          <EmptyStatePlaceholder
            type="empty-data"
            title="Empty"
            message="Your watchlist is empty. Mark any movie as favourite to see it in watchlist."
          />
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {movies.map((movie) => {
              return <MovieCard key={movie.id} movie={movie} />;
            })}
          </div>
        )}
      </PageWrapper>
    </main>
  );
}
