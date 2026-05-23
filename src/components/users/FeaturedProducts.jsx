import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import ProductCard from "./ProductCard";
import { getAllProductsService } from "../../services/productService";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // FETCH PRODUCTS
  // =========================
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const data = await getAllProductsService();

        const result = data?.body ?? data;

        if (!Array.isArray(result)) {
          setProducts([]);
          return;
        }

        // Featured products
        setProducts(result.slice(0, 8));
      } catch (err) {
        console.error(err);
        setError("Failed to load featured products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // =========================
  // LOADING UI
  // =========================
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse overflow-hidden rounded-3xl bg-white p-5 shadow-sm"
          >
            <div className="h-64 rounded-2xl bg-slate-200" />

            <div className="mt-5 h-5 w-2/3 rounded-full bg-slate-200" />

            <div className="mt-3 h-4 w-1/2 rounded-full bg-slate-200" />

            <div className="mt-5 h-10 rounded-2xl bg-slate-200" />
          </div>
        ))}
      </div>
    );
  }

  // =========================
  // ERROR UI
  // =========================
  if (error) {
    return (
      <div className="rounded-3xl border border-red-200 bg-red-50 px-6 py-5 text-center text-sm text-red-600">
        {error}
      </div>
    );
  }

  // =========================
  // EMPTY UI
  // =========================
  if (products.length === 0) {
    return (
      <div className="rounded-3xl bg-white py-20 text-center shadow-sm">
        <h3 className="text-xl font-bold text-slate-900">
          No featured products found
        </h3>

        <p className="mt-3 text-sm text-slate-500">
          Please check again later.
        </p>
      </div>
    );
  }

  // =========================
  // MAIN UI
  // =========================
  return (
    <div>

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product.id || product._id}
            product={product}
          />
        ))}
      </div>

      {/* BUTTON */}
      <div className="mt-12 text-center">
        <Link
          to="/products"
          className="inline-flex items-center justify-center rounded-2xl bg-indigo-600 px-8 py-4 text-sm font-bold text-white transition hover:bg-indigo-700 hover:shadow-lg"
        >
          View All Products
        </Link>
      </div>
    </div>
  );
};

export default FeaturedProducts;