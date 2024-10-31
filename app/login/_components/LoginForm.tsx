// login.tsx
"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import PageWrapper from "@/components/PageWrapper";

import { removeDemoCookie, setDemoCookie } from "@/app/actions";

export default function LoginForm({ initialLoggedIn = false }) {
  const [isLoggedIn, setIsLoggedIn] = useState(initialLoggedIn);
  const router = useRouter();

  const handleLogin = async () => {
    await setDemoCookie();
    setIsLoggedIn(true);
    router.refresh();
  };

  const handleLogout = async () => {
    await removeDemoCookie();
    setIsLoggedIn(false);
    router.refresh();
  };

  return (
    <main className="flex min-h-dvh items-center justify-center bg-gray-100 dark:bg-black">
      <PageWrapper>
        <div className="w-80 rounded-xl bg-white p-6 shadow-md dark:bg-neutral-800">
          <h2 className="mb-4 text-center text-2xl font-bold text-black dark:text-white">
            {isLoggedIn ? "Already Logged In" : "Login now"}
          </h2>

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="w-full rounded-lg bg-red-500 p-2 font-semibold text-white hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={handleLogin}
              className="w-full rounded-lg bg-blue-500 p-2 font-semibold text-white hover:bg-blue-600"
            >
              Login
            </button>
          )}
        </div>
      </PageWrapper>
    </main>
  );
}
