"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
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

  const loading = isNavigating || isTransitioning;

  return (
    <div className="bg-background relative flex min-h-screen flex-col">
      {/* Decorative subtle gradient overlay that still respects CSS variables */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 select-none [background:radial-gradient(circle_at_50%_30%,hsl(var(--foreground)_/_.05),transparent_65%)]"
      />
      <main className="flex flex-grow flex-col items-center justify-center px-6 text-center">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6">
          <div className="space-y-4">
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
              <span className="from-primary via-primary/80 to-primary/60 bg-gradient-to-r bg-clip-text text-transparent">
                Invex
              </span>
            </h1>
            <p className="text-muted-foreground text-lg text-balance sm:text-xl">
              A modern inventory management system
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button
              size="lg"
              onClick={handleLoginClick}
              isLoading={loading}
              className="group relative overflow-hidden"
            >
              <span className="flex items-center gap-2">
                <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                  Login
                </span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Button>
          </div>
        </div>
      </main>
      <footer className="text-muted-foreground pb-6 text-center text-sm">
        © {new Date().getFullYear()} Invex. All rights reserved.
      </footer>
    </div>
  );
}
