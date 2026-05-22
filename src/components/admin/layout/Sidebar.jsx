import {
  FaTachometerAlt,
  FaShoppingBag,
  FaUsers,
  FaCreditCard,
  FaBox,
  FaFolder,
  // FaSignOutAlt,
  FaHome,
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

const menuItems = [
  {
    name: "Dashboard",
    icon: <FaTachometerAlt size={20} />,
    path: "/admin/dashboard",
  },
  {
    name: "Products",
    icon: <FaShoppingBag size={20} />,
    path: "/admin/products",
  },
  {
    name: "Categories",
    icon: <FaFolder size={20} />,
    path: "/admin/categories",
  },
  {
    name: "Orders",
    icon: <FaBox size={20} />,
    path: "/admin/orders",
  },
  {
    name: "Users",
    icon: <FaUsers size={20} />,
    path: "/admin/users",
  },
  {
    name: "Payments",
    icon: <FaCreditCard size={20} />,
    path: "/admin/payments",
  },
];

const Sidebar = () => {
  return (
    <aside className="relative w-[260px] bg-indigo-700 text-white min-h-screen shadow-xl">
      {/* Logo */}
      <div className="h-20 flex items-center justify-center border-b border-indigo-600">
        <div className="flex items-center gap-2">
          <FaHome size={22} />
          <h1 className="text-2xl font-bold">Ecommerce</h1>
        </div>
      </div>

      {/* Menu */}
      <nav className="p-4 flex flex-col gap-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
              ${
                isActive
                  ? "bg-white text-indigo-700"
                  : "hover:bg-indigo-600"
              }`
            }
          >
            {item.icon}
            <span className="font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      {/* <div className="absolute bottom-5 left-0 w-full px-4">
        <button className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 transition-all py-3 rounded-xl">
          <FaSignOutAlt size={18} />
          Logout
        </button>
      </div> */}
    </aside>
  );
};

export default Sidebar;