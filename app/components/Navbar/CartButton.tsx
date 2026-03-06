"use client";

import { useCart } from "@/lib/store/useCart";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function CartButton() {
  const items = useCart((state) => state.items);
  const [mounted, setMounted] = useState(false);

  // Truco de hidratación: 
  // Solo mostramos el número real una vez que el cliente "despierta"
  useEffect(() => {
    setMounted(true);
  }, []);

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Link
      href="/cart"
      className="
        relative rounded-md border border-gray-700
        px-3 py-1.5 text-gray-100
        hover:border-orange-500 hover:text-orange-400
        transition cursor-pointer flex items-center gap-2
      "
    >
      Cart
      {mounted && totalItems > 0 && (
        <span className="
          absolute -top-2 -right-2 
          bg-orange-500 text-gray-900 
          text-[10px] font-bold 
          h-5 w-5 flex items-center justify-center 
          rounded-full border-2 border-gray-900
        ">
          {totalItems}
        </span>
      )}
    </Link>
  );
}