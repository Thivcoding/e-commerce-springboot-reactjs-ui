
import Banner from "../../../components/users/Banner";
import Categories from "../../../components/users/Categories";
import FeaturedProducts from "../../../components/users/FeaturedProducts";
import NewArrivals from "../../../components/users/NewArrivals";
import WhyChooseUs from "../../../components/users/WhyChooseUs";

const Home = () => {
  return (
    <main className="min-h-screen bg-slate-50">

      {/* HERO SECTION */}
      <section>
        <Banner />
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600">
            Categories
          </p>

          <h2 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl">
            Shop By Category
          </h2>

          <p className="mt-4 text-sm text-slate-500 sm:text-base">
            Discover products from our most popular collections.
          </p>
        </div>

        <Categories />
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600">
              Featured
            </p>

            <h2 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl">
              Featured Products
            </h2>
          </div>

          <p className="max-w-xl text-sm leading-6 text-slate-500">
            Explore our hand-picked products with premium quality and modern
            design.
          </p>
        </div>

        <FeaturedProducts />
      </section>

      {/* NEW ARRIVALS */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-600">
              New Collection
            </p>

            <h2 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl">
              New Arrivals
            </h2>
          </div>

          <p className="max-w-xl text-sm leading-6 text-slate-500">
            Stay updated with our latest fashion and trending products.
          </p>
        </div>

        <NewArrivals />
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600">
              Why Choose Us
            </p>

            <h2 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl">
              Shopping Made Better
            </h2>

            <p className="mt-4 text-sm text-slate-500 sm:text-base">
              We provide the best shopping experience with quality products and
              trusted services.
            </p>
          </div>

          <WhyChooseUs />
        </div>
      </section>
    </main>
  );
};

export default Home;