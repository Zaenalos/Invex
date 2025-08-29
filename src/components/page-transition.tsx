"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

// Transition durations (ms)
const OUT_DURATION = 260; // before pushing route
const IN_DURATION = 420; // entry animation
const EASE_OUTGOING: [number, number, number, number] = [0.4, 0, 0.2, 1];
const EASE_INCOMING: [number, number, number, number] = [0.16, 1, 0.3, 1];

type TransitionContextType = {
  navigate: (path: string) => void;
  isTransitioning: boolean;
};

const TransitionContext = createContext<TransitionContextType | null>(null);

export const useTransition = () => {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error("useTransition must be used within PageTransition");
  }
  return context;
};

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  // State
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showContent, setShowContent] = useState(true);
  const [incoming, setIncoming] = useState(false);

  // Refs
  const pendingPathRef = useRef<string | null>(null);
  const timers = useRef<NodeJS.Timeout[]>([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const navigate = useCallback(
    (path: string) => {
      if (isTransitioning || path === pathname) return;

      pendingPathRef.current = path;
      setIsTransitioning(true);
      setIncoming(false);
      setShowContent(true);

      if (reducedMotion) {
        // Simple fade
        setShowContent(false);
        timers.current.push(
          setTimeout(() => router.push(path), 100),
          setTimeout(() => {
            setShowContent(true);
            setIsTransitioning(false);
            pendingPathRef.current = null;
          }, 220),
        );
        return;
      }

      // Start outgoing transition
      timers.current.push(
        setTimeout(() => {
          if (pendingPathRef.current) router.push(pendingPathRef.current);
        }, OUT_DURATION),

        // Failsafe
        setTimeout(() => {
          setIsTransitioning(false);
          setShowContent(true);
          setIncoming(false);
          pendingPathRef.current = null;
        }, 5000),
      );
    },
    [isTransitioning, pathname, router, reducedMotion],
  );

  // Handle incoming animation when route changes
  useEffect(() => {
    if (!pendingPathRef.current) return;

    if (pathname === pendingPathRef.current) {
      setIncoming(true);
      setShowContent(false);

      timers.current.push(
        setTimeout(() => setShowContent(true), 40),
        setTimeout(() => {
          setIsTransitioning(false);
          setIncoming(false);
          pendingPathRef.current = null;
          clearTimers();
        }, IN_DURATION + 60),
      );
    }
  }, [pathname]);

  useEffect(() => clearTimers, []);

  return (
    <TransitionContext.Provider value={{ navigate, isTransitioning }}>
      <div className="relative min-h-screen overflow-hidden bg-black">
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{
              opacity: 0,
              scale: 0.96,
              filter: "blur(6px) brightness(0.6)",
              y: 8,
            }}
            animate={{
              opacity: showContent ? 1 : 0,
              scale: incoming ? 1 : isTransitioning ? 1.02 : 1,
              y: incoming ? 0 : isTransitioning ? 4 : 0,
              filter: isTransitioning
                ? "blur(4px) brightness(0.68) contrast(0.92)"
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
      </div>
    </TransitionContext.Provider>
  );
}
