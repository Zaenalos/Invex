"use client";

import { useState } from "react";
import { useTransition } from "../../../components/page-transition";

export default function Login() {
  const { navigate, isTransitioning } = useTransition();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [remember, setRemember] = useState(false);

  const handleLogin = async (formData: FormData) => {
    if (isTransitioning || isLoading) return;

    setIsLoading(true);
    setError("");

    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    // Basic validation
    if (!username || !password) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    try {
      // Replace with your actual authentication logic
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          remember,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Login failed");
      }

      const data = await response.json();

      // Store token/session data if needed
      if (remember) {
        localStorage.setItem("authToken", data.token);
      } else {
        sessionStorage.setItem("authToken", data.token);
      }

      // Navigate to dashboard on success
      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  // For development/demo purposes - remove in production
  const handleDemoLogin = () => {
    if (isTransitioning || isLoading) return;
    setIsLoading(true);

    // Simulate API delay
    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  };

  const handleBackHome = () => {
    if (isTransitioning || isLoading) return;
    navigate("/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-black via-gray-900 to-black px-4">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 h-80 w-80 bg-cyan-500/10 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-[28rem] w-[28rem] bg-sky-600/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-md">
        <div className="rounded-xl bg-gradient-to-b from-cyan-500/25 via-sky-600/15 to-transparent p-[1px]">
          <div className="rounded-xl border border-gray-800/70 bg-gray-900/75 px-8 pt-8 pb-6 shadow-xl backdrop-blur-xl">
            <div className="mb-7 text-center">
              <h1 className="bg-gradient-to-r from-cyan-400 via-sky-400 to-cyan-300 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
                Login
              </h1>
              <p className="mt-2 text-sm text-gray-400">Access and manage your inventory</p>
            </div>

            <form action={handleLogin} className="space-y-5" noValidate>
              <div className="space-y-2">
                <label htmlFor="username" className="block text-sm font-medium text-gray-200">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  autoComplete="username"
                  required
                  disabled={isLoading}
                  placeholder="Enter username"
                  className="w-full rounded-lg border border-gray-700/60 bg-gray-800/70 px-4 py-3 text-sm text-white placeholder-gray-500 shadow-sm transition-colors duration-150 hover:border-gray-500 focus:border-cyan-400 focus:bg-gray-800 focus:ring-2 focus:ring-cyan-500/40 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-200">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  autoComplete="current-password"
                  required
                  disabled={isLoading}
                  placeholder="Enter password"
                  className="w-full rounded-lg border border-gray-700/60 bg-gray-800/70 px-4 py-3 text-sm text-white placeholder-gray-500 shadow-sm transition-colors duration-150 hover:border-gray-500 focus:border-cyan-400 focus:bg-gray-800 focus:ring-2 focus:ring-cyan-500/40 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm font-medium text-red-400">
                  {error}
                </div>
              )}

              {/* Remember me */}
              <label className="group inline-flex cursor-pointer items-center gap-3 select-none">
                <input
                  id="remember"
                  type="checkbox"
                  checked={remember}
                  onChange={() => setRemember((r) => !r)}
                  disabled={isLoading}
                  className="sr-only"
                  aria-checked={remember}
                />
                <span
                  className={[
                    "flex h-5 w-5 items-center justify-center rounded-md shadow-sm transition-all duration-200 ease-out",
                    "border bg-gray-800/70",
                    remember
                      ? "border-cyan-400 bg-cyan-500/10"
                      : "border-gray-600/70 group-hover:border-gray-500",
                    isLoading ? "opacity-50" : "",
                  ].join(" ")}
                  aria-hidden
                >
                  <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    strokeWidth={2.4}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3.5 w-3.5 translate-y-[1px] text-cyan-400"
                  >
                    <path
                      d="M4 11.2 7.2 14.4 16 5.6"
                      stroke="currentColor"
                      strokeDasharray={28}
                      strokeDashoffset={remember ? 0 : 28}
                      style={{
                        transition:
                          "stroke-dashoffset 300ms cubic-bezier(0.16,1,0.3,1), opacity 180ms",
                        opacity: remember ? 1 : 0,
                      }}
                    />
                  </svg>
                </span>
                <span
                  className={`text-sm leading-snug text-gray-300 transition-colors group-hover:text-gray-200 ${isLoading ? "opacity-50" : ""}`}
                >
                  Remember me (30 days)
                </span>
              </label>

              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex w-full items-center justify-center rounded-lg bg-cyan-600 px-4 py-3 font-semibold text-white shadow-md shadow-cyan-900/30 transition-all duration-150 hover:bg-cyan-500 focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-900 focus:outline-none active:scale-[.985] active:bg-cyan-500/90 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-cyan-600"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="mr-2 -ml-1 h-4 w-4 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </button>

              {/* Demo Login Button - Remove in production */}
              <button
                type="button"
                onClick={handleDemoLogin}
                disabled={isLoading}
                className="inline-flex w-full items-center justify-center rounded-lg border border-gray-600 bg-transparent px-4 py-3 font-semibold text-gray-300 transition-all duration-150 hover:border-gray-500 hover:bg-gray-800/50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900 focus:outline-none active:scale-[.985] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Demo Login (Skip Auth)
              </button>
            </form>
          </div>
        </div>

        <div className="mt-5 text-center">
          <button
            onClick={handleBackHome}
            disabled={isLoading}
            className={`inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-300 ${isLoading || isTransitioning ? "cursor-not-allowed opacity-50" : ""}`}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
