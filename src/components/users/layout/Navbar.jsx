import { useEffect, useState } from "react";
import {
  FaSearch,
  FaShoppingCart,
  FaBars,
  FaTimes,
  FaChevronDown,
  FaUser,
  FaBox,
  FaHeart,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { useCart } from "../../../hooks/useCart";
import { getAllCategoriesService } from "../../../services/categoryService";

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
        console.error("Failed to load categories", error);
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
    }
  };

  const categoryLinks = categories.map((c) => ({
    label: c.name,
    path: `/products?category=${encodeURIComponent(c.name)}`,
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

        {/* DESKTOP MENU */}
        <nav className="hidden lg:flex items-center gap-8">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="text-gray-300 hover:text-white text-sm font-medium"
            >
              {item.label}
            </Link>
          ))}

          {/* CATEGORY DROPDOWN */}
          <div className="relative">
            <button
              onClick={() => setCategoryOpen(!categoryOpen)}
              className="text-sm text-gray-300 hover:text-white"
            >
              Categories ▾
            </button>

            {categoryOpen && (
              <div className="absolute top-full mt-2 w-56 rounded-xl bg-[#111827] border border-white/10 shadow-xl">
                <Link
                  to="/products"
                  className="block px-4 py-3 hover:bg-white/5"
                  onClick={() => setCategoryOpen(false)}
                >
                  All Categories
                </Link>

                {categoryLinks.map((cat) => (
                  <Link
                    key={cat.path}
                    to={cat.path}
                    className="block px-4 py-3 hover:bg-white/5"
                    onClick={() => setCategoryOpen(false)}
                  >
                    {cat.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* RIGHT */}
        <div className="flex items-center gap-4">

          {/* SEARCH */}
          <div className="hidden sm:flex items-center gap-2 bg-white/5 px-3 py-2 rounded-full">
            <FaSearch className="text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearch}
              placeholder="Search..."
              className="bg-transparent outline-none text-sm"
            />
          </div>

          {/* CART */}
          <Link to="/cart" className="relative p-2 bg-white/5 rounded-full">
            <FaShoppingCart />
            <span className="absolute -top-1 -right-1 bg-amber-300 text-black text-xs px-1.5 rounded-full">
              {cartCount}
            </span>
          </Link>

          {/* AUTH */}
          {token && user ? (
            <div className="hidden sm:block relative">
             <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 bg-white/5 px-2 py-1 rounded-full hover:bg-white/10 transition"
              >
                <img
                  src={user?.imageUrl}
                  className="w-8 h-8 rounded-full object-cover"
                  alt="user"
                />

                <span className="text-sm">{user?.name}</span>

                {/* DROPDOWN ICON */}
                <FaChevronDown
                  className={`text-xs transition-transform duration-200 ${
                    profileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {profileOpen && (
                <div className="absolute right-0 top-full mt-2 w-44 bg-[#111827] border border-white/10 rounded-xl">
                  <Link
                    to="/profile"
                    className="block px-4 py-3 hover:bg-white/5"
                    onClick={() => setProfileOpen(false)}
                  >
                    Profile
                  </Link>

                  <Link
                    to="/my-orders"
                    className="block px-4 py-3 hover:bg-white/5"
                    onClick={() => setProfileOpen(false)}
                  >
                    Orders
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-red-400 hover:bg-red-500/10"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden sm:flex gap-3">
              <Link to="/login" className="text-gray-300">Login</Link>
              <Link
                to="/register"
                className="bg-amber-300 text-black px-4 py-1 rounded-full font-bold"
              >
                Register
              </Link>
            </div>
          )}

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-white text-xl"
          >
            <FaBars />
          </button>
        </div>
      </div>

      {/* OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-50"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 left-0 z-50 h-screen w-72 bg-[#0B1220] text-white transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="font-bold text-lg">Menu</h2>
          <button onClick={() => setSidebarOpen(false)}>
            <FaTimes />
          </button>
        </div>

        <div className="p-4 flex flex-col gap-4">

          {/* LINKS */}
          <div className="flex flex-col gap-3">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className="text-gray-300"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* CATEGORY */}
          <div className="border-t border-white/10 pt-4">
            <p className="text-xs text-gray-400 mb-2">Categories</p>

            <div className="flex flex-col gap-2">
              <Link to="/products" onClick={() => setSidebarOpen(false)}>
                All Categories
              </Link>

              {categoryLinks.map((cat) => (
                <Link
                  key={cat.path}
                  to={cat.path}
                  onClick={() => setSidebarOpen(false)}
                  className="text-gray-300"
                >
                  {cat.label}
                </Link>
              ))}
            </div>
          </div>

          {/* AUTH */}
          {/* AUTH / PROFILE SECTION */}
          <div className="border-t border-white/10 pt-4">

            {token && user ? (
              <div className="flex flex-col gap-3">

                {/* USER INFO CARD */}
                <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl">
                  <img
                    src={user?.imageUrl}
                    className="w-10 h-10 rounded-full object-cover"
                    alt="user"
                  />
                  <div>
                    <p className="text-sm font-bold">{user?.name}</p>
                    <p className="text-xs text-gray-400">My Account</p>
                  </div>
                </div>

                {/* MENU ITEMS */}
                <Link
                  to="/profile"
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-3 text-gray-300 hover:text-white"
                >
                  <FaUser /> Profile
                </Link>

                <Link
                  to="/my-orders"
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-3 text-gray-300 hover:text-white"
                >
                  <FaBox /> Order History
                </Link>

                <Link
                  to="/cart"
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-3 text-gray-300 hover:text-white"
                >
                  <FaShoppingCart /> Cart
                </Link>

                {/* LOGOUT */}
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 transition py-2 rounded-lg font-bold mt-2"
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  to="/login"
                  onClick={() => setSidebarOpen(false)}
                  className="text-gray-300"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={() => setSidebarOpen(false)}
                  className="bg-amber-300 text-black py-2 text-center rounded font-bold"
                >
                  Register
                </Link>
              </div>
            )}

          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;