"use client";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  Boxes,
  ChevronsLeft,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Plug,
  ShoppingCart,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Inventory", href: "/inventory", icon: Boxes },
  { label: "Orders", href: "/orders", icon: ShoppingCart },
  { label: "Reports", href: "/reports", icon: BarChart3 },
  { label: "Integrations", href: "/integrations", icon: Plug },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    try {
      const stored = window.localStorage.getItem("_invex_sidebar_collapsed");
      return stored === "1";
    } catch {
      return false;
    }
  });
  const toggle = useCallback(() => setCollapsed((c) => !c), []);

  // Persist state
  useEffect(() => {
    try {
      window.localStorage.setItem("_invex_sidebar_collapsed", collapsed ? "1" : "0");
    } catch {}
  }, [collapsed]);

  // Keyboard shortcut: Ctrl/Cmd + B to toggle
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "b") {
        e.preventDefault();
        toggle();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [toggle]);

  return (
    <aside
      className={cn(
        "bg-background/80 supports-[backdrop-filter]:bg-background/60 relative flex h-screen flex-col overflow-x-hidden border-r backdrop-blur transition-all duration-300",
        collapsed ? "w-16" : "w-60",
      )}
      role="navigation"
      aria-label="Primary"
    >
      <TooltipProvider delayDuration={200}>
        {/* Header / Brand */}
        <div
          className={cn(
            "flex h-14 items-center gap-2 border-b px-3",
            collapsed && "justify-center",
          )}
        >
          <div
            className={cn(
              "from-primary via-primary/80 to-primary/60 bg-gradient-to-r bg-clip-text text-lg font-bold tracking-tight text-transparent transition-opacity",
              collapsed && "pointer-events-none absolute opacity-0",
            )}
          >
            Invex
          </div>
          <Button
            variant="ghost"
            size="icon"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-expanded={!collapsed}
            onClick={toggle}
            className={cn("ml-auto", collapsed && "ml-0")}
          >
            <ChevronsLeft
              className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")}
            />
          </Button>
        </div>
        {/* Removed top separator; border-b on brand matches header line */}

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-x-hidden overflow-y-auto px-2 py-2">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || (href !== "/" && pathname.startsWith(href + "/"));
            const itemNode = (
              <Link
                key={href}
                href={href}
                className={cn(
                  "focus-visible:ring-ring group flex h-10 items-center gap-3 rounded-md px-2 text-sm font-medium transition-colors outline-none focus-visible:ring-2",
                  collapsed && "justify-center gap-0 px-0",
                  active
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                )}
                aria-current={active ? "page" : undefined}
                tabIndex={0}
              >
                <Icon
                  className={cn(
                    "h-4 w-4 flex-shrink-0 transition-colors",
                    active
                      ? "text-foreground"
                      : "text-muted-foreground group-hover:text-foreground",
                  )}
                />
                <span
                  className={cn(
                    "whitespace-nowrap transition-all",
                    collapsed && "w-0 overflow-hidden opacity-0",
                  )}
                >
                  {label}
                </span>
              </Link>
            );
            return collapsed ? (
              <Tooltip key={href}>
                <TooltipTrigger asChild>{itemNode}</TooltipTrigger>
                <TooltipContent side="right">{label}</TooltipContent>
              </Tooltip>
            ) : (
              itemNode
            );
          })}
        </nav>

        {/* Footer sections */}
        <div className="space-y-4 overflow-x-hidden px-2 pb-4">
          <div className="space-y-1">
            <SidebarButton
              icon={User}
              label="Manage Account"
              collapsed={collapsed}
              onClick={() => {}}
            />
            <SidebarButton
              icon={LogOut}
              label="Sign Out"
              collapsed={collapsed}
              onClick={() => {}}
              className="text-destructive hover:text-destructive focus-visible:ring-destructive [&>*:first-child]:text-destructive"
            />
          </div>
          <SeparatorLite />
          <SidebarButton
            icon={HelpCircle}
            label="Help & Docs"
            collapsed={collapsed}
            onClick={() => {}}
          />
        </div>
      </TooltipProvider>
    </aside>
  );
}

// Lightweight separator styled with tokens
function SeparatorLite() {
  return (
    <div className="relative mx-2 my-2">
      <div className="bg-border h-px w-full" />
    </div>
  );
}

interface SidebarButtonProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onClick?: () => void;
  collapsed: boolean;
  className?: string;
}

function SidebarButton({ icon: Icon, label, onClick, collapsed, className }: SidebarButtonProps) {
  const button = (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "text-muted-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring flex h-10 w-full items-center gap-3 rounded-md px-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none",
        collapsed && "justify-center gap-0 px-0",
        className,
      )}
    >
      <Icon className="h-4 w-4 flex-shrink-0" />
      <span
        className={cn(
          "whitespace-nowrap transition-all",
          collapsed && "w-0 overflow-hidden opacity-0",
        )}
      >
        {label}
      </span>
    </button>
  );
  return collapsed ? (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent side="right">{label}</TooltipContent>
    </Tooltip>
  ) : (
    button
  );
}
