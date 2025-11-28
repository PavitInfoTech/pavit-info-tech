"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { isEmailValid } from "@/lib/auth-utils";
import { apiLogin, ApiError } from "@/lib/auth-client";
import { AlertCircle, Eye, EyeOff, Loader } from "lucide-react";

export function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (!isEmailValid(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    try {
      await apiLogin(email, password);
      router.push("/dashboard");
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.payload.code === 422 && err.payload.errors) {
          const messages = Object.values(err.payload.errors).flat();
          setError(messages[0] ?? err.payload.message);
        } else if (err.payload.code === 401) {
          setError("Invalid email or password");
        } else {
          setError(err.payload.message || "Sign in failed. Please try again.");
        }
      } else {
        setError("Sign in failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className='p-8 space-y-6'>
      <div>
        <h1 className='text-2xl font-bold font-serif mb-2'>Welcome Back</h1>
        <p className='text-muted-foreground'>
          Sign in to your PavitInfoTech account
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

        <div className='space-y-2'>
          <label className='text-sm font-medium'>Password</label>
          <div className='relative'>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder='Enter your password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className='pr-10'
            />
            <button
              type='button'
              onClick={() => setShowPassword(!showPassword)}
              className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground'
              disabled={isLoading}
            >
              {showPassword ? (
                <EyeOff className='w-4 h-4' />
              ) : (
                <Eye className='w-4 h-4' />
              )}
            </button>
          </div>
        </div>

        <Button type='submit' className='w-full' disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader className='w-4 h-4 mr-2 animate-spin' />
              Signing in...
            </>
          ) : (
            "Sign In"
          )}
        </Button>
      </form>

      <div className='space-y-3'>
        <Link
          href='/auth/forgot-password'
          className='block text-sm text-primary hover:underline'
        >
          Forgot your password?
        </Link>

        <div className='relative'>
          <div className='absolute inset-0 flex items-center'>
            <div className='w-full border-t border-border' />
          </div>
          <div className='relative flex justify-center text-sm'>
            <span className='px-2 bg-card text-muted-foreground'>
              Or continue with
            </span>
          </div>
        </div>

        <div className='grid grid-cols-2 gap-4'>
          <Button variant='outline' disabled={isLoading}>
            <svg
              className='w-4 h-4 mr-2'
              viewBox='0 0 24 24'
              fill='currentColor'
            >
              <path d='M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032 c0-3.331,2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.461,2.268,15.365,1.484,12.945,1.484 c-6.627,0-12,5.373-12,12c0,6.627,5.373,12,12,12s12-5.373,12-12c0-0.891-0.109-1.751-0.294-2.584H12.545z' />
            </svg>
            Google
          </Button>
          <Button variant='outline' disabled={isLoading}>
            <svg
              className='w-4 h-4 mr-2'
              viewBox='0 0 24 24'
              fill='currentColor'
            >
              <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
            </svg>
            GitHub
          </Button>
        </div>
      </div>

      <p className='text-center text-sm text-muted-foreground'>
        Don't have an account?{" "}
        <Link
          href='/auth/signup'
          className='text-primary hover:underline font-semibold'
        >
          Sign up
        </Link>
      </p>
    </Card>
  );
}
