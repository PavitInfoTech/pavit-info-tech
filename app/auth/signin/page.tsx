import { MainLayout } from "@/components/layout/main-layout"
import { SignInForm } from "@/components/auth/sign-in-form"

export const metadata = {
  title: "Sign In | PavitInfoTech",
  description: "Sign in to your PavitInfoTech account",
}

export default function SignInPage() {
  return (
    <MainLayout>
      <div className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-md">
          <SignInForm />
        </div>
      </div>
    </MainLayout>
  )
}
