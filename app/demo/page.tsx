"use client";

import React, { useEffect, useState } from "react";

import { cn } from "@/libs/utils";

// LocalStorage Hook
function useLocalStorageArray<T>(key: string, initialValue: T[] = []) {
  const [items, setItems] = useState<T[]>(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return initialValue;
    }
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem(key, JSON.stringify(items));
      } catch (error) {
        console.error("Error writing to localStorage:", error);
      }
    }
  }, [key, items]);

  const addItem = (item: T) => {
    setItems((prevItems) => [...prevItems, item]);
  };

  const removeItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item: any) => item.id !== id));
  };

  return { items, addItem, removeItem };
}

// Task Interface
interface Task {
  id: string;
  title: string;
  description: string;
}

const Demo = () => {
  // State to track client-side rendering
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Fixed list of available items
  const availableItems: Task[] = [
    { id: "1", title: "The Shawshank Redemption", description: "Drama, 1994" },
    { id: "2", title: "The Godfather", description: "Crime, 1972" },
    { id: "3", title: "The Dark Knight", description: "Action, 2008" },
    { id: "4", title: "Pulp Fiction", description: "Crime, 1994" },
    { id: "5", title: "Fight Club", description: "Drama, 1999" },
  ];

  const {
    items: savedItems,
    addItem: addToWatchlist,
    removeItem: removeFromWatchlist,
  } = useLocalStorageArray<Task>("watchlist", []);

  const isInWatchlist = (id: string) => {
    return savedItems.some((item) => item.id === id);
  };

  const toggleWatchlist = (item: Task) => {
    if (isInWatchlist(item.id)) {
      removeFromWatchlist(item.id);
    } else {
      addToWatchlist(item);
    }
  };

  return (
    <div className="mx-auto w-full max-w-2xl">
      <h2 className="mb-4 text-2xl font-bold">Movie Watchlist</h2>
      <p className="mb-6 text-gray-600">
        Select movies to add to your watchlist
      </p>

      <div className="space-y-3">
        {availableItems.map((item) => {
          const added = isClient && isInWatchlist(item.id);
          return (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-lg bg-gray-50 p-4 transition-colors hover:bg-gray-100"
            >
              <div className="flex flex-col">
                <span className="font-medium">{item.title}</span>
                <span className="text-sm text-gray-500">
                  {item.description}
                </span>
              </div>
              <button
                onClick={() => toggleWatchlist(item)}
                className={`flex items-center gap-2 rounded-md px-4 py-2 ${
                  added
                    ? "bg-green-100 text-green-700 hover:bg-green-200"
                    : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  className={cn("h-5 w-5 stroke-rose-500", {
                    "fill-rose-500": added,
                  })}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
                <span>{added ? "Added" : "Add to Watchlist"}</span>
              </button>
            </div>
          );
        })}
      </div>

      {isClient && savedItems.length > 0 && (
        <div className="mt-8">
          <h3 className="mb-4 text-xl font-semibold">Your Watchlist</h3>
          <div className="space-y-3">
            {savedItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-lg bg-green-50 p-4"
              >
                <div className="flex flex-col">
                  <span className="font-medium">{item.title}</span>
                  <span className="text-sm text-gray-500">
                    {item.description}
                  </span>
                </div>
                <button
                  onClick={() => removeFromWatchlist(item.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Demo;
