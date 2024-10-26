import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center gap-2 pt-24">
      <p className="text-3xl">🥲</p>
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>Could not find what you were looking for</p>
      <Link href="/">
        ←&nbsp;
        <span className="font-medium text-blue-600 underline">
          Go to homepage
        </span>
      </Link>
    </main>
  );
}
