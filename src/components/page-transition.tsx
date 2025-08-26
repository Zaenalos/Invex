"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

// Durations (ms) for minimal depth fade
const OUT_DURATION = 260; // time before pushing route
const IN_DURATION = 420; // entry animation
const EASE_OUTGOING: [number, number, number, number] = [0.4, 0, 0.2, 1];
const EASE_INCOMING: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Create context for transition control
type NavigateOptions = { x?: number; y?: number };

const TransitionContext = createContext<{
  navigate: (path: string, opts?: NavigateOptions) => void;
  isTransitioning: boolean;
} | null>(null);

export const useTransition = () => {
  const context = useContext(TransitionContext);
  if (!context) throw new Error("useTransition must be used within PageTransition");
  return context;
};

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  // State
  const [isTransitioning, setIsTransitioning] = useState(false); // true while outgoing + until incoming mostly in
  const [showContent, setShowContent] = useState(true); // fade gating
  const [incoming, setIncoming] = useState(false); // flag to style new page intro

  // Refs
  const pendingPathRef = useRef<string | null>(null);
  const outTimer = useRef<number | null>(null);
  const inTimer = useRef<number | null>(null);
  const doneTimer = useRef<number | null>(null);
  const failSafeTimer = useRef<number | null>(null);

  const clearTimers = () => {
    [outTimer, inTimer, doneTimer, failSafeTimer].forEach((r) => {
      if (r.current) {
        clearTimeout(r.current);
        r.current = null;
      }
    });
  };

  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const navigate = useCallback(
    (path: string) => {
      if (isTransitioning || path === pathname) return;
      pendingPathRef.current = path;
      setIsTransitioning(true);
      setIncoming(false);
      setShowContent(true);

      if (reducedMotion) {
        // simple fade
        setShowContent(false);
        outTimer.current = window.setTimeout(() => router.push(path), 100);
        inTimer.current = window.setTimeout(() => {
          setShowContent(true);
          setIsTransitioning(false);
          pendingPathRef.current = null;
        }, 220);
        return;
      }

      // Start outgoing depth dim (handled via animated props)
      outTimer.current = window.setTimeout(() => {
        if (pendingPathRef.current) router.push(pendingPathRef.current);
      }, OUT_DURATION);

      // Failsafe
      failSafeTimer.current = window.setTimeout(() => {
        setIsTransitioning(false);
        setShowContent(true);
        setIncoming(false);
        pendingPathRef.current = null;
      }, 5000);
    },
    [isTransitioning, pathname, router, reducedMotion],
  );

  // When route changes to target begin incoming sequence
  useEffect(() => {
    if (!pendingPathRef.current) return;
    if (pathname === pendingPathRef.current) {
      setIncoming(true);
      setShowContent(false); // will fade in with motion variants
      // Stagger reveal slightly after mount for smoother feel
      inTimer.current = window.setTimeout(() => setShowContent(true), 40);
      doneTimer.current = window.setTimeout(() => {
        setIsTransitioning(false);
        setIncoming(false);
        pendingPathRef.current = null;
        clearTimers();
      }, IN_DURATION + 60);
    }
  }, [pathname]);

  // Cleanup on unmount
  useEffect(() => clearTimers, []);

  return (
    <TransitionContext.Provider value={{ navigate, isTransitioning }}>
      <div className="relative min-h-screen overflow-hidden bg-black">
        {/* Content container with depth transforms */}
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, scale: 0.96, filter: "blur(6px) brightness(0.6)", y: 8 }}
            animate={{
              opacity: showContent ? 1 : 0,
              scale: incoming ? 1 : isTransitioning ? 1.02 : 1,
              y: incoming ? 0 : isTransitioning ? 4 : 0,
              filter: isTransitioning
                ? "blur(4px) brightness(0.68) contrast(0.92)"
                : incoming
                  ? "blur(0px) brightness(1)"
                  : "blur(0px) brightness(1)",
            }}
            transition={{
              duration: incoming ? IN_DURATION / 1000 : 0.35,
              ease: incoming ? EASE_INCOMING : EASE_OUTGOING,
            }}
            className="min-h-screen w-full bg-black will-change-transform"
          >
            {children}
          </motion.div>
        </AnimatePresence>

        {/* Black overlay fade for depth dimming */}
        <motion.div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-40 bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: isTransitioning ? 0.55 : 0 }}
          transition={{ duration: 0.32, ease: EASE_OUTGOING }}
        />

        {/* (Removed cyan underglow pulse by user request) */}
      </div>
    </TransitionContext.Provider>
  );
}
