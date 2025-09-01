import { cn } from "@/lib/utils";
import React from "react";
import Sidebar from "../../../components/Layout/Sidebar";

interface Props {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  return (
    <div className="bg-background text-foreground flex h-svh w-full">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <HeaderBar />
        <main className="flex-1 overflow-auto">
          <div className="mx-auto w-full max-w-screen-2xl space-y-6 p-6 md:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}

function HeaderBar() {
  return (
    <header
      className={cn(
        "bg-background/80 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-30 flex h-14 items-center gap-4 border-b px-4 backdrop-blur",
      )}
    >
      <div className="flex flex-1 items-center justify-end gap-2">
        {/* Placeholder for future actions: search, filters, user menu */}
      </div>
    </header>
  );
}
