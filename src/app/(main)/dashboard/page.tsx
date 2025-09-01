"use client";

import React from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Box,
  Clock,
  DollarSign,
  Package,
  ShoppingCart,
} from "lucide-react";

interface StatCard {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: React.ComponentType<{ className?: string }>;
}

const stats: StatCard[] = [
  { title: "Total Products", value: "1,234", change: "+12%", trend: "up", icon: Package },
  { title: "Low Stock Items", value: "23", change: "-5%", trend: "down", icon: AlertTriangle },
  { title: "Total Orders", value: "856", change: "+8%", trend: "up", icon: ShoppingCart },
  { title: "Revenue", value: "$45,280", change: "+15%", trend: "up", icon: DollarSign },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground text-sm">
          Welcome back! Here&apos;s what&apos;s happening with your inventory.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => {
          const TrendIcon = s.trend === "up" ? ArrowUpRight : ArrowDownRight;
          return (
            <Card key={s.title} className="overflow-hidden">
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div className="space-y-1">
                  <CardTitle className="text-sm font-medium">{s.title}</CardTitle>
                  <CardDescription className="sr-only">{s.title} metric</CardDescription>
                </div>
                <s.icon className="text-muted-foreground h-5 w-5" />
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-bold tabular-nums">{s.value}</span>
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium",
                      s.trend === "up"
                        ? "bg-emerald-500/15 text-emerald-500"
                        : "bg-red-500/15 text-red-500",
                    )}
                  >
                    <TrendIcon className="h-3.5 w-3.5" /> {s.change}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Orders */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Recent Orders</CardTitle>
            <CardDescription>Latest processed orders</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[1012, 1011, 1010, 1009].map((id, idx) => (
              <div key={id} className="flex items-center justify-between py-1.5">
                <div className="space-y-1">
                  <p className="text-sm leading-none font-medium">Order #{id}</p>
                  <p className="text-muted-foreground flex items-center gap-1 text-xs">
                    <Clock className="h-3.5 w-3.5" /> {2 + idx} minutes ago
                  </p>
                </div>
                <Badge variant="success">Completed</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Low Stock Alerts */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Low Stock Alerts</CardTitle>
            <CardDescription>Items nearing depletion</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between py-1.5">
                <div className="space-y-1">
                  <p className="text-sm leading-none font-medium">Product {i}</p>
                  <p className="text-muted-foreground text-xs">{5 - i} units remaining</p>
                </div>
                <Badge variant="destructive" className="bg-destructive/15 text-destructive">
                  Low Stock
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Inventory Snapshot */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Inventory Snapshot</CardTitle>
          <CardDescription>Quick overview of category distribution</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {["Electronics", "Parts", "Accessories", "Misc"].map((cat) => (
              <div
                key={cat}
                className="bg-card/50 flex items-center gap-3 rounded-md border px-3 py-2 text-sm"
              >
                <Box className="text-muted-foreground h-4 w-4" />
                <span className="font-medium">{cat}</span>
                <span className="text-muted-foreground ml-auto text-xs">
                  {Math.floor(Math.random() * 100)} items
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
