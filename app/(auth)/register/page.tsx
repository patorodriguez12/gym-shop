"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthForm from "../../components/AuthForm";

export default function RegisterPage() {
  const router = useRouter();

  async function handleRegister(email: string, password: string) {
    // aquí irá supabase.signUp()
    console.log("Register:", email, password);

    await new Promise((res) => setTimeout(res, 1000));

    router.push("/");
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
