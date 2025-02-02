"use client"; // Error components must be Client Components

import { useEffect } from "react";

import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // log the error to an error reporting service
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="mb-4 text-3xl tracking-tight">Something went wrong 😩</h1>
      <div className="flex items-center gap-1">
        <button
          className="font-medium text-blue-600"
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Try again
        </button>{" "}
        or
        <Link href="/" className="font-medium text-blue-600 underline">
          go to homepage
        </Link>
      </div>
    </div>
  );
}
