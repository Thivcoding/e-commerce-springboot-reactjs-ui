import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FaBoxOpen,
  FaChartLine,
  FaLayerGroup,
  FaMoneyBillWave,
  FaRightFromBracket,
  FaShop,
  FaTags,
  //   FaUserCircle,
  FaUsers,
} from "react-icons/fa6";
import { useAuth } from "../hooks/useAuth";
import { FaUserCircle } from "react-icons/fa";
import Sidebar from "../components/admin/layout/Sidebar";
import Navbar from "../components/admin/layout/Navbar";

const sidebarLinks = [
  { name: "Dashboard", path: "/admin", icon: FaChartLine },
  { name: "Users", path: "/admin/users", icon: FaUsers },
  { name: "Categories", path: "/admin/categories", icon: FaTags },
  { name: "Products", path: "/admin/products", icon: FaBoxOpen },
  { name: "Orders", path: "/admin/orders", icon: FaLayerGroup },
  { name: "Payments", path: "/admin/payments", icon: FaMoneyBillWave },
];

const AdminLayout = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const userImage =
    user?.imageUrl || user?.avatar || user?.profileImage || user?.photo;
  const userName = user?.name || user?.username || "Admin User";
  const userEmail = user?.email || "admin@example.com";
  const userInitial = userName.charAt(0).toUpperCase();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <div className="flex min-h-screen">
        <Sidebar />

        <section className="flex min-w-0 flex-1 flex-col">
          <Navbar user={user} onLogout={handleLogout} />

          <div className="flex-1 p-5 lg:p-8">
            <div className="min-h-[calc(100vh-8rem)] rounded-2xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/70 lg:p-8">
              <Outlet />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default AdminLayout;
