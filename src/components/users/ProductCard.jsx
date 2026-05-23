import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaEye } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const { addItem } = useCart();
  const [adding, setAdding] = useState(false);

  const imageUrl =
    product?.images?.[0]?.imageUrl ||
    "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80";

  const price = Number(product?.price ?? 0);
  const inStock = product?.stock > 0;

  const handleAddToCart = async () => {
    if (!token) return navigate("/login");
    if (!inStock) return;

    try {
      setAdding(true);
      await addItem(product?.id || product?._id, 1);
    } catch (err) {
      console.error(err);
      alert("Failed to add to cart");
    } finally {
      setAdding(false);
    }
  };

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">

      {/* IMAGE */}
      <div className="relative aspect-square overflow-hidden bg-slate-100">
        <img
          src={imageUrl}
          alt={product?.name}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
        />

        {/* QUICK ACTION */}
        <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/0 opacity-0 transition group-hover:bg-black/30 group-hover:opacity-100">
          <Link
            to={`/products/${product?.id || product?._id}`}
            className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-slate-100"
          >
            <FaEye className="inline mr-1" />
            View
          </Link>
        </div>

        {/* STOCK BADGE */}
        <div className="absolute left-3 top-3">
          <span
            className={`rounded-full px-3 py-1 text-xs font-bold ${
              inStock
                ? "bg-emerald-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            {inStock ? "In Stock" : "Sold Out"}
          </span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-4">

        {/* CATEGORY */}
        <p className="text-xs font-semibold uppercase tracking-widest text-indigo-500">
          {product?.categoryName || "General"}
        </p>

        {/* TITLE */}
        <h3 className="mt-1 line-clamp-2 text-base font-semibold text-slate-900">
          {product?.name}
        </h3>

        {/* DESCRIPTION */}
        <p className="mt-1 line-clamp-2 text-sm text-slate-500">
          {product?.description || "High quality product with best value."}
        </p>

        {/* PRICE */}
        <div className="mt-3 flex items-end justify-between">
          <div>
            <p className="text-xl font-bold text-slate-900">
              ${price.toFixed(2)}
            </p>
            <p className="text-xs text-slate-500">
              {product?.stock || 0} items left
            </p>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="mt-4 flex gap-2">
          <button
            onClick={handleAddToCart}
            disabled={adding || !inStock}
            className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition ${
              inStock
                ? "bg-indigo-600 text-white hover:bg-indigo-700"
                : "cursor-not-allowed bg-slate-200 text-slate-500"
            }`}
          >
            <FaShoppingCart />
            {adding ? "Adding..." : "Add to Cart"}
          </button>

          <Link
            to={`/products/${product?.id || product?._id}`}
            className="flex items-center justify-center rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            View
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;