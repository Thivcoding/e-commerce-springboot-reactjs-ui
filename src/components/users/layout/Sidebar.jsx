import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white shadow-md min-h-screen p-5 hidden lg:block">

      <h2 className="text-lg font-bold mb-4 text-gray-700">
        Categories
      </h2>

      <nav className="flex flex-col gap-2">

        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg ${
              isActive
                ? "bg-indigo-600 text-white"
                : "hover:bg-gray-100 text-gray-700"
            }`
          }
        >
          All Products
        </NavLink>

        <NavLink to="/category/electronics" className="px-4 py-2 rounded-lg hover:bg-gray-100">
          Electronics
        </NavLink>

        <NavLink to="/category/fashion" className="px-4 py-2 rounded-lg hover:bg-gray-100">
          Fashion
        </NavLink>

        <NavLink to="/category/home" className="px-4 py-2 rounded-lg hover:bg-gray-100">
          Home & Living
        </NavLink>

      </nav>

    </aside>
  );
};

export default Sidebar;