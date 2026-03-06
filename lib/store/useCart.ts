// lib/store/useCart.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { supabase } from "@/lib/supabase/client";

interface CartItem {
  product_id: string;
  name: string;
  price: number;
  image_url: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: any, userId?: string) => Promise<void>;
  syncCart: (userId: string) => Promise<void>;
  clearCart: (userId?: string) => Promise<void>;
  removeItem: (productId: string, userId?: string) => Promise<void>;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: async (product, userId) => {
        const { items } = get();
        const existing = items.find((i) => i.product_id === product.id);

        // 1. Lógica Local (Zustand)
        let newItems;
        if (existing) {
          newItems = items.map((i) =>
            i.product_id === product.id
              ? { ...i, quantity: i.quantity + 1 }
              : i,
          );
        } else {
          newItems = [
            ...items,
            {
              product_id: product.id,
              name: product.name,
              price: product.price,
              image_url: product.image_url,
              quantity: 1,
            },
          ];
        }
        set({ items: newItems });

        // 2. Lógica de Base de Datos (Si hay usuario)
        if (userId) {
          await supabase.from("cart_items").upsert(
            {
              user_id: userId,
              product_id: product.id,
              quantity: existing ? existing.quantity + 1 : 1,
            },
            { onConflict: "user_id, product_id" },
          );
        }
      },

      syncCart: async (userId) => {
        const localItems = get().items;

        // Subir items locales a la DB al iniciar sesión
        for (const item of localItems) {
          await supabase.from("cart_items").upsert({
            user_id: userId,
            product_id: item.product_id,
            quantity: item.quantity,
          });
        }

        // Descargar todo lo que hay en la DB para unificar
        const { data } = await supabase
          .from("cart_items")
          .select("quantity, products(id, name, price, image_url)")
          .eq("user_id", userId);

        if (data) {
          const cloudItems = data.map((d: any) => ({
            product_id: d.products.id,
            name: d.products.name,
            price: d.products.price,
            image_url: d.products.image_url,
            quantity: d.quantity,
          }));
          set({ items: cloudItems });
        }
      },

      clearCart: async (userId) => {
        // 1. Limpieza local en Zustand
        set({ items: [] });

        // 2. Limpieza en la base de datos si el usuario está logueado
        if (userId) {
          const { error } = await supabase
            .from("cart_items")
            .delete()
            .eq("user_id", userId);

          if (error) {
            console.error(
              "Error al limpiar el carrito en la DB:",
              error.message,
            );
          }
        }
      },
      removeItem: async (productId, userId) => {
        const { items } = get();
        const existing = items.find((i) => i.product_id === productId);

        if (!existing) return;

        let newItems;
        if (existing.quantity > 1) {
          // Reducir cantidad localmente
          newItems = items.map((i) =>
            i.product_id === productId ? { ...i, quantity: i.quantity - 1 } : i,
          );

          // Actualizar en DB
          if (userId) {
            await supabase.from("cart_items").upsert({
              user_id: userId,
              product_id: productId,
              quantity: existing.quantity - 1,
            });
          }
        } else {
          // Eliminar completamente localmente
          newItems = items.filter((i) => i.product_id !== productId);

          // Eliminar en DB
          if (userId) {
            await supabase
              .from("cart_items")
              .delete()
              .eq("user_id", userId)
              .eq("product_id", productId);
          }
        }
        set({ items: newItems });
      },
    }),
    { name: "gym-cart-storage" },
  ),
);
