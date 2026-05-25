import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { useCart } from "../../../hooks/useCart";

import { createOrderService } from "../../../services/orderService";
import { createPaymentService } from "../../../services/paymentService";

const initialForm = {
  fullName: "",
  phone: "",
  address: "",
  city: "",
  country: "",
};

const unwrap = (res) => res?.body ?? res;

const PAYMENT_METHODS = ["CASH", "BAKONG"];

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { token, user } = useAuth();

  const {
    cartItems,
    subtotal,
    totalItems,
    clearCart,
    loading,
    cartId,
  } = useCart();

  const [form, setForm] = useState(initialForm);
  const [paymentMethod, setPaymentMethod] = useState("CASH");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // fill user info
  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        fullName: user.name || "",
        phone: user.phone || "",
      }));
    }
  }, [user]);

  // auth guard
  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const buildOrderRequest = () => ({
    cartId,
    fullName: form.fullName,
    phone: form.phone,
    addressLine: form.address,
    city: form.city,
    country: form.country,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cartItems.length) {
      setError("Cart is empty");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      // =========================
      // 1. CREATE ORDER
      // =========================
      const orderRes = unwrap(await createOrderService(buildOrderRequest()));

      const orderId = orderRes?.id || orderRes?.orderId;
      const orderTotal = orderRes?.totalPrice || subtotal;

      if (!orderId) throw new Error("Order creation failed");

      // =========================
      // 2. PAYMENT CREATE (BAKONG or CASH)
      // =========================
      const paymentRes = unwrap(
        await createPaymentService({
          orderId,
          amount: orderTotal,
          currency: paymentMethod === "BAKONG" ? "KHR" : "USD",
          paymentMethod,
          paymentStatus: paymentMethod === "CASH" ? "PAID" : "PENDING",
        })
      );

      if (!paymentRes?.id) throw new Error("Payment failed");

      // =========================
      // 3. USE CASE (CASH + BAKONG)
      // =========================
      switch (paymentMethod) {
        case "CASH":
          await clearCart();
          navigate("/my-orders");
          break;

        case "BAKONG":
          await clearCart();
          navigate(`/payment/bakong/${paymentRes.id}`);
          break;

        default:
          throw new Error("Invalid payment method");
      }
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Checkout failed"
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (!token) return null;

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-6xl">

        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Checkout</h1>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">

          {/* FORM */}
          <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-6 shadow">

            <div className="grid gap-4 sm:grid-cols-2">

              <input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Full name"
                className="border p-3 rounded-xl"
                required
              />

              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="border p-3 rounded-xl"
                required
              />

              <input
                name="country"
                value={form.country}
                onChange={handleChange}
                placeholder="Country"
                className="border p-3 rounded-xl"
                required
              />

              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="City"
                className="border p-3 rounded-xl"
                required
              />

              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Address"
                className="border p-3 rounded-xl sm:col-span-2"
                required
              />
            </div>

            {/* PAYMENT METHODS */}
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Payment Method</h3>

              <div className="flex gap-3 flex-wrap">
                {PAYMENT_METHODS.map((m) => (
                  <label
                    key={m}
                    className="flex items-center gap-2 border px-4 py-2 rounded-full"
                  >
                    <input
                      type="radio"
                      value={m}
                      checked={paymentMethod === m}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    {m}
                  </label>
                ))}
              </div>
            </div>

            {/* ERROR */}
            {error && (
              <p className="mt-4 text-red-600">{error}</p>
            )}

            {/* BUTTONS */}
            <div className="mt-6 flex gap-3">
              <button
                disabled={submitting || loading}
                className="bg-indigo-600 text-white px-5 py-3 rounded-full disabled:opacity-50"
              >
                {submitting ? "Processing..." : "Place Order"}
              </button>

              <Link
                to="/cart"
                className="bg-gray-100 px-5 py-3 rounded-full"
              >
                Back
              </Link>
            </div>

          </form>

          {/* SUMMARY */}
          <aside className="bg-white p-6 rounded-3xl shadow">

            <h2 className="font-bold text-lg">Order Summary</h2>

            <div className="mt-4 space-y-2 text-sm">

              <div className="flex justify-between">
                <span>Items</span>
                <span>{totalItems}</span>
              </div>

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>

              <hr />

              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

            </div>

          </aside>

        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;