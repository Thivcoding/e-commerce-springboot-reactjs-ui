import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  FaShoppingCart,
  FaStar,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

import {
  getProductByIdService,
  getAllProductsService,
} from "../../../services/productService";

import ProductCard from "../../../components/users/ProductCard";
import useCart from "../../../hooks/useCart";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [quantity, setQuantity] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { addItem } = useCart();

  // =========================
  // FETCH PRODUCT
  // =========================
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        const data = await getProductByIdService(id);

        setProduct(data?.body ?? data);
      } catch (err) {
        console.error(err);
        setError("Failed to load product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // =========================
  // FETCH RELATED PRODUCTS
  // =========================
  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const data = await getAllProductsService();

        const list = data?.body ?? data;

        if (!Array.isArray(list)) return;

        const relatedProducts = list.filter(
          (p) =>
            (p.id || p._id) !== (product?.id || product?._id) &&
            (p.categoryId === product?.categoryId ||
              p.categoryName === product?.categoryName),
        );

        setRelated(relatedProducts.slice(0, 4));
      } catch (err) {
        console.error(err);
      }
    };

    if (product) {
      fetchRelated();
    }
  }, [product]);

  // =========================
  // LOADING / ERROR
  // =========================
  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="animate-pulse rounded-3xl bg-slate-200 h-[600px]" />

          <div>
            <div className="mb-4 h-6 w-40 rounded-full bg-slate-200" />
            <div className="mb-6 h-12 w-3/4 rounded-full bg-slate-200" />
            <div className="mb-4 h-8 w-32 rounded-full bg-slate-200" />
            <div className="mb-4 h-4 w-full rounded-full bg-slate-200" />
            <div className="mb-4 h-4 w-5/6 rounded-full bg-slate-200" />
            <div className="h-14 w-52 rounded-2xl bg-slate-200" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 text-center text-red-500">
        {error}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="py-20 text-center">
        Product not found
      </div>
    );
  }

  // =========================
  // DATA
  // =========================
  const images = product?.images || [];

  const safeIndex = images.length
    ? Math.min(currentIndex, images.length - 1)
    : 0;

  const imageUrl =
    images?.[safeIndex]?.imageUrl ||
    product?.images?.[0]?.imageUrl ||
    "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80";

  const inStock = product?.stock > 0;

  // =========================
  // IMAGE NAVIGATION
  // =========================
  const prevImage = () => {
    if (!images.length) return;

    setCurrentIndex(
      (prev) => (prev - 1 + images.length) % images.length,
    );
  };

  const nextImage = () => {
    if (!images.length) return;

    setCurrentIndex(
      (prev) => (prev + 1) % images.length,
    );
  };

  // =========================
  // ADD TO CART
  // =========================
  const handleAddToCart = async () => {
    try {
      await addItem(
        product?.id || product?._id,
        quantity,
      );

      alert("Added to cart");
    } catch (err) {
      console.error(err);
      alert("Failed to add cart");
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-10">

        {/* BREADCRUMB */}
        <div className="mb-8 text-sm text-slate-500">
          <Link
            to="/"
            className="hover:text-indigo-600"
          >
            Home
          </Link>

          <span className="mx-2">/</span>

          <Link
            to="/products"
            className="hover:text-indigo-600"
          >
            Products
          </Link>

          <span className="mx-2">/</span>

          <span className="text-slate-900">
            {product?.name}
          </span>
        </div>

        {/* MAIN SECTION */}
        <div className="grid gap-10 lg:grid-cols-2">

          {/* LEFT */}
          <div className="flex gap-4">

            {/* THUMBNAILS */}
            <div className="hidden md:flex flex-col gap-3">
              {images.length > 0 ? (
                images.map((img, idx) => (
                  <button
                    key={img.id || idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`group overflow-hidden rounded-2xl border-2 transition ${
                      idx === currentIndex
                        ? "border-indigo-600 shadow-lg"
                        : "border-slate-200 hover:border-indigo-300"
                    }`}
                  >
                    <img
                      src={img.imageUrl}
                      alt={`thumb-${idx}`}
                      className="h-20 w-20 object-cover"
                    />
                  </button>
                ))
              ) : (
                <div className="h-20 w-20 rounded-2xl bg-slate-100" />
              )}
            </div>

            {/* MAIN IMAGE */}
            <div className="relative flex-1 overflow-hidden rounded-3xl bg-white shadow-lg">

              <img
                src={imageUrl}
                alt={product?.name}
                className="mx-auto max-h-[650px] w-full object-cover transition duration-500 hover:scale-105"
              />

              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 shadow-lg transition hover:bg-white"
                  >
                    <FaChevronLeft />
                  </button>

                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 shadow-lg transition hover:bg-white"
                  >
                    <FaChevronRight />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* RIGHT */}
          <div className="sticky top-24 h-fit rounded-3xl bg-white p-8 shadow-sm">

            {/* BADGES */}
            <div className="mb-5 flex flex-wrap gap-2">
              <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold text-indigo-700">
                {product?.categoryName || "General"}
              </span>

              {inStock ? (
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
                  In Stock
                </span>
              ) : (
                <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-700">
                  Sold Out
                </span>
              )}
            </div>

            {/* TITLE */}
            <h1 className="text-4xl font-black leading-tight text-slate-900">
              {product?.name}
            </h1>

            {/* RATING */}
            <div className="mt-4 flex items-center gap-3">
              <div className="flex text-yellow-400">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>

              <span className="text-sm text-slate-500">
                (120 reviews)
              </span>
            </div>

            {/* PRICE */}
            <div className="mt-6 flex items-end gap-3">
              <p className="text-4xl font-black text-slate-900">
                $
                {Number(product?.price ?? 0).toFixed(2)}
              </p>

              <span className="text-lg text-slate-400 line-through">
                $199.99
              </span>
            </div>

            {/* STOCK */}
            <p className="mt-3 text-sm text-slate-500">
              {product?.stock
                ? `${product.stock} items available`
                : "Currently unavailable"}
            </p>

            {/* DESCRIPTION */}
            <div className="mt-8">
              <h3 className="text-lg font-bold text-slate-900">
                Description
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                {product?.description ||
                  "Premium quality product with excellent features and modern design."}
              </p>
            </div>

            {/* QUANTITY */}
            <div className="mt-8">
              <h4 className="mb-3 text-sm font-semibold text-slate-700">
                Quantity
              </h4>

              <div className="flex items-center overflow-hidden rounded-2xl border border-slate-300 w-fit">
                <button
                  onClick={() =>
                    setQuantity((prev) =>
                      Math.max(1, prev - 1),
                    )
                  }
                  className="px-5 py-3 transition hover:bg-slate-100"
                >
                  -
                </button>

                <span className="w-16 text-center font-bold">
                  {quantity}
                </span>

                <button
                  onClick={() =>
                    setQuantity((prev) => prev + 1)
                  }
                  className="px-5 py-3 transition hover:bg-slate-100"
                >
                  +
                </button>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="mt-8 flex flex-wrap gap-4">

              <button
                onClick={handleAddToCart}
                disabled={!inStock}
                className={`inline-flex items-center justify-center gap-3 rounded-2xl px-8 py-4 text-sm font-bold transition ${
                  inStock
                    ? "bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg"
                    : "cursor-not-allowed bg-slate-200 text-slate-500"
                }`}
              >
                <FaShoppingCart />
                Add To Cart
              </button>

              <button
                onClick={() => navigate("/checkout")}
                className="rounded-2xl border border-slate-300 px-8 py-4 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
              >
                Buy Now
              </button>
            </div>

            {/* BACK */}
            <Link
              to="/products"
              className="mt-6 inline-block text-sm font-semibold text-indigo-600 hover:text-indigo-700"
            >
              ← Back to products
            </Link>
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        {related.length > 0 && (
          <section className="mt-20">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600">
                  Related
                </p>

                <h2 className="mt-2 text-3xl font-black text-slate-900">
                  You may also like
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((rp) => (
                <ProductCard
                  key={rp.id || rp._id}
                  product={rp}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetail; 