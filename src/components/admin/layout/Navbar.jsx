import React from "react";
import { FaUserCircle } from "react-icons/fa";
import {
  FaChartLine,
  FaShop,
  FaRightFromBracket,
//   FaUserCircle,
} from "react-icons/fa6";
import { Link } from "react-router-dom";

const Navbar = ({ user, onLogout }) => {
  const userImage =
    user?.imageUrl || user?.avatar || user?.profileImage || user?.photo;

  const userName = user?.name || user?.username || "Admin User";
  const userEmail = user?.email || "admin@example.com";
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white">
      <div className="flex min-h-20 flex-wrap items-center justify-between gap-4 px-5 py-4 lg:px-8">

        {/* LEFT */}
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-600">
            <span className="inline-flex items-center gap-2">
              <FaChartLine />
              Admin panel
            </span>
          </p>
          <h1 className="text-xl font-black text-slate-950">
            Dashboard
          </h1>
        </div>

        {/* RIGHT */}
        <div className="flex flex-wrap items-center justify-end gap-3">

          {/* USER */}
          <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 py-1.5 pl-2 pr-4">
            {userImage ? (
              <img
                src={userImage}
                alt={userName}
                className="h-10 w-10 rounded-full object-cover ring-2 ring-white"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-black text-white ring-2 ring-white">
                {userInitial || <FaUserCircle />}
              </div>
            )}

            <div className="hidden min-w-0 sm:block">
              <p className="max-w-32 truncate text-sm font-black text-slate-950">
                {userName}
              </p>
              <p className="max-w-32 truncate text-xs font-semibold text-slate-500">
                {userEmail}
              </p>
            </div>
          </div>

          {/* VIEW STORE */}
          <Link
            to="/"
            className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-black text-slate-950 transition hover:bg-slate-50 sm:inline-flex"
          >
            <FaShop />
            View store
          </Link>

          {/* LOGOUT */}
          <button
            onClick={onLogout}
            className="inline-flex items-center gap-2 rounded-full bg-red-600 px-5 py-2.5 text-sm font-black text-white shadow-lg shadow-red-200 transition hover:-translate-y-0.5 hover:bg-red-700"
          >
            <FaRightFromBracket />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;