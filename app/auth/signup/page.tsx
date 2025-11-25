import { MainLayout } from "@/components/layout/main-layout"
import { SignUpForm } from "@/components/auth/sign-up-form"

export const metadata = {
  title: "Sign Up | PavitInfoTech",
  description: "Create your PavitInfoTech account",
}

export default function SignUpPage() {
  return (
    <MainLayout>
      <div className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-md">
          <SignUpForm />
        </div>
      </div>
    </MainLayout>
  )
}
