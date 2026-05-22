import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
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

  const price = Number(product?.price ?? 0).toFixed(2);
  const inStock = product?.stock > 0;

  const handleAddToCart = async () => {
    if (!token) {
      navigate("/login");
      return;
    }

    if (!inStock) return;

    try {
      setAdding(true);
      await addItem(product?.id || product?._id, 1);
      navigate("/cart");
    } catch (error) {
      console.error(error);
      alert("Unable to add item to cart.");
    } finally {
      setAdding(false);
    }
  };

  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
        <img
          src={imageUrl}
          alt={product?.name}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-700">
            {product?.categoryName || "General"}
          </span>
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] ${
              inStock
                ? "bg-emerald-100 text-emerald-700"
                : "bg-rose-100 text-rose-700"
            }`}
          >
            {inStock ? "In stock" : "Out of stock"}
          </span>
        </div>

        <h3 className="mt-4 text-xl font-semibold text-slate-900">
          {product?.name}
        </h3>
        <p className="mt-2 min-h-12 text-sm leading-6 text-slate-600">
          {product?.description ||
            product?.slug ||
            "A premium product with excellent quality."}
        </p>

        <div className="mt-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-2xl font-bold text-slate-900">${price}</p>
            <p className="text-sm text-slate-500">
              {product?.stock ? `${product.stock} available` : "Sold out"}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={`/products/${product?.id || product?._id}`}
              className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-100"
            >
              View details
            </Link>

            <button
              onClick={handleAddToCart}
              disabled={adding || !inStock}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                inStock
                  ? "bg-indigo-600 text-white hover:bg-indigo-700"
                  : "cursor-not-allowed bg-slate-200 text-slate-500"
              }`}
            >
              <FaShoppingCart />
              {adding ? "Adding..." : "Add to cart"}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
