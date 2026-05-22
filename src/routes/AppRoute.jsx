// src/routes/AppRoute.jsx

import { BrowserRouter, Route, Routes } from "react-router-dom";

// ================= AUTH =================
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

// ================= USER =================
import Home from "../pages/users/home/Home";
import ProductPage from "../pages/users/products/ProductPage";
import CartPage from "../pages/users/cart/CartPage";
import CheckoutPage from "../pages/users/checkout/CheckoutPage";
import MyOrdersPage from "../pages/users/orders/MyOrdersPage";

// ================= ERROR =================
import NotFound from "../pages/error/NotFound";

// ================= LAYOUTS =================
import AdminLayout from "../layouts/AdminLayout";
import MainLayout from "../layouts/MainLayout";

// ================= ROUTE PROTECT =================
import AdminRoute from "./AdminRoute";

// ================= ADMIN DASHBOARD =================
import Dashboard from "../pages/admin/dashoard/Dashboard";

// ================= USERS =================
import UserList from "../pages/admin/users/UserList";
import UserCreate from "../pages/admin/users/UserCreate";
import UserEdit from "../pages/admin/users/UserEdit";

// ================= PRODUCTS =================
import ProductList from "../pages/admin/products/ProductList";
import ProductCreate from "../pages/admin/products/ProductCreate";
import ProductEdit from "../pages/admin/products/ProductEdit";
import ProductDetail from "../pages/users/products/ProductDetail";

// ================= CATEGORIES =================
import CategoryList from "../pages/admin/categories/CategoryList";
import CategoryCreate from "../pages/admin/categories/CategoryCreate";
import CategoryEdit from "../pages/admin/categories/CategoryEdit";

// ================= ORDERS =================
import OrderList from "../pages/admin/orders/OrderList";
import OrderDetailPage from "../pages/admin/orders/OrderDetailPage";

// ================= PAYMENTS =================
import PaymentList from "../pages/admin/payments/PaymentList";
import PaymentDetailPage from "../pages/admin/payments/PaymentDetailPage";
import ProfilePage from "../pages/users/profile/ProfilePage";

const AppRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* ================================================= */}
        {/* USER ROUTES */}
        {/* ================================================= */}

        <Route path="/" element={<MainLayout />}>
          {/* ================================================= */}
          {/* PUBLIC ROUTES */}
          {/* ================================================= */}

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route index element={<Home />} />
          <Route path="products" element={<ProductPage />} />
          <Route path="products/:id" element={<ProductDetail />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="my-orders" element={<MyOrdersPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        {/* ================================================= */}
        {/* ADMIN ROUTES */}
        {/* ================================================= */}

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          {/* Dashboard */}
          <Route index element={<Dashboard />} />
          {/* Dashboard */}
          <Route path="dashboard" element={<Dashboard />} />

          {/* ================================================= */}
          {/* USER MANAGEMENT */}
          {/* ================================================= */}

          <Route path="users" element={<UserList />} />

          <Route path="users/create" element={<UserCreate />} />

          <Route path="users/edit/:id" element={<UserEdit />} />

          {/* ================================================= */}
          {/* PRODUCT MANAGEMENT */}
          {/* ================================================= */}

          <Route path="products" element={<ProductList />} />

          <Route path="products/create" element={<ProductCreate />} />

          <Route path="products/edit/:id" element={<ProductEdit />} />

          {/* ================================================= */}
          {/* CATEGORY MANAGEMENT */}
          {/* ================================================= */}

          <Route path="categories" element={<CategoryList />} />

          <Route path="categories/create" element={<CategoryCreate />} />

          <Route path="categories/edit/:id" element={<CategoryEdit />} />

          {/* ================================================= */}
          {/* ORDER MANAGEMENT */}
          {/* ================================================= */}

          <Route path="orders" element={<OrderList />} />

          <Route path="orders/:id" element={<OrderDetailPage />} />

          {/* ================================================= */}
          {/* PAYMENT MANAGEMENT */}
          {/* ================================================= */}

          <Route path="payments" element={<PaymentList />} />

          <Route path="payments/:id" element={<PaymentDetailPage />} />
        </Route>

        {/* ================================================= */}
        {/* 404 PAGE */}
        {/* ================================================= */}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoute;
