const Navbar = () => {
  return (
    <header className="border-b">
      <div>
        {/* LOGO */}
        <div>GymShop</div>

        {/* SEARCHBAR */}
        <div>
          <input type="text" />
        </div>

        {/* ACTIONS */}
        <div>
          <button>Login</button>
          <button>Register</button>
          <button>Cart</button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
