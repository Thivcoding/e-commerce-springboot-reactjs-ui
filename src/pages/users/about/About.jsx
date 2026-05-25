import React from "react";
import {
  FaShippingFast,
  FaHeadset,
  FaLock,
  FaTags,
} from "react-icons/fa";

const About = () => {
  const features = [
    {
      id: 1,
      icon: <FaShippingFast size={35} />,
      title: "Fast Delivery",
      desc: "We provide fast and secure delivery for all your orders.",
    },
    {
      id: 2,
      icon: <FaHeadset size={35} />,
      title: "24/7 Support",
      desc: "Our support team is always ready to help you anytime.",
    },
    {
      id: 3,
      icon: <FaLock size={35} />,
      title: "Secure Payment",
      desc: "Your payment information is always safe and protected.",
    },
    {
      id: 4,
      icon: <FaTags size={35} />,
      title: "Best Offers",
      desc: "Enjoy the best discounts and exclusive offers every day.",
    },
  ];

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      {/* HERO SECTION */}
      <section className="bg-[#0f172a] text-white py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-yellow-400 uppercase tracking-[4px] font-semibold">
            About Us
          </span>

          <h1 className="text-4xl md:text-6xl font-bold mt-4 mb-6 leading-tight">
            Modern Ecommerce
            <span className="text-yellow-400"> Experience</span>
          </h1>

          <p className="max-w-3xl mx-auto text-gray-300 text-lg leading-8">
            We provide high-quality products, affordable prices, and trusted
            services to create the best online shopping experience for everyone.
          </p>
        </div>
      </section>

      {/* ABOUT CONTENT */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-14 items-center">
        {/* IMAGE */}
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?q=80&w=1200&auto=format&fit=crop"
            alt="About Ecommerce"
            className="rounded-3xl shadow-2xl w-full h-[500px] object-cover"
          />

          <div className="absolute -bottom-6 -right-6 bg-yellow-400 text-black px-6 py-4 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold">10K+</h3>
            <p className="text-sm font-medium">Happy Customers</p>
          </div>
        </div>

        {/* TEXT */}
        <div>
          <span className="text-yellow-500 font-semibold uppercase tracking-[3px]">
            Who We Are
          </span>

          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6 text-gray-900 leading-tight">
            Trusted & Secure Online Shopping
          </h2>

          <p className="text-gray-600 leading-8 mb-5 text-lg">
            Our ecommerce platform is designed to make shopping easier, faster,
            and more enjoyable. We offer premium quality products with trusted
            services and secure payment systems.
          </p>

          <p className="text-gray-600 leading-8 mb-8 text-lg">
            Customer satisfaction is our priority. We focus on fast delivery,
            excellent support, and affordable prices to provide the best
            shopping experience.
          </p>

          <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg">
            Explore Products
          </button>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-yellow-500 uppercase tracking-[3px] font-semibold">
              Our Features
            </span>

            <h2 className="text-4xl font-bold text-gray-900 mt-4">
              Why Choose Us
            </h2>

            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              We provide the best ecommerce services with secure payments,
              quality products, and excellent customer support.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((item) => (
              <div
                key={item.id}
                className="bg-[#f8fafc] p-8 rounded-3xl border border-gray-100 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 text-center"
              >
                <div className="w-20 h-20 mx-auto rounded-full bg-yellow-100 flex items-center justify-center text-yellow-500 mb-6">
                  {item.icon}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {item.title}
                </h3>

                <p className="text-gray-600 leading-7">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-[#0f172a] py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          <div>
            <h2 className="text-4xl font-bold text-yellow-400">10K+</h2>
            <p className="text-gray-300 mt-3">Happy Customers</p>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-yellow-400">500+</h2>
            <p className="text-gray-300 mt-3">Products</p>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-yellow-400">99%</h2>
            <p className="text-gray-300 mt-3">Positive Reviews</p>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-yellow-400">24/7</h2>
            <p className="text-gray-300 mt-3">Support</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#f8fafc]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-yellow-500 uppercase tracking-[3px] font-semibold">
            Start Shopping
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-6">
            Discover Amazing Products
          </h2>

          <p className="text-gray-600 text-lg leading-8 mb-10">
            Explore high-quality products with affordable prices and trusted
            services designed for modern shopping experiences.
          </p>

          <button className="bg-yellow-400 hover:bg-yellow-500 transition-all duration-300 text-black px-10 py-4 rounded-full font-bold shadow-lg">
            Shop Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;