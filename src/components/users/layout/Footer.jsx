import React, { useState } from "react"
import { Link } from "react-router-dom"

import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
  FaBagShopping,
  FaHeadset,
  FaBuilding,
  FaTruckFast,
  FaLock,
  FaRotateLeft,
  FaBolt,
} from "react-icons/fa6"

const footerLinks = [
  {
    title: "Shop",
    icon: FaBagShopping,
    links: [
      { name: "New Arrivals", path: "/products?sort=new" },
      { name: "Best Sellers", path: "/products?sort=popular" },
      { name: "Deals", path: "/deals" },
      { name: "Gift Cards", path: "/gift-cards" },
    ],
  },
  {
    title: "Support",
    icon: FaHeadset,
    links: [
      { name: "Track Order", path: "/track-order" },
      { name: "Shipping", path: "/shipping" },
      { name: "Returns", path: "/returns" },
      { name: "FAQ", path: "/faq" },
    ],
  },
  {
    title: "Company",
    icon: FaBuilding,
    links: [
      { name: "About", path: "/about" },
      { name: "Careers", path: "/careers" },
      { name: "Blog", path: "/blog" },
      { name: "Contact", path: "/contact" },
    ],
  },
]

const Footer = () => {
  const [email, setEmail] = useState("")

  const handleSubscribe = (e) => {
    e.preventDefault()

    if (!email.includes("@")) {
      alert("Please enter a valid email")
      return
    }

    console.log("Subscribed:", email)
    alert("Thanks for subscribing!")
    setEmail("")
  }

  return (
    <footer className="bg-[#0B1220] text-white">

      {/* TRUST BAR */}
      <div className="border-b border-white/10">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-6 py-6 text-xs text-gray-300 sm:grid-cols-4">

          <span className="flex items-center justify-center gap-2">
            <FaTruckFast className="text-amber-300" />
            Free Shipping
          </span>

          <span className="flex items-center justify-center gap-2">
            <FaLock className="text-amber-300" />
            Secure Payment
          </span>

          <span className="flex items-center justify-center gap-2">
            <FaRotateLeft className="text-amber-300" />
            30-Day Returns
          </span>

          <span className="flex items-center justify-center gap-2">
            <FaBolt className="text-amber-300" />
            Fast Delivery
          </span>

        </div>
      </div>

      {/* MAIN FOOTER */}
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-5">

        {/* BRAND */}
        <div className="md:col-span-2">
          <h2 className="text-2xl font-black text-amber-300">
            NovaCart
          </h2>

          <p className="mt-3 text-sm text-gray-400 leading-6">
            Premium ecommerce experience with curated products,
            fast shipping, and exclusive deals.
          </p>

          {/* SOCIAL */}
          <div className="mt-5 flex gap-3">
            <a className="rounded-full bg-white/10 p-2 hover:bg-white/20">
              <FaFacebookF />
            </a>
            <a className="rounded-full bg-white/10 p-2 hover:bg-white/20">
              <FaInstagram />
            </a>
            <a className="rounded-full bg-white/10 p-2 hover:bg-white/20">
              <FaXTwitter />
            </a>
            <a className="rounded-full bg-white/10 p-2 hover:bg-white/20">
              <FaYoutube />
            </a>
          </div>

          {/* NEWSLETTER */}
          <form onSubmit={handleSubscribe} className="mt-6 flex gap-2">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter email"
              className="w-full rounded-full bg-white/5 px-4 py-2 text-sm text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-amber-300"
            />

            <button
              className="rounded-full bg-amber-300 px-5 text-sm font-bold text-black hover:bg-amber-200"
            >
              Join
            </button>
          </form>
        </div>

        {/* LINKS */}
        {footerLinks.map((section) => (
          <div key={section.title}>
            <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-300">
              <section.icon className="text-amber-300" />
              {section.title}
            </h3>

            <ul className="mt-4 space-y-3 text-sm text-gray-400">
              {section.links.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="hover:text-white transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

      </div>

      {/* BOTTOM */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-6 text-sm text-gray-400 md:flex-row md:justify-between">

          <p>© {new Date().getFullYear()} NovaCart. All rights reserved.</p>

          <div className="flex gap-5">
            <Link to="/privacy" className="hover:text-white">Privacy</Link>
            <Link to="/terms" className="hover:text-white">Terms</Link>
            <Link to="/support" className="hover:text-white">Support</Link>
          </div>

        </div>
      </div>

    </footer>
  )
}

export default Footer