"use client";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import { useCart } from "@/lib/store/useCart";

export default function CartSync() {
  const syncCart = useCart((state) => state.syncCart);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        await syncCart(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [syncCart]);

  return null; // Este componente no renderiza nada, solo ejecuta lógica
}
