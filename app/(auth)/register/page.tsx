"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import AuthForm from "../../components/AuthForm";

export default function RegisterPage() {
  const router = useRouter();

  async function handleRegister(email: string, password: string) {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    router.push("/");
    router.refresh();
  }

  return (
    <AuthForm
      title="Create account"
      submitLabel="Register"
      onSubmit={handleRegister}
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="text-orange-400 hover:underline">
            Login
          </Link>
        </>
      }
    />
  );
}
