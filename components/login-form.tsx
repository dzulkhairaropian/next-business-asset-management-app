"use client"

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth-context";

// ─── Types ──────────────────────────────────────────────────────────────────
// TODO: Extend when the backend is ready — add `role`, `token`, etc.
type LoginError = "invalid_credentials" | "network_error" | "unknown";

const ERROR_MESSAGES: Record<LoginError, string> = {
  invalid_credentials: "Invalid email or password. Please try again.",
  network_error: "Could not connect to the server. Check your connection.",
  unknown: "An unexpected error occurred. Please try again later.",
};

// ─── Component ───────────────────────────────────────────────────────────────
export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { login } = useAuth();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<LoginError | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      // TODO: Pass `password` once auth-context.login(email, password) is ready.
      const success = await login(email);
      if (!success) {
        setError("invalid_credentials");
      }
    } catch (err) {
      const isNetworkError =
        err instanceof TypeError && err.message === "Failed to fetch";
      setError(isNetworkError ? "network_error" : "unknown");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <FieldGroup>
              {/* ── Header ── */}
              <div className="flex flex-col items-center gap-2 text-center">
                {/* TODO: Replace with the actual app logo. */}
                <div className="text-2xl font-bold tracking-tight">
                  {/* TODO: Replace "Asset Manager" with the app name. */}
                  Asset Manager
                </div>
                <h1 className="text-lg font-semibold">Welcome Back</h1>
                <p className="text-sm text-muted-foreground">
                  Sign in to your account to continue
                </p>
              </div>

              {/* ── Error Alert ── */}
              {error && (
                <div
                  role="alert"
                  className="rounded-md border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive"
                >
                  {ERROR_MESSAGES[error]}
                </div>
              )}

              {/* ── Email ── */}
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError(null);
                  }}
                  autoComplete="email"
                  required
                />
              </Field>

              {/* ── Password ── */}
              <Field>
                <div className="flex items-center justify-between">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Link
                    href="/auth/forgot-password"
                    className="text-sm text-muted-foreground underline-offset-2 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError(null);
                  }}
                  autoComplete="current-password"
                  required
                />
              </Field>

              {/* ── Submit ── */}
              <Field>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Signing In…" : "Sign In"}
                </Button>
              </Field>

              {/* ── Footer ── */}
              <FieldDescription className="text-center">
                Don&apos;t have an account?{" "}
                <Link
                  href="/auth/register"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Sign up
                </Link>
              </FieldDescription>
            </FieldGroup>
          </form>

          {/* ── Decorative side panel ── */}
          <div className="relative hidden bg-muted md:block">
            {/* TODO: Replace with a relevant illustration or image for the app. */}
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
