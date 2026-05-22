import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaMinus, FaPlus, FaShoppingBag, FaTrash } from "react-icons/fa";
import { useAuth } from "../../../hooks/useAuth";
import { useCart } from "../../../hooks/useCart";

const CartPage = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const {
    cartItems,
    subtotal,
    totalItems,
    updateQuantity,
    removeItem,
    clearCart,
    loading,
  } = useCart();
  const [processing, setProcessing] = useState(false);

  const hasItems = cartItems.length > 0;

  const handleQuantity = async (itemId, value) => {
    const next = Number(value);

    if (next <= 0) {
      await removeItem(itemId);
      return;
    }

    await updateQuantity(itemId, next);
  };

  const handleClear = async () => {
    setProcessing(true);
    try {
      await clearCart();
    } finally {
      setProcessing(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl rounded-3xl bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">
            Your cart is empty
          </h1>
          <p className="mt-3 text-sm text-slate-600">
            Please login to view and manage your cart.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Link
              to="/login"
              className="rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white"
            >
              Login
            </Link>
            <Link
              to="/products"
              className="rounded-full bg-slate-100 px-5 py-2.5 text-sm font-semibold text-slate-700"
            >
              Browse products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-indigo-600">
              Cart
            </p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">
              Your shopping cart
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              {totalItems} item{totalItems === 1 ? "" : "s"} ready for checkout.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/products"
              className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm"
            >
              Continue shopping
            </Link>
            <button
              onClick={handleClear}
              disabled={!hasItems || processing || loading}
              className="rounded-full bg-rose-100 px-5 py-2.5 text-sm font-semibold text-rose-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Clear cart
            </button>
          </div>
        </div>

        {loading ? (
          <div className="rounded-3xl bg-white p-8 text-center shadow-sm">
            <p className="text-sm text-slate-600">Loading cart...</p>
          </div>
        ) : !hasItems ? (
          <div className="rounded-3xl bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
              <FaShoppingBag />
            </div>
            <h2 className="mt-4 text-xl font-semibold text-slate-900">
              Your cart is empty
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Add products to your cart to start checking out.
            </p>
            <Link
              to="/products"
              className="mt-6 inline-flex rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white"
            >
              Browse products
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="rounded-3xl bg-white p-4 shadow-sm sm:p-5"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="h-24 w-24 rounded-2xl object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p className="text-sm text-indigo-600">
                            {item.categoryName}
                          </p>
                          <h2 className="text-lg font-semibold text-slate-900">
                            {item.name}
                          </h2>
                        </div>
                        <p className="text-lg font-bold text-slate-900">
                          ${Number(item.subtotal || 0).toFixed(2)}
                        </p>
                      </div>

                      <div className="mt-4 flex flex-wrap items-center gap-3">
                        <div className="flex items-center rounded-full border border-slate-200">
                          <button
                            onClick={() =>
                              handleQuantity(item.id, item.quantity - 1)
                            }
                            className="px-3 py-2 text-slate-700"
                            aria-label={`Decrease quantity for ${item.name}`}
                          >
                            <FaMinus size={12} />
                          </button>
                          <input
                            type="number"
                            min={1}
                            value={item.quantity}
                            onChange={(e) =>
                              handleQuantity(item.id, e.target.value)
                            }
                            className="w-16 border-x border-slate-200 px-2 py-2 text-center outline-none"
                          />
                          <button
                            onClick={() =>
                              handleQuantity(item.id, item.quantity + 1)
                            }
                            className="px-3 py-2 text-slate-700"
                            aria-label={`Increase quantity for ${item.name}`}
                          >
                            <FaPlus size={12} />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700"
                        >
                          <FaTrash />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <aside className="rounded-3xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">
                Order summary
              </h2>
              <div className="mt-4 space-y-3 text-sm text-slate-600">
                <div className="flex justify-between">
                  <span>Items</span>
                  <span>{totalItems}</span>
                </div>
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${Number(subtotal || 0).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
              </div>
              <div className="mt-4 border-t pt-4">
                <div className="flex justify-between text-lg font-bold text-slate-900">
                  <span>Total</span>
                  <span>${Number(subtotal || 0).toFixed(2)}</span>
                </div>
              </div>
              <button
                onClick={() => navigate("/checkout")}
                className="mt-6 w-full rounded-full bg-indigo-600 px-4 py-3 text-sm font-semibold text-white"
              >
                Proceed to checkout
              </button>
              <p className="mt-3 text-center text-xs text-slate-500">
                Secure checkout and fast delivery.
              </p>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
