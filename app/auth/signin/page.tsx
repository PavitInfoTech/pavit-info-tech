import { Suspense } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { SignInForm } from "@/components/auth/sign-in-form";
import { Loader2 } from "lucide-react";

export const metadata = {
  title: "Sign In | PavitInfoTech",
  description: "Sign in to your PavitInfoTech account",
};

export default function SignInPage() {
  return (
    <MainLayout>
      <div className='min-h-screen flex items-center justify-center px-4 py-10'>
        <div className='w-full max-w-md'>
          <Suspense
            fallback={
              <div className='flex items-center justify-center p-8'>
                <Loader2 className='w-6 h-6 animate-spin text-primary' />
              </div>
            }
          >
            <SignInForm />
          </Suspense>
        </div>
      </div>
    </MainLayout>
  );
}
