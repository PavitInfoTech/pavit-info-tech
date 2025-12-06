"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { PasswordStrengthIndicator } from "./password-strength-indicator";
import {
  calculatePasswordStrength,
  isEmailValid,
  isPasswordValid,
} from "@/lib/auth-utils";
import {
  apiRegister,
  ApiError,
  getGoogleOAuthUrl,
  getGitHubOAuthUrl,
} from "@/lib/auth-client";
import { AlertCircle, Eye, EyeOff, Loader, Check } from "lucide-react";
import { sha256Hex } from "@/lib/crypto-utils";
import { Logo } from "../layout/logo";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export function SignUpForm() {
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get redirect URL from search params (for checkout flow)
  const redirectUrl = searchParams.get("redirect");

  const passwordStrength = calculatePasswordStrength(formData.password);
  const passwordsMatch =
    formData.password === formData.confirmPassword && formData.password !== "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (
      !formData.username ||
      !formData.firstName ||
      !formData.email ||
      !formData.password
    ) {
      setError("Please fill in all fields");
      return;
    }

    if (!isEmailValid(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!isPasswordValid(formData.password)) {
      setError("Password is too weak");
      return;
    }

    if (!passwordsMatch) {
      setError("Passwords do not match");
      return;
    }

    if (!agreeTerms) {
      setError("You must agree to the Terms of Service and Privacy Policy");
      return;
    }

    setIsLoading(true);
    try {
      const passwordHash = await sha256Hex(formData.password);
      const passwordConfirmHash = await sha256Hex(formData.confirmPassword);
      await apiRegister(
        formData.username.trim(),
        formData.firstName.trim(),
        formData.lastName.trim() || null,
        formData.email,
        passwordHash,
        passwordConfirmHash
      );
      // Redirect to the specified URL or dashboard
      router.push(redirectUrl || "/dashboard");
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.payload.code === 422 && err.payload.errors) {
          const messages = Object.values(err.payload.errors).flat();
          setError(messages[0] ?? err.payload.message);
        } else {
          setError(err.payload.message || "Sign up failed. Please try again.");
        }
      } else {
        setError("Sign up failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className='p-8 space-y-6'>
      <div>
        <Logo width={200} height={100} />

        <h1 className='text-2xl font-bold font-serif mb-2'>Create Account</h1>
        <p className='text-muted-foreground'>
          Join PavitInfoTech and start monitoring your IoT infrastructure
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
          <label className='text-sm font-medium'>Username</label>
          <Input
            name='username'
            placeholder='username'
            value={formData.username}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>

        <div className='grid grid-cols-2 gap-4'>
          <div className='space-y-2'>
            <label className='text-sm font-medium'>First name</label>
            <Input
              name='firstName'
              placeholder='First name'
              value={formData.firstName}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>
          <div className='space-y-2'>
            <label className='text-sm font-medium'>Last name (optional)</label>
            <Input
              name='lastName'
              placeholder='Last name (optional)'
              value={formData.lastName}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>
        </div>

        <div className='space-y-2'>
          <label className='text-sm font-medium'>Email</label>
          <Input
            type='email'
            name='email'
            placeholder='you@example.com'
            value={formData.email}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>

        <div className='space-y-2'>
          <label className='text-sm font-medium'>Password</label>
          <div className='relative'>
            <Input
              type={showPassword ? "text" : "password"}
              name='password'
              placeholder='Create a strong password'
              value={formData.password}
              onChange={handleChange}
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
          {formData.password && (
            <PasswordStrengthIndicator {...passwordStrength} />
          )}
          {passwordStrength.feedback.length > 0 && (
            <ul className='text-xs text-muted-foreground space-y-1 mt-2'>
              {passwordStrength.feedback.map((f) => (
                <li key={f}>• {f}</li>
              ))}
            </ul>
          )}
        </div>

        <div className='space-y-2'>
          <label className='text-sm font-medium'>Confirm Password</label>
          <div className='relative'>
            <Input
              type={showConfirmPassword ? "text" : "password"}
              name='confirmPassword'
              placeholder='Confirm your password'
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={isLoading}
              className='pr-10'
            />
            <button
              type='button'
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground'
              disabled={isLoading}
            >
              {showConfirmPassword ? (
                <EyeOff className='w-4 h-4' />
              ) : (
                <Eye className='w-4 h-4' />
              )}
            </button>
            {formData.confirmPassword && (
              <div className='absolute right-10 top-1/2 -translate-y-1/2'>
                {passwordsMatch ? (
                  <Check className='w-4 h-4 text-green-500' />
                ) : (
                  <div className='text-xs text-red-500'>✗</div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className='flex items-start gap-3'>
          <input
            type='checkbox'
            id='terms'
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
            disabled={isLoading}
            className='mt-1'
          />
          <label htmlFor='terms' className='text-xs text-muted-foreground'>
            I agree to the{" "}
            <Link href='/terms' className='text-primary hover:underline'>
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href='/privacy' className='text-primary hover:underline'>
              Privacy Policy
            </Link>
          </label>
        </div>

        <Button
          type='submit'
          className='w-full'
          disabled={isLoading || !agreeTerms}
        >
          {isLoading ? (
            <>
              <Loader className='w-4 h-4 mr-2 animate-spin' />
              Creating account...
            </>
          ) : (
            "Create Account"
          )}
        </Button>
      </form>

      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <div className='w-full border-t border-border' />
        </div>
        <div className='relative flex justify-center text-sm'>
          <span className='px-2 bg-card text-muted-foreground'>
            Or sign up with
          </span>
        </div>
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <Button
          variant='outline'
          disabled={isLoading}
          onClick={() => {
            window.location.href = getGoogleOAuthUrl(redirectUrl || undefined);
          }}
        >
          <FcGoogle className='w-5 h-5 mr-2' />
          Google
        </Button>
        <Button
          variant='outline'
          disabled={isLoading}
          onClick={() => {
            window.location.href = getGitHubOAuthUrl(redirectUrl || undefined);
          }}
        >
          <FaGithub className='w-5 h-5 mr-2' />
          GitHub
        </Button>
      </div>

      <p className='text-center text-sm text-muted-foreground'>
        Already have an account?{" "}
        <Link
          href={
            redirectUrl
              ? `/auth/signin?redirect=${encodeURIComponent(redirectUrl)}`
              : "/auth/signin"
          }
          className='text-primary hover:underline font-semibold'
        >
          Sign in
        </Link>
      </p>
    </Card>
  );
}
