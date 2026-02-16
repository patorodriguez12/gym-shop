"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthForm from "../../components/AuthForm";

export default function LoginPage() {
  const router = useRouter();

  async function handleLogin(email: string, password: string) {
    console.log("Login:", email, password);

    await new Promise((res) => setTimeout(res, 1000));

    router.push("/");
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
