"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

interface SidebarItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}

const navigation: SidebarItem[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
        />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5v4l2-2 2 2V5" />
      </svg>
    ),
  },
  {
    name: "Inventory",
    href: "/inventory",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
        />
      </svg>
    ),
  },
  {
    name: "Orders",
    href: "/orders",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        />
      </svg>
    ),
  },
  {
    name: "Reports",
    href: "/reports",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
  },
  {
    name: "Integrations",
    href: "/integrations",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={`group/sidebar flex h-full flex-col overflow-x-hidden border-r border-white/10 bg-gradient-to-b from-gray-900/95 via-gray-900/90 to-gray-950/95 backdrop-blur-xl transition-all duration-300 ${collapsed ? "w-20" : "w-64"}`}
    >
      <div
        className={`flex h-16 items-center pt-6 transition-all duration-300 ${collapsed ? "justify-center px-3" : "justify-between px-5"}`}
      >
        <h1
          className={`bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 bg-clip-text text-2xl font-bold tracking-tight text-transparent drop-shadow transition-all duration-300 ${collapsed ? "w-0 overflow-hidden opacity-0" : "opacity-100"}`}
        >
          Invex
        </h1>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`flex items-center justify-center rounded-md border border-white/10 bg-white/5 text-gray-400 transition-all duration-300 hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:text-cyan-300 focus:ring-2 focus:ring-cyan-500/60 focus:outline-none ${collapsed ? "h-9 w-9" : "h-8 w-8"}`}
        >
          <svg
            className={`h-4 w-4 transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      </div>

      <div className={`relative my-6 transition-all duration-300 ${collapsed ? "px-3" : "px-5"}`}>
        <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-700/60 to-transparent"></div>
        <div className="absolute inset-0 h-px bg-gradient-to-r from-cyan-500/0 via-cyan-400/40 to-cyan-500/0 blur-sm"></div>
      </div>

      <nav className="flex-1 space-y-1 overflow-x-hidden overflow-y-auto px-3 pb-6">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group relative flex items-center rounded-md px-2 py-2 text-sm font-medium transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/60 ${
                isActive
                  ? "bg-gradient-to-r from-cyan-500/25 via-cyan-500/10 to-transparent text-cyan-300"
                  : "text-gray-300 hover:bg-white/5 hover:text-white"
              }`}
              title={collapsed ? item.name : undefined}
            >
              {isActive && (
                <span className="absolute top-1/2 left-0 h-8 w-1 -translate-y-1/2 rounded-r bg-gradient-to-b from-cyan-400 via-sky-400 to-blue-500 shadow-[0_0_8px_-1px_rgba(34,211,238,0.8)]"></span>
              )}
              <span
                className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md border border-white/5 bg-white/5 text-gray-400 shadow-inner transition-colors ${
                  isActive
                    ? "border-cyan-400/40 bg-cyan-500/15 text-cyan-300"
                    : "group-hover:border-white/10 group-hover:text-white"
                }`}
              >
                {item.icon}
              </span>
              <span
                className={`whitespace-nowrap transition-all duration-300 ${collapsed ? "w-0 overflow-hidden opacity-0" : "ml-3 opacity-100"}`}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-4 px-3 py-4 transition-all duration-300">
        {/* Account Section */}
        <div className="border-t border-white/5 pt-4">
          <div
            className={`mb-3 transition-all duration-300 ${collapsed ? "opacity-0" : "opacity-100"}`}
          >
            <span className="text-xs font-medium tracking-wider text-gray-500 uppercase">
              Account
            </span>
          </div>
          <div className="space-y-1">
            <button
              className="group relative flex w-full items-center rounded-md px-2 py-2 text-sm font-medium text-gray-300 transition-all duration-300 outline-none hover:bg-white/5 hover:text-white focus-visible:ring-2 focus-visible:ring-cyan-500/60"
              title={collapsed ? "Manage Account" : undefined}
            >
              <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md border border-white/5 bg-white/5 text-gray-400 shadow-inner transition-colors group-hover:border-white/10 group-hover:text-white">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </span>
              <span
                className={`whitespace-nowrap transition-all duration-300 ${collapsed ? "w-0 overflow-hidden opacity-0" : "ml-3 opacity-100"}`}
              >
                Manage Account
              </span>
            </button>

            <button
              className="group relative flex w-full items-center rounded-md px-2 py-2 text-sm font-medium text-gray-300 transition-all duration-300 outline-none hover:bg-red-500/10 hover:text-red-300 focus-visible:ring-2 focus-visible:ring-red-500/60"
              title={collapsed ? "Sign Out" : undefined}
            >
              <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md border border-white/5 bg-white/5 text-gray-400 shadow-inner transition-colors group-hover:border-red-400/40 group-hover:bg-red-500/15 group-hover:text-red-300">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </span>
              <span
                className={`whitespace-nowrap transition-all duration-300 ${collapsed ? "w-0 overflow-hidden opacity-0" : "ml-3 opacity-100"}`}
              >
                Sign Out
              </span>
            </button>
          </div>
        </div>

        {/* Help Section */}
        <div className="border-t border-white/5 pt-4">
          <button
            className={`group relative flex h-[3.25rem] w-full items-center rounded-md border border-white/10 bg-white/5 px-2 text-sm font-medium text-gray-300 transition-all duration-300 outline-none hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:text-cyan-300 focus-visible:ring-2 focus-visible:ring-cyan-500/60`}
            title={collapsed ? "Need help?" : undefined}
          >
            <span
              className={`flex h-9 w-9 flex-shrink-0 items-center justify-center transition-colors ${
                collapsed
                  ? "rounded-md border border-white/5 bg-white/5 text-gray-400 shadow-inner group-hover:border-cyan-400/40 group-hover:bg-cyan-500/15 group-hover:text-cyan-300"
                  : "text-gray-400"
              }`}
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
            <div
              className={`flex min-h-[2.5rem] flex-col justify-center text-left transition-all duration-300 ${collapsed ? "w-0 overflow-hidden opacity-0" : "ml-3 opacity-100"}`}
            >
              <span className="text-sm font-medium">Need help?</span>
              <span className="text-xs text-gray-400">Read the documentation</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
