"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import AuthForm from "../../components/AuthForm";

export default function LoginPage() {
  const router = useRouter();

  async function handleLogin(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({
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
      title="Sign in"
      submitLabel="Login"
      onSubmit={handleLogin}
      footer={
        <>
          Don’t have an account?{" "}
          <Link href="/register" className="text-orange-400 hover:underline">
            Register
          </Link>
        </>
      }
    />
  );
}
