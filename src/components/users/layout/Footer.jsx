import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white border-t px-6 py-4 mt-6">

      <div className="flex flex-col md:flex-row justify-between items-center gap-3">

        <p className="text-sm text-gray-500">
          © 2026 Ecommerce Store. All rights reserved.
        </p>

        <div className="flex gap-4 text-sm text-gray-500">
          <span className="hover:text-gray-800 cursor-pointer">Privacy</span>
          <span className="hover:text-gray-800 cursor-pointer">Terms</span>
          <span className="hover:text-gray-800 cursor-pointer">Support</span>
        </div>

      </div>

    </footer>
  );
};

export default Footer;