import React from "react";

interface TableProps {
  children: React.ReactNode;
  className?: string;
}

export function Table({ children, className = "" }: TableProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-800">
      <table className={`min-w-full divide-y divide-gray-800 ${className}`}>{children}</table>
    </div>
  );
}

export function TableHeader({ children }: { children: React.ReactNode }) {
  return <thead className="bg-gray-900/50">{children}</thead>;
}

export function TableBody({ children }: { children: React.ReactNode }) {
  return <tbody className="divide-y divide-gray-800 bg-gray-900/25">{children}</tbody>;
}

export function TableRow({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <tr className={`transition-colors hover:bg-gray-800/30 ${className}`}>{children}</tr>;
}

export function TableHead({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <th
      className={`px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-300 uppercase ${className}`}
    >
      {children}
    </th>
  );
}

export function TableCell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <td className={`px-6 py-4 text-sm whitespace-nowrap text-gray-200 ${className}`}>{children}</td>
  );
}
