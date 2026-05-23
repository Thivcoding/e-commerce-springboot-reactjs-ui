import { useState } from "react";
import { FaSearch, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { useCart } from "../../../hooks/useCart";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { token, user, logout } = useAuth();
  const { cart  } = useCart();

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Products", path: "/products" },
    { label: "Orders", path: "/my-orders" },
  ];

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left - Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="bg-indigo-600 text-white px-3 py-1 rounded-lg font-bold text-xl">
              E
            </div>
            <span className="text-2xl font-bold text-gray-800 hidden sm:block">
              Ecommerce
            </span>
          </Link>

          {/* Center - Menu (Hidden on mobile) */}
          <nav className="hidden lg:flex items-center gap-8 flex-1 justify-center">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-gray-700 hover:text-indigo-600 font-medium transition duration-200 text-sm"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right - Search, Cart, Auth */}
          <div className="flex items-center gap-3 sm:gap-5">
            {/* Search (Hidden on small screens) */}
            <div className="hidden sm:flex items-center bg-gray-100 px-3 py-2 rounded-lg gap-2">
              <FaSearch className="text-gray-500 text-sm" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent outline-none px-2 w-32 lg:w-48 text-sm"
              />
            </div>

            {/* Cart Icon */}
            <Link
              to="/cart"
              className="relative text-gray-700 hover:text-indigo-600 transition duration-200"
            >
              <FaShoppingCart className="text-lg" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 rounded-full font-semibold">
                {cart.items.length}
              </span>
            </Link>

            {/* Auth Section */}
            {token && user ? (
              <div className="hidden sm:flex items-center gap-4">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition duration-200"
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                    {/* <FaUser size={12} /> */}
                    <img
                      className="w-full h-full rounded-full object-cover"
                      src={user?.imageUrl}
                      alt={user?.name}
                    />
                  </div>

                  <span className="text-sm font-medium text-gray-700 hidden lg:block">
                    {user?.name}
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200 text-sm font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition duration-200 font-medium text-sm"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200 font-medium text-sm"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-gray-700 hover:text-indigo-600 transition duration-200"
            >
              {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden pb-4 border-t border-gray-200">
            <nav className="flex flex-col gap-2 mt-4">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition duration-200 font-medium"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Mobile Search */}
            <div className="mt-4 px-4">
              <div className="flex items-center bg-gray-100 px-3 py-2 rounded-lg gap-2">
                <FaSearch className="text-gray-500" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="bg-transparent outline-none px-2 w-full text-sm"
                />
              </div>
            </div>

            {/* Mobile Auth */}
            {token && user ? (
              <div className="mt-4 px-4 flex flex-col gap-2">
                <Link
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg font-medium text-center"
                >
                  My Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="mt-4 px-4 flex flex-col gap-2">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg font-medium text-center"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium text-center"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
