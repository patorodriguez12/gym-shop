import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import Link from "next/link";
import Image from "next/image";

export default async function Home() {
  // 1. Unpack cookies
  const cookieStore = await cookies();

  // 2. Initialize Supabase
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
      },
    },
  );

  // 3. Select all products with its category
  const { data: products, error } = await supabase
    .from("products")
    .select("*, categories(name)");
    
  if (error) {
    console.error(error);
    return <div className="text-white p-10">Error fetching products</div>;
  }

  return (
    <main className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-white">Our Products</h1>

      {products?.length === 0 && (
        <p className="text-gray-500">
          There are no products available at this time.
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products?.map((product) => (
          <div
            key={product.id}
            className="bg-gray-900 border border-gray-800 p-4 rounded-lg flex flex-col"
          >
            <div className="relative w-full h-48 bg-gray-800 rounded-md mb-4 overflow-hidden">
              {product.image_url ? (
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-600">
                  No image
                </div>
              )}
            </div>

            <Link href={`/product/${product.id}`}>
              <h2 className="text-xl font-semibold text-orange-500 hover:underline cursor-pointer">
                {product.name}
              </h2>
            </Link>
            <p className="text-gray-400 text-xs uppercase tracking-widest mb-2">
              {product.categories?.name || "No category"}
            </p>
            <p className="text-gray-300 text-sm line-clamp-2 mb-4 flex-grow">
              {product.description}
            </p>

            <div className="flex items-center justify-between mt-auto">
              <span className="text-white font-bold text-xl">
                ${product.price}
              </span>
              <button className="bg-orange-500 text-gray-900 px-4 py-2 rounded-md font-bold hover:bg-orange-400 transition text-sm">
                Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
