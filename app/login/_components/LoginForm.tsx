// login.tsx
"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

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
    <div className="flex min-h-dvh items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-md">
        <h1 className="mb-4 text-center text-2xl font-bold">
          {isLoggedIn ? "Already Logged In" : "Login"}
        </h1>

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
    </div>
  );
}
