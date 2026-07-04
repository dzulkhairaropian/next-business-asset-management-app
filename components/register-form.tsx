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

// ─── Types ───────────────────────────────────────────────────────────────────
// TODO: Extend when the backend is ready — add `role`, `token`, etc.
type RegisterError = "email_taken" | "network_error" | "passwords_mismatch" | "unknown";

const ERROR_MESSAGES: Record<RegisterError, string> = {
  email_taken: "An account with this email already exists.",
  passwords_mismatch: "Passwords do not match. Please try again.",
  network_error: "Could not connect to the server. Check your connection.",
  unknown: "An unexpected error occurred. Please try again later.",
};

// ─── Component ───────────────────────────────────────────────────────────────
export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { register } = useAuth();
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<RegisterError | null>(null);

  const clearError = () => { if (error) setError(null); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password !== confirmPassword) {
      setError("passwords_mismatch");
      return;
    }
    setLoading(true);
    try {
      // TODO: Pass `password` once auth-context.register(name, email, password) is ready.
      const success = await register(`${firstName} ${lastName}`, email);
      if (!success) {
        setError("email_taken");
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
                <h1 className="text-lg font-semibold">Create an Account</h1>
                <p className="text-sm text-muted-foreground">
                  Fill in the details below to get started
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

              {/* ── Name ── */}
              <div className="grid grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="first-name">First Name</FieldLabel>
                  <Input
                    id="first-name"
                    type="text"
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => { setFirstName(e.target.value); clearError(); }}
                    autoComplete="given-name"
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="last-name">Last Name</FieldLabel>
                  <Input
                    id="last-name"
                    type="text"
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => { setLastName(e.target.value); clearError(); }}
                    autoComplete="family-name"
                    required
                  />
                </Field>
              </div>

              {/* ── Email ── */}
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); clearError(); }}
                  autoComplete="email"
                  required
                />
              </Field>

              {/* ── Passwords ── */}
              <div className="grid grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); clearError(); }}
                    autoComplete="new-password"
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => { setConfirmPassword(e.target.value); clearError(); }}
                    autoComplete="new-password"
                    required
                  />
                </Field>
              </div>

              {/* ── Submit ── */}
              <Field>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Creating Account…" : "Create Account"}
                </Button>
              </Field>

              {/* ── Footer ── */}
              <FieldDescription className="text-center">
                Already have an account?{" "}
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
