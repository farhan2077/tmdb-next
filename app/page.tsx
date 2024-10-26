import PageWrapper from "@/components/PageWrapper";
import PopularMovieList from "@/components/PopularMovieList";

export default async function Home() {
  return (
    <main className="bg-white pt-24 dark:bg-black">
      <PageWrapper>
        <PopularMovieList />
      </PageWrapper>
    </main>
  );
}
