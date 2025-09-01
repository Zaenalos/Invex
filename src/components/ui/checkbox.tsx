"use client";

import { cn } from "@/lib/utils";
import * as React from "react";

type CheckboxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">;

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, checked, ...props }, ref) => {
    return (
      <label className={cn("inline-flex cursor-pointer items-center gap-2 select-none", className)}>
        <span
          className={cn(
            "flex h-5 w-5 items-center justify-center rounded-md border transition-colors",
            checked
              ? "bg-primary/10 border-primary text-primary"
              : "border-border bg-background text-transparent",
            props.disabled && "cursor-not-allowed opacity-50",
          )}
        >
          <svg
            viewBox="0 0 20 20"
            fill="none"
            strokeWidth={2.4}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn(
              "h-3.5 w-3.5 origin-center stroke-current transition-all",
              checked ? "scale-100 opacity-100" : "scale-75 opacity-0",
            )}
          >
            <path d="M4 11.2 7.2 14.4 16 5.6" />
          </svg>
        </span>
        <input ref={ref} type="checkbox" className="sr-only" checked={checked} {...props} />
        {props["aria-label"] && <span className="sr-only">{props["aria-label"]}</span>}
      </label>
    );
  },
);
Checkbox.displayName = "Checkbox";
