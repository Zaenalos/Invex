"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
    <div className="bg-background flex min-h-screen items-center justify-center px-4">
      <div className="absolute inset-0 -z-10 [background:radial-gradient(circle_at_50%_20%,hsl(var(--primary)_/_0.12),transparent_65%)]" />
      <div className="w-full max-w-md">
        <Card className="supports-[backdrop-filter]:bg-background/80 backdrop-blur">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">Login</CardTitle>
            <CardDescription>Access and manage your inventory</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={handleLogin} className="space-y-5" noValidate>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  autoComplete="username"
                  required
                  disabled={isLoading}
                  placeholder="Enter username"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  disabled={isLoading}
                  placeholder="Enter password"
                />
              </div>
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={remember}
                  onChange={() => setRemember((r) => !r)}
                  aria-label="Remember me for 30 days"
                  disabled={isLoading}
                />
                <span className="text-muted-foreground text-sm">Remember me (30 days)</span>
              </div>
              <Button type="submit" className="w-full" isLoading={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleDemoLogin}
                disabled={isLoading}
                className="w-full"
              >
                Demo Login (Skip Auth)
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={handleBackHome}
                disabled={isLoading || isTransitioning}
                className="text-muted-foreground w-full"
              >
                Back to Home
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
