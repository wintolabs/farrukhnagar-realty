// src/components/forms/login-form.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Eye, EyeOff, Loader2, Lock, User } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username.trim()) {
      setError("Username is required");
      return;
    }

    if (!password.trim()) {
      setError("Password is required");
      return;
    }

    startTransition(async () => {
      try {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });

        const data = await res.json();

        if (res.ok && data.success) {
          toast.success("Login successful");
          router.push("/admin");
        } else {
          setError(data.error || "Invalid credentials");
        }
      } catch (error) {
        console.error("Login error:", error);
        setError("Network error - please try again");
      }
    });
  };

  return (
    <div className="w-full flex flex-col items-center gap-6 md:gap-8 px-3 sm:px-6 min-h-screen justify-center">
      {/* Logo Section */}
      <div className="text-center flex flex-col items-center gap-4">
        <Image
          src="/logo-4.png"
          alt="Farrukhnagar Realty Logo"
          width={160}
          height={128}
          className="rounded-xl object-contain"
          priority
          sizes="(max-width: 640px) 120px, (max-width: 1024px) 140px, 160px"
        />
        <div>
          <div className="w-12 h-1 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full mx-auto mb-4"></div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Administrative Portal
          </p>
        </div>
      </div>

      <Card
        className="
          w-full
          max-w-lg
          sm:max-w-xl
          md:max-w-2xl
          lg:max-w-3xl
          mx-auto
          backdrop-blur-md bg-white dark:bg-slate-900/60
          border border-white/40 dark:border-slate-700/60
          shadow-xl shadow-black/10 dark:shadow-black/40
          animate-in fade-in-50 slide-in-from-bottom-4 duration-700
        "
      >
        <CardHeader className="text-center pb-3 pt-0 px-4 sm:px-6 md:px-10">
          <CardTitle className="text-2xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent mb-2">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
            Please sign in to access your admin dashboard
          </CardDescription>
        </CardHeader>

        <CardContent className="px-6 sm:px-8 lg:px-12 xl:px-16 pb-2 sm:pb-4 pt-2">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="space-y-5 sm:space-y-6"
          >
            {/* Username Field */}
            <div className="space-y-4">
              <Label
                htmlFor="username"
                className="text-base font-semibold text-slate-700 dark:text-slate-300 tracking-wide"
              >
                Username
              </Label>
              <div className="relative group">
                <Input
                  id="username"
                  type="text"
                  autoComplete="username"
                  placeholder="Enter your username"
                  value={username}
                  disabled={isPending}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className={`h-14 pl-12 pr-4 text-lg border-2 transition-all duration-300
                    bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm
                    ${
                      error
                        ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/20"
                        : "border-slate-200/60 dark:border-slate-700/60 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20"
                    }
                    rounded-xl placeholder:text-slate-400 dark:placeholder:text-slate-500
                    hover:border-slate-300 dark:hover:border-slate-600
                    focus:bg-white dark:focus:bg-slate-800`}
                />
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-slate-400 group-focus-within:text-slate-600 dark:group-focus-within:text-slate-300 transition-colors" />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-4">
              <Label
                htmlFor="password"
                className="text-base font-semibold text-slate-700 dark:text-slate-300 tracking-wide"
              >
                Password
              </Label>
              <div className="relative group">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  disabled={isPending}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={`h-14 pl-12 pr-4 text-lg border-2 transition-all duration-300
                    bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm
                    ${
                      error
                        ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/20"
                        : "border-slate-200/60 dark:border-slate-700/60 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20"
                    }
                    rounded-xl placeholder:text-slate-400 dark:placeholder:text-slate-500
                    hover:border-slate-300 dark:hover:border-slate-600
                    focus:bg-white dark:focus:bg-slate-800`}
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-slate-400 group-focus-within:text-slate-600 dark:group-focus-within:text-slate-300 transition-colors" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isPending}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-6 w-6" />
                  ) : (
                    <Eye className="h-6 w-6" />
                  )}
                </button>
              </div>

              {error && (
                <div className="flex items-center gap-2 mt-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                  <p className="text-sm font-medium text-red-700 dark:text-red-400">
                    {error}
                  </p>
                </div>
              )}
            </div>

            <Button
              type="submit"
              className="w-full h-14 bg-gradient-to-r from-indigo-600 to-blue-600
                hover:from-indigo-700 hover:to-blue-700
                text-white font-semibold text-lg rounded-xl
                transition-all duration-300
                disabled:opacity-50 disabled:cursor-not-allowed
                shadow-lg hover:shadow-xl hover:shadow-indigo-500/25
                transform hover:-translate-y-0.5 active:translate-y-0
                focus:ring-4 focus:ring-indigo-500/30"
              disabled={isPending || !username.trim() || !password.trim()}
            >
              {isPending ? (
                <div className="flex items-center gap-3">
                  <Loader2 className="h-6 w-6 animate-spin" />
                  <span>Signing you in...</span>
                </div>
              ) : (
                <div className="flex items-center gap-3 justify-center">
                  <span>Sign In</span>
                  <ArrowRight className="h-5 w-5" />
                </div>
              )}
            </Button>
          </form>

          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
            <p className="text-center text-sm text-slate-500 dark:text-slate-400">
              Secure admin access •{" "}
              <span className="font-medium text-slate-600 dark:text-slate-300">
                {new Date().getFullYear()} Farrukhnagar Realty
              </span>
            </p>

            {/* Public site link (Next.js Link) */}
            <div className="mt-3 text-center">
              <Link
                href="/"
                className="text-sm text-slate-600 hover:text-slate-900 hover:underline underline-offset-4 transition-colors"
                aria-label="Go to public website home"
              >
                ← Back to Public Site
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
