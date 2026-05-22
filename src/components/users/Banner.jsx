import { Link } from "react-router-dom";
import { FaShoppingBag } from "react-icons/fa";

const Banner = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-sky-600 to-cyan-500 text-white">
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.5),transparent_35%)]" />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="lg:pr-10">
            <span className="inline-flex rounded-full bg-white/15 px-4 py-1 text-sm font-semibold tracking-tight text-white/90">
              Discover premium deals
            </span>
            <h1 className="mt-8 text-4xl font-bold tracking-tight sm:text-5xl">
              Shop smarter with the best ecommerce experience.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-white/90 sm:text-lg">
              Browse curated products, enjoy fast checkout, and get exclusive
              offers every day. Your next favorite purchase is just a click
              away.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-slate-950/20 transition hover:bg-slate-100"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                Register
              </Link>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-white/15 bg-white/10 p-5 shadow-lg shadow-black/10 backdrop-blur-md">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-white">
                  <FaShoppingBag className="h-6 w-6" />
                </div>
                <p className="mt-4 text-sm font-semibold text-white">
                  Wide product selection
                </p>
              </div>
              <div className="rounded-3xl border border-white/15 bg-white/10 p-5 shadow-lg shadow-black/10 backdrop-blur-md">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-white">
                  {/* <FaTruckFast className="h-6 w-6" /> */}
                </div>
                <p className="mt-4 text-sm font-semibold text-white">
                  Fast delivery options
                </p>
              </div>
              <div className="rounded-3xl border border-white/15 bg-white/10 p-5 shadow-lg shadow-black/10 backdrop-blur-md">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-white">
                  {/* <FaShieldCheck className="h-6 w-6" /> */}
                </div>
                <p className="mt-4 text-sm font-semibold text-white">
                  Secure checkout
                </p>
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 p-8 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
              <div className="space-y-6">
                <div className="rounded-3xl bg-white/10 p-6 shadow-inner shadow-white/5">
                  <p className="text-sm uppercase tracking-[0.3em] text-white/70">
                    Featured product
                  </p>
                  <h2 className="mt-4 text-3xl font-bold text-white">
                    Modern fashion essentials
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-white/80">
                    New arrivals curated for every style. Explore seasonal
                    favorites and save on today’s top picks.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl bg-white/10 p-5 text-white">
                    <p className="text-lg font-semibold">Up to 40% off</p>
                    <p className="mt-2 text-sm text-white/75">
                      Best deals on trending products.
                    </p>
                  </div>
                  <div className="rounded-3xl bg-white/10 p-5 text-white">
                    <p className="text-lg font-semibold">Free shipping</p>
                    <p className="mt-2 text-sm text-white/75">
                      Select orders delivered at no extra cost.
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
