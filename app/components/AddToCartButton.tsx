"use client";
import { useCart } from "@/lib/store/useCart";

interface Props {
  product: any;
  userId?: string;
}

export default function AddToCartButton({ product, userId }: Props) {
  const addItem = useCart((state) => state.addItem);

  const handleAdd = async () => {
    // Llamamos a la función del store que ya tiene la lógica híbrida
    await addItem(product, userId);
    alert(`${product.name} añadido al carrito`);
  };

  return (
    <button
      onClick={handleAdd}
      className="w-full bg-orange-500 text-gray-900 py-3 rounded-md font-bold hover:bg-orange-400 transition"
    >
      Añadir al carrito
    </button>
  );
}
