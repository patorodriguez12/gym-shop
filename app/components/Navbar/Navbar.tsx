import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import CartButton from "./CartButton";

export default async function Navbar() {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async getAll() {
          return (await cookieStore).getAll();
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="bg-gray-900 border-b border-gary-800">
      <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between gap-6">
        {/* LOGO */}
        <div className="text-lg font-semibold text-orange-500 whitespace-nowrap">
          <Link href="/">GymShop</Link>
        </div>

        {/* SEARCHBAR */}
        <div className="flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search products..."
            className="
              w-full rounded-md bg-gray-800 border border-gray-700
              px-3 py-2 text-sm text-gray-100
              placeholder:text-gray-500
              focus:outline-none focus:ring-2 focus:ring-orange-500
              focus:border-orange-500
            "
          />
        </div>

        {/* ACTIONS */}
        <nav className="flex items-center gap-4 text-sm text-gray-300 whitespace-nowrap">
          {user ? (
            <>
              <span className="text-gray-400">{user.email}</span>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-orange-400">
                Login
              </Link>
              <Link href="/register" className="hover:text-orange-400">
                Register
              </Link>
            </>
          )}

          <CartButton />
        </nav>
      </div>
    </header>
  );
}
