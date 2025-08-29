"use client";

import { useState } from "react";
import { useTransition } from "../components/page-transition";

export default function EntryPoint() {
  const [isNavigating, setIsNavigating] = useState(false);
  const { navigate, isTransitioning } = useTransition();

  const handleLoginClick = () => {
    if (isTransitioning) return;
    setIsNavigating(true);
    navigate("/login");
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-gradient-to-b from-black via-gray-900 to-black">
      <main className="flex flex-grow flex-col items-center justify-center px-6 text-center">
        <h1 className="mb-4 text-5xl font-extrabold text-white sm:text-6xl lg:text-7xl">Invex</h1>
        <p className="mb-8 text-lg font-light text-gray-300 sm:text-xl lg:text-2xl">
          A modern inventory management system
        </p>
        <button
          onClick={handleLoginClick}
          className={`group relative inline-flex items-center gap-2 text-lg font-medium text-cyan-300 transition-all duration-300 after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-gradient-to-r after:from-cyan-400 after:via-sky-500 after:to-blue-600 after:transition-transform after:duration-300 after:content-[''] hover:text-cyan-200 hover:after:scale-x-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:text-xl ${
            isNavigating || isTransitioning ? "scale-95 opacity-75" : ""
          }`}
        >
          <span
            className={`transition-transform duration-300 ${isNavigating ? "translate-x-1" : ""}`}
          >
            Login
          </span>
          <svg
            className={`h-5 w-5 transition-transform duration-300 ${isNavigating ? "translate-x-2 scale-110" : "group-hover:translate-x-1"}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </button>
      </main>

      <footer className="pb-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Invex. All rights reserved.
      </footer>
    </div>
  );
}
