import { useEffect, useState } from "react";
import { FaSearch, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { useCart } from "../../../hooks/useCart";
import { getAllCategoriesService } from "../../../services/categoryService";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  const { token, user, logout } = useAuth();
  const { cart } = useCart();

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Products", path: "/products" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const result = await getAllCategoriesService();
        const fetchedCategories = Array.isArray(result?.body)
          ? result.body
          : Array.isArray(result)
            ? result
            : [];

        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Failed to load categories for navbar", error);
        setCategories([]);
      }
    };

    loadCategories();
  }, []);

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  const cartCount = cart?.items?.length || 0;

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      console.log("Search:", search);
      // TODO: navigate to /products?search=...
    }
  };

  const categoryLinks = categories.map((category) => ({
    label: category.name,
    path: `/products?category=${encodeURIComponent(category.name)}`,
  }));

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0B1220]/90 backdrop-blur-md text-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-amber-300 px-3 py-1 rounded-lg font-black text-black">
            E
          </div>
          <span className="text-lg font-black">Ecommerce</span>
        </Link>

        {/* MENU (DESKTOP) */}
        <nav className="hidden lg:flex items-center gap-8">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="text-gray-300 hover:text-white transition text-sm font-medium"
            >
              {item.label}
            </Link>
          ))}

          <div className="relative">
            <button
              type="button"
              onClick={() => setCategoryOpen((open) => !open)}
              className="flex items-center gap-1 text-sm font-medium text-gray-300 transition hover:text-white"
            >
              Categories
              <span className="text-xs">▾</span>
            </button>

            {categoryOpen && (
              <div className="absolute left-0 top-full mt-2 w-56 overflow-hidden rounded-2xl border border-white/10 bg-[#111827] shadow-2xl">
                <Link
                  to="/products"
                  onClick={() => setCategoryOpen(false)}
                  className="block px-4 py-3 text-sm text-gray-200 transition hover:bg-white/5 hover:text-white"
                >
                  All Categories
                </Link>

                {categoryLinks.length > 0 ? (
                  categoryLinks.map((category) => (
                    <Link
                      key={category.path}
                      to={category.path}
                      onClick={() => setCategoryOpen(false)}
                      className="block px-4 py-3 text-sm text-gray-200 transition hover:bg-white/5 hover:text-white"
                    >
                      {category.label}
                    </Link>
                  ))
                ) : (
                  <div className="px-4 py-3 text-sm text-gray-400">
                    Loading categories...
                  </div>
                )}
              </div>
            )}
          </div>
        </nav>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">
          {/* SEARCH */}
          <div className="hidden sm:flex items-center gap-2 rounded-full bg-white/5 px-3 py-2">
            <FaSearch className="text-gray-400 text-sm" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearch}
              placeholder="Search products..."
              className="bg-transparent outline-none text-sm text-white placeholder-gray-500 w-32 lg:w-48"
            />
          </div>

          {/* CART */}
          <Link
            to="/cart"
            className="relative rounded-full bg-white/5 p-2 hover:bg-white/10 transition"
          >
            <FaShoppingCart />

            <span className="absolute -top-1 -right-1 bg-amber-300 text-black text-xs px-1.5 rounded-full font-bold">
              {cartCount}
            </span>
          </Link>

          {/* AUTH */}
          {token && user ? (
            <div className="hidden sm:block relative">
              <button
                type="button"
                onClick={() => setProfileOpen((open) => !open)}
                aria-expanded={profileOpen}
                aria-haspopup="menu"
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 py-1.5 pr-3 transition hover:bg-white/10"
              >
                <img
                  src={user?.imageUrl}
                  alt={user?.name}
                  className="h-8 w-8 rounded-full object-cover border border-white/20"
                />
                <span className="text-sm font-medium text-white">
                  {user?.name}
                </span>
                <span className="text-xs text-gray-300">▾</span>
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 overflow-hidden rounded-2xl border border-white/10 bg-[#111827] shadow-2xl">
                  <Link
                    to="/profile"
                    onClick={() => setProfileOpen(false)}
                    className="block px-4 py-3 text-sm text-gray-200 transition hover:bg-white/5 hover:text-white"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/my-orders"
                    onClick={() => setProfileOpen(false)}
                    className="block px-4 py-3 text-sm text-gray-200 transition hover:bg-white/5 hover:text-white"
                  >
                    My Orders
                  </Link>
                  <button
                    onClick={() => {
                      setProfileOpen(false);
                      handleLogout();
                    }}
                    className="w-full px-4 py-3 text-left text-sm font-semibold text-red-300 transition hover:bg-red-500/10"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Link
                to="/login"
                className="text-sm text-gray-300 hover:text-white"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-full bg-amber-300 px-4 py-1.5 text-sm font-bold text-black hover:bg-amber-200"
              >
                Register
              </Link>
            </div>
          )}

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="lg:hidden border-t border-white/10 bg-[#0B1220] px-4 py-4">
          <div className="flex flex-col gap-3">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className="text-gray-300 hover:text-white"
              >
                {item.label}
              </Link>
            ))}

            <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
              <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
                Categories
              </p>
              <div className="mt-2 flex flex-col gap-2">
                <Link
                  to="/products"
                  onClick={() => setIsOpen(false)}
                  className="text-sm text-gray-200"
                >
                  All Categories
                </Link>

                {categoryLinks.length > 0 ? (
                  categoryLinks.map((category) => (
                    <Link
                      key={category.path}
                      to={category.path}
                      onClick={() => setIsOpen(false)}
                      className="text-sm text-gray-200"
                    >
                      {category.label}
                    </Link>
                  ))
                ) : (
                  <span className="text-sm text-gray-400">
                    Loading categories...
                  </span>
                )}
              </div>
            </div>

            {/* MOBILE SEARCH */}
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="mt-3 rounded-full bg-white/5 px-4 py-2 text-sm outline-none"
            />

            {/* MOBILE AUTH */}
            {token && user ? (
              <button
                onClick={handleLogout}
                className="rounded bg-red-500 py-2 text-sm font-bold"
              >
                Logout
              </button>
            ) : (
              <div className="flex flex-col gap-2">
                <Link to="/login" className="text-sm text-gray-300">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="rounded bg-amber-300 py-2 text-center text-sm font-bold text-black"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
