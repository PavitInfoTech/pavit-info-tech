"use client";

import Link from "next/link";
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { Logo } from "@/components/layout/logo";

export default function EmailVerifiedPage() {
  return (
    <MainLayout>
      <div className='min-h-screen flex items-center justify-center px-4 py-20'>
        <div className='w-full max-w-md'>
          <Card className='p-8 space-y-6 text-center'>
            <Logo width={200} height={70} />
            <div className='flex justify-center'>
              <div className='w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center'>
                <CheckCircle2 className='w-8 h-8 text-emerald-500' />
              </div>
            </div>

            <div className='space-y-2'>
              <h1 className='text-2xl font-bold font-serif'>Email Verified</h1>
              <p className='text-muted-foreground'>
                Your email address has been successfully verified. You can now
                sign in and start using PavitInfoTech.
              </p>
            </div>

            <Link href='/auth/signin'>
              <Button className='w-full'>Sign In to Your Account</Button>
            </Link>

            <p className='text-xs text-muted-foreground'>
              Already signed in?{" "}
              <Link href='/dashboard' className='text-primary hover:underline'>
                Go to Dashboard
              </Link>
            </p>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
