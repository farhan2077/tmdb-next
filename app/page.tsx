import PopularMovieList from "@/components/PopularMovieList";

function PageWrapper({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-7xl px-4">{children}</div>;
}

export default async function Home() {
  return (
    <main>
      <PageWrapper>
        <h1 className="my-8 text-center text-3xl font-bold">Popular Movies</h1>
        <PopularMovieList />
      </PageWrapper>
    </main>
  );
}
