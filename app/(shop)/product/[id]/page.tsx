import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // 1. Unpack ID and cookies
  const { id } = await params;
  const cookieStore = await cookies();

  // 2. Initialize Supabase
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
      },
    },
  );

  // 3. Check the specific product with its category
  const { data: product, error } = await supabase
    .from("products")
    .select("*, categories(name)")
    .eq("id", id)
    .single();

  if (error || !product) {
    notFound();
  }

  return (
    <main className="max-w-5xl mx-auto p-6 text-white">
      <Link
        href="/"
        className="text-orange-500 hover:underline mb-8 inline-block"
      >
        ← Back to the store
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-4">
        {/* Left side: Image */}
        <div className="relative aspect-square md:aspect-auto md:h-[500px] bg-gray-900 rounded-xl overflow-hidden border border-gray-800">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              priority
              className="object-cover"
            />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-600">
              Sin imagen
            </div>
          )}
        </div>

        {/* Right side: Info */}
        <div className="flex flex-col">
          <span className="text-orange-500 font-medium uppercase tracking-widest text-sm">
            {product.categories?.name}
          </span>
          <h1 className="text-4xl font-bold mt-2 text-gray-900">
            {product.name}
          </h1>
          <p className="text-3xl font-bold mt-4 text-gray-800">
            ${product.price}
          </p>

          <div className="my-6 border-t border-gray-800 pt-6">
            <h3 className="text-lg font-semibold mb-2 text-gray-600">
              Description
            </h3>
            <p className="text-gray-400 leading-relaxed text-gray-600">
              {product.description}
            </p>
          </div>

          <div className="mt-auto space-y-4">
            <p className="text-sm text-gray-900">
              Stock: <span className="text-gray-500">{product.stock}</span>
            </p>
            <button className="w-full bg-orange-500 text-gray-900 py-4 rounded-lg font-bold text-lg hover:bg-orange-400 transition transform active:scale-95">
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
