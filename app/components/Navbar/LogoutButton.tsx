"use client";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <button onClick={handleLogout} className="hover:text-orange-400 cursor-pointer">
      Logout
    </button>
  );
}