"use client";

import { useCart } from "@/lib/store/useCart";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function CartPage() {
  const { items, addItem, removeItem, clearCart } = useCart();
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Obtener el ID del usuario al cargar
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUserId(user?.id);
    };
    getUser();
  }, []);

  if (!mounted) return null;

  // Calculamos el total
  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-20 text-center text-white">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <Link href="/" className="text-orange-500 hover:underline">
          Go back to shopping
        </Link>
      </div>
    );
  }

  return (
    <main className="max-w-5xl mx-auto p-6 text-white">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* LISTA DE PRODUCTOS */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.product_id}
              className="flex items-center gap-4 bg-gray-900 p-4 rounded-lg border border-gray-800"
            >
              <div className="relative h-24 w-24 flex-shrink-0">
                <Image
                  src={item.image_url}
                  alt={item.name}
                  fill
                  className="object-cover rounded-md"
                />
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-orange-500">${item.price}</p>
              </div>

              <div className="flex items-center gap-3 bg-gray-800 rounded-lg px-3 py-1">
                <button
                  onClick={() => removeItem(item.product_id, userId)}
                  className="text-gray-400"
                >
                  -
                </button>
                <span className="text-sm font-medium w-6 text-center">
                  {item.quantity}
                </span>
                <button
                  onClick={() => addItem(item, userId)}
                  className="text-orange-500"
                >
                  +
                </button>
              </div>
            </div>
          ))}

          <button
            onClick={() => clearCart(userId)}
            className="text-gray-500 text-sm hover:text-red-400 transition"
          >
            Clear cart
          </button>
        </div>

        {/* RESUMEN DE PAGO */}
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 h-fit">
          <h2 className="text-xl font-bold mb-4">Summary</h2>
          <div className="flex justify-between mb-4 text-xl font-bold border-t border-gray-800 pt-4">
            <span>Total</span>
            <span className="text-orange-500">${total.toFixed(2)}</span>
          </div>

          <button className="w-full bg-orange-500 text-gray-900 font-bold py-3 rounded-md hover:bg-orange-400 transition">
            Checkout
          </button>
        </div>
      </div>
    </main>
  );
}
