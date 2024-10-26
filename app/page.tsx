import PageWrapper from "@/components/PageWrapper";
import PopularMovieList from "@/components/PopularMovieList";

export default async function Home() {
  return (
    <main className="pt-24">
      <PageWrapper>
        <PopularMovieList />
      </PageWrapper>
    </main>
  );
}
