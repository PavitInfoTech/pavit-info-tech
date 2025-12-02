"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { MainLayout } from "@/components/layout/main-layout";
import { getAuthTokenStorage } from "@/lib/auth-storage";
import { apiGetCurrentUser } from "@/lib/auth-client";
import { Loader, CheckCircle, XCircle } from "lucide-react";
import { Suspense } from "react";

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

function deleteCookie(name: string) {
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}

function AuthCompleteContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [errorMessage, setErrorMessage] = useState("");

  // Get redirect URL from search params (passed back by OAuth callback)
  const redirectUrl = searchParams.get("redirect");

  useEffect(() => {
    async function completeAuth() {
      try {
        // Prefer token provided via query param ?token=..., fall back to cookie
        const tokenParam = searchParams.get("token");
        const cookieToken = getCookie("api_token");

        if (!tokenParam && !cookieToken) {
          setStatus("error");
          setErrorMessage(
            "Authentication failed. No token received from provider."
          );
          return;
        }

        // Store the token in our auth storage (prefer query param)
        const storage = getAuthTokenStorage();
        if (tokenParam) {
          storage.setToken(tokenParam);

          // Remove the token from the URL as soon as we've stored it to avoid leaking it
          try {
            const url = new URL(window.location.href);
            url.searchParams.delete("token");
            // Keep any other params such as `redirect`
            window.history.replaceState(
              {},
              document.title,
              url.pathname + url.search + url.hash
            );
          } catch (e) {
            // if anything goes wrong manipulating the URL, ignore and continue
          }
        } else {
          storage.setToken(cookieToken!);
          // Clear the cookie since we've extracted the token
          deleteCookie("api_token");
        }

        // Fetch the current user to get their profile
        await apiGetCurrentUser();

        setStatus("success");

        // Redirect to the specified URL or dashboard after a short delay
        setTimeout(() => {
          router.push(redirectUrl || "/dashboard");
        }, 1500);
      } catch (err) {
        console.error("OAuth complete error:", err);
        setStatus("error");
        setErrorMessage("Failed to complete authentication. Please try again.");
      }
    }

    completeAuth();
  }, [router, redirectUrl]);

  return (
    <Card className='p-8 max-w-md w-full text-center space-y-6'>
      {status === "loading" && (
        <>
          <Loader className='w-12 h-12 mx-auto text-primary animate-spin' />
          <div>
            <h1 className='text-xl font-bold font-serif mb-2'>
              Completing Sign In
            </h1>
            <p className='text-muted-foreground'>
              Please wait while we complete your authentication...
            </p>
          </div>
        </>
      )}

      {status === "success" && (
        <>
          <CheckCircle className='w-12 h-12 mx-auto text-green-500' />
          <div>
            <h1 className='text-xl font-bold font-serif mb-2'>
              Sign In Successful
            </h1>
            <p className='text-muted-foreground'>
              {redirectUrl
                ? "Redirecting you to complete your action..."
                : "Redirecting you to your dashboard..."}
            </p>
          </div>
        </>
      )}

      {status === "error" && (
        <>
          <XCircle className='w-12 h-12 mx-auto text-red-500' />
          <div>
            <h1 className='text-xl font-bold font-serif mb-2'>
              Authentication Failed
            </h1>
            <p className='text-muted-foreground'>{errorMessage}</p>
          </div>
          <button
            onClick={() => router.push("/auth/signin")}
            className='text-primary hover:underline text-sm'
          >
            Return to sign in
          </button>
        </>
      )}
    </Card>
  );
}

export default function AuthCompletePage() {
  return (
    <MainLayout>
      <section className='min-h-screen flex items-center justify-center py-16 px-4'>
        <Suspense
          fallback={
            <Card className='p-8 max-w-md w-full text-center space-y-6'>
              <Loader className='w-12 h-12 mx-auto text-primary animate-spin' />
              <div>
                <h1 className='text-xl font-bold font-serif mb-2'>
                  Completing Sign In
                </h1>
                <p className='text-muted-foreground'>
                  Please wait while we complete your authentication...
                </p>
              </div>
            </Card>
          }
        >
          <AuthCompleteContent />
        </Suspense>
      </section>
    </MainLayout>
  );
}
