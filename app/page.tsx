import PopularMovieList from "@/components/PopularMovieList";

export default async function Home() {
  return (
    <div>
      <h1 className="my-8 text-center text-3xl font-bold">Popular Movies</h1>
      <PopularMovieList />
    </div>
  );
}
