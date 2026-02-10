const Navbar = () => {
  return (
    <header className="bg-gray-900 border-b border-gary-800">
      <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between gap-6">
        {/* LOGO */}
        <div className="text-lg font-semibold text-orange-500 whitespace-nowrap">
          GymShop
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
        <div className="flex items-center gap-4 text-sm text-gray-300 whitespace-nowrap">
          <button className="hover:text-orange-400 transition cursor-pointer">
            Login
          </button>
          <button className="hover:text-orange-400 transition cursor-pointer">
            Register
          </button>
          <button
            className="
              relative rounded-md border border-gray-700
              px-3 py-1.5 text-gray-100
              hover:border-orange-500 hover:text-orange-400
              transition cursor-pointer
            "
          >
            Cart
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
