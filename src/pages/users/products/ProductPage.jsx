// # Improved Ecommerce Product Page (React + TailwindCSS)

// jsx
import { useEffect, useMemo, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import ProductCard from "../../../components/users/ProductCard";
import { getAllProductsService } from "../../../services/productService";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("latest");
  const [error, setError] = useState(null);

  const location = useLocation();

  // =========================
  // LOAD PRODUCTS
  // =========================
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getAllProductsService();
        const result = data?.body ?? data;

        setProducts(Array.isArray(result) ? result : []);
      } catch (err) {
        console.error(err);
        setError("Unable to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // =========================
  // URL CATEGORY
  // =========================
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get("category");

    if (categoryParam) {
      setCategory(decodeURIComponent(categoryParam));
    } else {
      setCategory("All");
    }
  }, [location.search]);

  // =========================
  // DEBOUNCE SEARCH
  // =========================
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  // =========================
  // CATEGORIES
  // =========================
  const categories = useMemo(() => {
    return [
      "All",
      ...new Set(
        products.map((product) => product.categoryName).filter(Boolean),
      ),
    ];
  }, [products]);

  // =========================
  // FILTER + SORT
  // =========================
  const filteredProducts = useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase();

    let filtered = products.filter((product) => {
      const matchesSearch =
        !query ||
        product.name?.toLowerCase().includes(query) ||
        product.slug?.toLowerCase().includes(query) ||
        product.categoryName?.toLowerCase().includes(query);

      const matchesCategory =
        category === "All" || product.categoryName === category;

      return matchesSearch && matchesCategory;
    });

    switch (sort) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;

      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;

      case "name":
        filtered.sort((a, b) =>
          a.name.localeCompare(b.name),
        );
        break;

      default:
        break;
    }

    return filtered;
  }, [products, debouncedSearch, category, sort]);

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* TOP FILTERS */}
        <div className="mb-8 rounded-3xl bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            {/* SEARCH */}
            <div className="relative w-full lg:max-w-md">
              <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400">
                <FaSearch />
              </span>

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full rounded-2xl border border-slate-300 bg-white py-3 pl-12 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />
            </div>

            {/* SORT */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            >
              <option value="latest">Latest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name</option>
            </select>
          </div>

          {/* CATEGORY PILLS */}
          <div className="mt-5 flex flex-wrap gap-3">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                  category === item
                    ? "bg-indigo-600 text-white shadow-md"
                    : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* STATUS BAR */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-white px-6 py-4 shadow-sm">
          <p className="text-sm text-slate-600">
            Showing
            <span className="mx-1 font-bold text-slate-900">
              {filteredProducts.length}
            </span>
            products
          </p>

          <p className="text-sm text-slate-500">
            {loading
              ? "Loading products..."
              : filteredProducts.length === 0
              ? "No products matched"
              : "Browse our latest collection"}
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-8 rounded-3xl border border-red-200 bg-red-50 px-6 py-5 text-sm text-red-700 shadow-sm">
            {error}
          </div>
        )}

        {/* PRODUCTS GRID */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {loading
            ? Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse overflow-hidden rounded-3xl border border-slate-200 bg-white"
                >
                  <div className="h-64 w-full bg-slate-200" />

                  <div className="p-5">
                    <div className="mb-3 h-4 w-24 rounded-full bg-slate-200" />
                    <div className="mb-3 h-5 w-3/4 rounded-full bg-slate-200" />
                    <div className="mb-5 h-4 w-1/2 rounded-full bg-slate-200" />
                    <div className="h-10 w-full rounded-2xl bg-slate-200" />
                  </div>
                </div>
              ))
            : filteredProducts.map((product) => (
                <ProductCard
                  key={product.id || product._id}
                  product={product}
                />
              ))}
        </div>

        {/* EMPTY STATE */}
        {!loading && filteredProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="rounded-full bg-slate-100 px-6 py-4 text-4xl">
              🛍️
            </div>

            <h3 className="mt-6 text-2xl font-bold text-slate-900">
              No products found
            </h3>

            <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
              Try changing your search keywords or browse another category.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
              className="mt-6 rounded-2xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;

