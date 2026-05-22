import { useEffect, useMemo, useState } from "react";
import { FaSearch } from "react-icons/fa";
import ProductCard from "../../../components/users/ProductCard";
import { getAllProductsService } from "../../../services/productService";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getAllProductsService();
        const result = data?.body ?? data;
        setProducts(Array.isArray(result) ? result : []);
      } catch (err) {
        setError("Unable to load products. Please try again later.");
        console.error("Product load error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const categories = useMemo(() => {
    return [
      "All",
      ...new Set(
        products.map((product) => product.categoryName).filter(Boolean),
      ),
    ];
  }, [products]);

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        !query ||
        product.name?.toLowerCase().includes(query) ||
        product.slug?.toLowerCase().includes(query) ||
        product.categoryName?.toLowerCase().includes(query);

      const matchesCategory =
        category === "All" || product.categoryName === category;

      return matchesSearch && matchesCategory;
    });
  }, [products, search, category]);

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-indigo-600">
              Shop
            </p>
            <h1 className="mt-3 text-4xl font-bold text-slate-900">
              Browse products
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              Explore our product catalog, filter by category, and find the best
              deals for your needs.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:w-105">
            <label className="relative block">
              <span className="sr-only">Search products</span>
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
                <FaSearch />
              </span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full rounded-3xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-sm shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-3xl border border-slate-300 bg-white py-3 px-4 text-sm shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              {categories.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        {error && (
          <div className="rounded-3xl border border-red-200 bg-red-50 px-6 py-5 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-3xl bg-white px-5 py-4 shadow-sm">
          <p className="text-sm text-slate-600">
            Showing{" "}
            <span className="font-semibold text-slate-900">
              {filteredProducts.length}
            </span>{" "}
            products
          </p>
          <p className="text-sm text-slate-500">
            {loading
              ? "Loading products..."
              : filteredProducts.length === 0
                ? "No products matched"
                : ""}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse rounded-3xl border border-slate-200 bg-white p-6"
                >
                  <div className="mb-5 h-48 w-full rounded-3xl bg-slate-200" />
                  <div className="h-4 w-3/4 rounded-full bg-slate-200 mb-3" />
                  <div className="h-4 w-1/2 rounded-full bg-slate-200 mb-4" />
                  <div className="h-10 w-full rounded-full bg-slate-200" />
                </div>
              ))
            : filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
