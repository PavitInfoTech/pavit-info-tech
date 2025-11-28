"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { isEmailValid } from "@/lib/auth-utils";
import { apiForgotPassword, ApiError } from "@/lib/auth-client";
import { AlertCircle, ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Please enter your email address");
      return;
    }

    if (!isEmailValid(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    try {
      await apiForgotPassword(email);
      setSubmitted(true);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(
          err.payload.message || "Failed to process request. Please try again."
        );
      } else {
        setError("Failed to process request. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className='min-h-screen flex items-center justify-center px-4 py-20'>
        <div className='w-full max-w-md'>
          <Card className='p-8 space-y-6'>
            {!submitted ? (
              <>
                <div>
                  <h1 className='text-2xl font-bold font-serif mb-2'>
                    Reset Password
                  </h1>
                  <p className='text-muted-foreground'>
                    Enter your email to receive a password reset link
                  </p>
                </div>

                {error && (
                  <div className='p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex gap-3'>
                    <AlertCircle className='w-5 h-5 text-red-500 shrink-0 mt-0.5' />
                    <p className='text-sm text-red-600'>{error}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className='space-y-4'>
                  <div className='space-y-2'>
                    <label className='text-sm font-medium'>Email</label>
                    <Input
                      type='email'
                      placeholder='you@example.com'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>

                  <Button type='submit' className='w-full' disabled={isLoading}>
                    {isLoading ? "Sending..." : "Send Reset Link"}
                  </Button>
                </form>

                <Link
                  href='/auth/signin'
                  className='flex items-center gap-2 text-sm text-primary hover:underline'
                >
                  <ArrowLeft className='w-4 h-4' />
                  Back to Sign In
                </Link>
              </>
            ) : (
              <div className='text-center space-y-4'>
                <div className='text-5xl mb-4'>✉️</div>
                <h2 className='text-xl font-bold font-serif'>
                  Check Your Email
                </h2>
                <p className='text-muted-foreground'>
                  We’ve sent a password reset link to {email}. Click the link in
                  the email to reset your password.
                </p>
                <p className='text-sm text-muted-foreground'>
                  Didn’t receive the email? Check your spam folder or{" "}
                  <button
                    onClick={() => setSubmitted(false)}
                    className='text-primary hover:underline'
                  >
                    try again
                  </button>
                </p>
                <Link href='/auth/signin'>
                  <Button variant='outline' className='w-full bg-transparent'>
                    Back to Sign In
                  </Button>
                </Link>
              </div>
            )}
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
