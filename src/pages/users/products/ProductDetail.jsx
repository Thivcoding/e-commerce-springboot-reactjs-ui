import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  getProductByIdService,
  getAllProductsService,
} from "../../../services/productService";
import { FaShoppingCart } from "react-icons/fa";
import ProductCard from "../../../components/users/ProductCard";
import useCart from "../../../hooks/useCart";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { addItem } = useCart();

  const images = product?.images || [];
  const [related, setRelated] = useState([]);

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const all = await getAllProductsService();
        const list = all?.body ?? all;

        if (!list || !Array.isArray(list)) return;
        const relatedList = list.filter(
          (p) =>
            (p.id || p._id) !== (product?.id || product?._id) &&
            (p.categoryId === product?.categoryId ||
              p.categoryName === product?.categoryName),
        );
        setRelated(relatedList.slice(0, 4));
      } catch (e) {
        console.error(e);
      }
    };

    if (product) fetchRelated();
  }, [product]);

//   console.log(related);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await getProductByIdService(id);
        setProduct(data.body ?? data);
      } catch (err) {
        console.error(err);
        setError("Failed to load product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Use a safe index derived value so we don't need to synchronously reset state
  const safeIndex = images.length
    ? Math.min(currentIndex, images.length - 1)
    : 0;

  const handleAddToCart = async () => {
    if (!product?.id) return;

    try {
      await addItem(product.id, quantity);

      alert("Added to cart");
    } catch (err) {
      console.error(err);
      alert("Failed to add cart");
    }
  };

  if (loading) return <div className="p-6">Loading product...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!product) return <div className="p-6">Product not found</div>;

  const imageUrl =
    images?.[safeIndex]?.imageUrl ||
    product?.images?.[0]?.imageUrl ||
    "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80";

  const prevImage = () =>
    images.length &&
    setCurrentIndex(() => (safeIndex - 1 + images.length) % images.length);
  const nextImage = () =>
    images.length && setCurrentIndex(() => (safeIndex + 1) % images.length);

  return (
    <div className="max-w-6xl mx-auto p-6 py-16">
      <div className="grid gap-6 md:grid-cols-2 items-start">
        <div className="flex gap-4">
          <div className="hidden md:flex flex-col gap-3">
            {images.length > 0 ? (
              images.map((img, idx) => (
                <button
                  key={img.id || img.publicId || idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`mb-2 block h-20 w-20 overflow-hidden rounded-xl border ${
                    idx === currentIndex
                      ? "border-indigo-500"
                      : "border-slate-200"
                  }`}
                >
                  <img
                    src={img.imageUrl}
                    alt={`thumb-${idx}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))
            ) : (
              <div className="h-20 w-20 rounded-xl bg-slate-100" />
            )}
          </div>

          <div className="flex-1 rounded-3xl bg-white p-4 shadow relative">
            <img
              src={imageUrl}
              alt={product.name}
              className="w-full rounded-2xl object-cover max-h-140 mx-auto"
            />

            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow"
                  aria-label="previous"
                >
                  ‹
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow"
                  aria-label="next"
                >
                  ›
                </button>
              </>
            )}
          </div>
        </div>

        <div className="p-4">
          <h1 className="text-2xl font-bold text-slate-900">{product.name}</h1>
          <p className="mt-2 text-sm text-slate-600">
            {product.categoryName || "General"}
          </p>
          <p className="mt-4 text-3xl font-bold text-slate-900">
            ${Number(product.price ?? 0).toFixed(2)}
          </p>
          <p className="mt-2 text-sm text-slate-500">
            {product.stock ? `${product.stock} available` : "Sold out"}
          </p>

          <div className="mt-6 flex items-center gap-3">
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-24 rounded-md border px-3 py-2"
            />

            <button
              onClick={handleAddToCart}
              className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              <FaShoppingCart />
              Add to cart
            </button>

            <Link to="/products" className="ml-2 text-sm text-indigo-600">
              Back to products
            </Link>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold">Description</h3>
            <p className="mt-2 text-sm text-slate-600">{product.description}</p>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-4 text-xl font-semibold">Related products</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((rp) => (
              <div key={rp.id || rp._id}>
                <ProductCard product={rp} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;
