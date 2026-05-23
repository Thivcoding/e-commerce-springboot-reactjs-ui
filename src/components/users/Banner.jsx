import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaShieldAlt,
  FaShoppingBag,
  FaStar,
  FaTruck,
} from "react-icons/fa";

const Banner = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-sky-900 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.22),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.18),transparent_24%)]" />
      <div className="absolute inset-0 opacity-15 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:52px_52px]" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-1 text-sm font-semibold tracking-[0.2em] text-amber-200">
              Premium storefront experience
            </span>

            <h1 className="mt-6 max-w-2xl text-4xl font-black tracking-tight sm:text-5xl lg:text-[2.85rem]">
              Shop the latest essentials with confidence and speed.
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-100 sm:text-lg">
              Discover featured products, enjoy fast checkout, and explore
              carefully curated categories tailored for your next purchase.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-300 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-amber-200"
              >
                Shop now
                <FaArrowRight className="text-xs" />
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                Create account
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">
                <FaShoppingBag className="text-amber-200" />
                <p className="mt-4 text-sm font-semibold text-white">
                  Curated product picks
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">
                <FaTruck className="text-sky-200" />
                <p className="mt-4 text-sm font-semibold text-white">
                  Fast delivery options
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">
                <FaShieldAlt className="text-emerald-200" />
                <p className="mt-4 text-sm font-semibold text-white">
                  Secure checkout
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-4 top-8 hidden h-24 w-24 rounded-full bg-amber-300/20 blur-2xl sm:block" />
            <div className="absolute -right-4 bottom-8 hidden h-24 w-24 rounded-full bg-sky-300/20 blur-2xl sm:block" />

            <div className="rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-[0_30px_80px_rgba(15,23,42,0.35)] backdrop-blur-xl sm:p-8">
              <div className="rounded-[1.5rem] bg-slate-950/60 p-5 sm:p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-slate-300">
                      Featured drop
                    </p>
                    <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
                      Everyday essentials, upgraded
                    </h2>
                  </div>
                  <span className="rounded-full bg-amber-300 px-3 py-1 text-sm font-bold text-slate-950">
                    New
                  </span>
                </div>

                <p className="mt-4 text-sm leading-7 text-slate-200 sm:text-base">
                  Browse seasonal favorites, best sellers, and limited-time
                  offers in a clean, modern shopping layout built for real
                  customers.
                </p>

                <div className="mt-6 rounded-[1.25rem] border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-300">Customer rating</p>
                      <p className="mt-1 flex items-center gap-2 text-lg font-bold text-white">
                        <FaStar className="text-amber-300" />
                        4.9/5
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-300">Free shipping</p>
                      <p className="mt-1 text-lg font-bold text-white">
                        On orders $50+
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl bg-white/5 p-4">
                    <p className="text-sm text-slate-300">Trending now</p>
                    <p className="mt-2 text-base font-semibold text-white">
                      Fashion & accessories
                    </p>
                  </div>
                  <div className="rounded-2xl bg-white/5 p-4">
                    <p className="text-sm text-slate-300">Best value</p>
                    <p className="mt-2 text-base font-semibold text-white">
                      Everyday deals
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
