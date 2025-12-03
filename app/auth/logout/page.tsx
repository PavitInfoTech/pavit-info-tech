"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { MainLayout } from "@/components/layout/main-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { apiLogout } from "@/lib/auth-client";
import { Logo } from "@/components/layout/logo";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    const run = async () => {
      await apiLogout();
    };
    void run();
  }, []);

  return (
    <MainLayout>
      <div className='min-h-screen flex items-center justify-center px-4 py-20'>
        <div className='w-full max-w-md'>
          <Card className='p-8 space-y-6 text-center'>
            <Logo width={200} height={70} />

            <h1 className='text-2xl font-bold font-serif mb-2'>
              You have been logged out
            </h1>
            <p className='text-muted-foreground'>
              Your session has ended. You can safely close this tab or sign in
              again.
            </p>
            <Button
              onClick={() => router.push("/auth/signin")}
              className='w-full'
            >
              Go to Sign In
            </Button>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
