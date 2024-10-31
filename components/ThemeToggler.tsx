"use client";

import { useLayoutEffect, useState } from "react";

import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

import { cn } from "@/libs/utils";

const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useLayoutEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // hack to counter hydration issue

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
      className={cn(
        "relative z-10 h-10 w-10 overflow-hidden rounded-full outline-none focus:ring-0 focus:ring-offset-0"
      )}
    >
      <div
        className={cn("absolute inset-0 overflow-hidden rounded-full border", {
          "border-white/10 bg-black/20 backdrop-blur dark:bg-white/20":
            !pathname.includes("movies"),
          "border-white/10 bg-black/20 backdrop-blur":
            pathname.includes("movies"),
        })}
      ></div>
      <div className="relative flex h-full w-full items-center justify-center">
        {theme === "dark" ? (
          // 🔆
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
            />
          </svg>
        ) : (
          // 🌕
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={cn("z-10 size-6", {
              "text-black": !pathname.includes("movies"),
              "text-white": pathname.includes("movies"),
            })}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
            />
          </svg>
        )}
      </div>
    </button>
  );
};

export default ThemeToggler;
