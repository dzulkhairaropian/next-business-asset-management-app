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

// ─── Types ───────────────────────────────────────────────────────────────────
type ForgotError = "network_error" | "unknown";
type ForgotState = "idle" | "success" | ForgotError;

const ERROR_MESSAGES: Record<ForgotError, string> = {
  network_error: "Could not connect to the server. Check your connection.",
  unknown: "An unexpected error occurred. Please try again later.",
};

// ─── Component ───────────────────────────────────────────────────────────────
export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [state, setState] = React.useState<ForgotState>("idle");

  const isError = state !== "idle" && state !== "success";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("idle");
    setLoading(true);
    try {
      // TODO: Call backend reset-password endpoint, e.g.:
      // await fetch("/api/auth/forgot-password", {
      //   method: "POST",
      //   body: JSON.stringify({ email }),
      // });
      setState("success");
    } catch (err) {
      const isNetworkError =
        err instanceof TypeError && err.message === "Failed to fetch";
      setState(isNetworkError ? "network_error" : "unknown");
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
                <h1 className="text-lg font-semibold">Reset Your Password</h1>
                <p className="text-sm text-muted-foreground">
                  Enter your email and we&apos;ll send you a reset link
                </p>
              </div>

              {/* ── Success Alert ── */}
              {state === "success" && (
                <div
                  role="status"
                  className="rounded-md border border-green-500/50 bg-green-500/10 px-4 py-3 text-sm text-green-700 dark:text-green-400"
                >
                  Reset link sent. Check your inbox — including spam.
                </div>
              )}

              {/* ── Error Alert ── */}
              {isError && (
                <div
                  role="alert"
                  className="rounded-md border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive"
                >
                  {ERROR_MESSAGES[state as ForgotError]}
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
                    if (isError) setState("idle");
                  }}
                  autoComplete="email"
                  required
                />
              </Field>

              {/* ── Submit ── */}
              <Field>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading || state === "success"}
                >
                  {loading ? "Sending…" : "Send Reset Link"}
                </Button>
              </Field>

              {/* ── Footer ── */}
              <FieldDescription className="text-center">
                Remember your password?{" "}
                <Link
                  href="/auth/login"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Sign in
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
