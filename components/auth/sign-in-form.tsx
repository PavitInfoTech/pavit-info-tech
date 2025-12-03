"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { isEmailValid } from "@/lib/auth-utils";
import {
  apiLogin,
  ApiError,
  getGoogleOAuthUrl,
  getGitHubOAuthUrl,
} from "@/lib/auth-client";
import { AlertCircle, Eye, EyeOff, Loader } from "lucide-react";
import { sha256Hex } from "@/lib/crypto-utils";
// import { FaGogle,  } from "react-icons"
import {Logo} from "../layout/logo";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get redirect URL from search params (for checkout flow)
  const redirectUrl = searchParams.get("redirect");

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
      const passwordHash = await sha256Hex(password);
      await apiLogin(email, passwordHash);
      // Redirect to the specified URL or dashboard
      router.push(redirectUrl || "/dashboard");
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
          <Logo width={200} height={100} />
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
          <Button
            variant='outline'
            disabled={isLoading}
            onClick={() => {
              window.location.href = getGoogleOAuthUrl(
                redirectUrl || undefined
              );
            }}
          >
            <FcGoogle className='w-5 h-5 mr-2' />
            Google
          </Button>
          <Button
            variant='outline'
            disabled={isLoading}
            onClick={() => {
              window.location.href = getGitHubOAuthUrl(
                redirectUrl || undefined
              );
            }}
          >
            <FaGithub className='w-5 h-5 mr-2' /> 
            GitHub
          </Button>
        </div>
      </div>

      <p className='text-center text-sm text-muted-foreground'>
        Don't have an account?{" "}
        <Link
          href={
            redirectUrl
              ? `/auth/signup?redirect=${encodeURIComponent(redirectUrl)}`
              : "/auth/signup"
          }
          className='text-primary hover:underline font-semibold'
        >
          Sign up
        </Link>
      </p>
    </Card>
  );
}
