import { Suspense } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { SignUpForm } from "@/components/auth/sign-up-form";
import { Loader2 } from "lucide-react";

export const metadata = {
  title: "Sign Up | PavitInfoTech",
  description: "Create your PavitInfoTech account",
};

export default function SignUpPage() {
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
            <SignUpForm />
          </Suspense>
        </div>
      </div>
    </MainLayout>
  );
}
