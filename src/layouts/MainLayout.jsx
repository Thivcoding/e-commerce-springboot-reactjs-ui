import React from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/users/layout/Sidebar";
import Navbar from "../components/users/layout/Navbar";
import Footer from "../components/users/layout/Footer";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex bg-[#F8FAFC]">

      {/* Sidebar */}
      {/* <Sidebar /> */}

      {/* Main */}
      <div className="flex-1 flex flex-col">

        {/* Navbar */}
        <Navbar />

        {/* Content */}
        <main className="flex-1 ">
          <Outlet />
        </main>

        {/* Footer */}
        <Footer />

      </div>

    </div>
  );
};

export default MainLayout;