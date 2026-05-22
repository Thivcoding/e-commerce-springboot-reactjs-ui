import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { useCart } from "../../../hooks/useCart";
import { createOrderService } from "../../../services/orderService";

const initialForm = {
  fullName: "",
  phone: "",
  address: "",
  city: "",
  country: "",
};

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { token, user } = useAuth();
  const { cartItems, subtotal, totalItems, clearCart, loading } = useCart();
  const [form, setForm] = useState(initialForm);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        fullName: user.name || prev.fullName,
        phone: user.phone || prev.phone,
      }));
    }
  }, [user]);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [navigate, token]);

  const canCheckout = useMemo(() => cartItems.length > 0, [cartItems.length]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!canCheckout) {
      setError("Your cart is empty.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const orderItems = cartItems.map((item) => ({
        productId: item.productId,
        productName: item.name,
        quantity: item.quantity,
        price: item.price,
        totalPrice: item.subtotal,
      }));

      await createOrderService({
        userId: user?.id,
        userName: form.fullName || user?.name,
        email: user?.email,
        fullName: form.fullName,
        phone: form.phone,
        addressLine: form.address,
        city: form.city,
        country: form.country,
        paymentMethod,
        totalPrice: subtotal,
        items: orderItems,
        orderItems,
      });

      await clearCart();
      navigate("/my-orders");
    } catch (err) {
      console.error(err);
      setError("Unable to place order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!token) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <p className="text-sm uppercase tracking-[0.3em] text-indigo-600">Checkout</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">Complete your order</h1>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
          <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="sm:col-span-2">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Full name</span>
                <input
                  required
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3"
                />
              </label>
              <label>
                <span className="mb-2 block text-sm font-semibold text-slate-700">Phone</span>
                <input
                  required
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3"
                />
              </label>
              <label>
                <span className="mb-2 block text-sm font-semibold text-slate-700">Country</span>
                <input
                  required
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3"
                />
              </label>
              <label className="sm:col-span-2">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Address</span>
                <input
                  required
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3"
                />
              </label>
              <label>
                <span className="mb-2 block text-sm font-semibold text-slate-700">City</span>
                <input
                  required
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3"
                />
              </label>
            </div>

            <div className="mt-6">
              <p className="mb-2 text-sm font-semibold text-slate-700">Payment method</p>
              <div className="flex flex-wrap gap-3">
                {['COD', 'CARD', 'BANK'].map((method) => (
                  <label key={method} className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method}
                      checked={paymentMethod === method}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    {method}
                  </label>
                ))}
              </div>
            </div>

            {error && <p className="mt-4 rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>}

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={submitting || loading || !canCheckout}
                className="rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Placing order..." : "Place order"}
              </button>
              <Link to="/cart" className="rounded-full bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700">
                Back to cart
              </Link>
            </div>
          </form>

          <aside className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Order summary</h2>
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
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
