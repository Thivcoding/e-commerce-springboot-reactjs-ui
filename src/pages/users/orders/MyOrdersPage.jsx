import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyOrdersService } from "../../../services/orderService";
import { getMyPaymentsService } from "../../../services/paymentService";

const formatPrice = (value) => `$${Number(value || 0).toFixed(2)}`;

const formatDate = (value) => {
  if (!value) return "-";

  return new Date(value).toLocaleString();
};

const statusClass = (status) => {
  switch (status) {
    case "PAID":
      return "bg-blue-100 text-blue-700";
    case "SHIPPED":
      return "bg-purple-100 text-purple-700";
    case "DELIVERED":
      return "bg-green-100 text-green-700";
    case "CANCELLED":
      return "bg-red-100 text-red-700";
    default:
      return "bg-yellow-100 text-yellow-700";
  }
};

const paymentStatusClass = (status) => {
  switch (status) {
    case "PAID":
      return "bg-emerald-100 text-emerald-700";
    case "FAILED":
      return "bg-red-100 text-red-700";
    case "REFUNDED":
      return "bg-purple-100 text-purple-700";
    default:
      return "bg-amber-100 text-amber-700";
  }
};

const unwrapResponse = (response) => response?.body ?? response;

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true);

        const [ordersResponse, paymentsResponse] = await Promise.all([
          getMyOrdersService(),
          getMyPaymentsService(),
        ]);

        const ordersResult = unwrapResponse(ordersResponse);
        const paymentsResult = unwrapResponse(paymentsResponse);

        setOrders(Array.isArray(ordersResult) ? ordersResult : []);
        setPayments(Array.isArray(paymentsResult) ? paymentsResult : []);
      } catch (err) {
        console.error(err);
        setError("Unable to load your orders right now.");
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  const paymentByOrderId = new Map(
    payments.map((payment) => [String(payment.orderId), payment]),
  );

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6">
          <p className="text-sm uppercase tracking-[0.3em] text-indigo-600">
            Orders
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">My orders</h1>
          <p className="mt-2 text-sm text-slate-600">
            Track your recent purchases and order status.
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        )}

        {loading ? (
          <div className="rounded-3xl bg-white p-8 text-center shadow-sm">
            <p className="text-sm text-slate-600">Loading your orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="rounded-3xl bg-white p-8 text-center shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">
              No orders yet
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Start shopping to see your order history here.
            </p>
            <Link
              to="/products"
              className="mt-6 inline-flex rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white"
            >
              Browse products
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="rounded-3xl bg-white p-5 shadow-sm"
              >
                {/* HEADER */}
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-slate-500">Order #{order.id}</p>
                    <h2 className="mt-1 text-lg font-semibold text-slate-900">
                      {order.userName || order.fullName || "Customer"}
                    </h2>
                    <p className="mt-2 text-sm text-slate-500">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>

                  <div className="text-right">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusClass(order.status)}`}
                    >
                      {order.status || "PENDING"}
                    </span>
                    <p className="mt-3 text-lg font-bold text-slate-900">
                      {formatPrice(order.totalPrice)}
                    </p>
                  </div>
                </div>

                {/* 🆕 ORDER ITEMS DETAIL */}
                <div className="mt-4 border-t pt-4">
                  <p className="mb-2 text-sm font-semibold text-slate-700">
                    Items
                  </p>

                  <div className="space-y-2">
                    {(order.items || []).map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 text-sm"
                      >
                        <div>
                          <p className="font-medium text-slate-800">
                            {item.productName}
                          </p>
                          <p className="text-xs text-slate-500">
                            Qty: {item.quantity} × ${item.price}
                          </p>
                        </div>

                        <p className="font-semibold text-slate-900">
                          ${item.totalPrice}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 border-t pt-4">
                  {(() => {
                    const payment = paymentByOrderId.get(String(order.id));

                    if (!payment) {
                      return (
                        <div className="rounded-xl bg-amber-50 px-3 py-2 text-sm text-amber-700">
                          Payment has not been created for this order yet.
                        </div>
                      );
                    }

                    return (
                      <div className="flex flex-wrap items-center gap-3">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${paymentStatusClass(
                            payment.paymentStatus,
                          )}`}
                        >
                          {payment.paymentStatus || "PENDING"}
                        </span>
                        <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                          {payment.paymentMethod || "N/A"}
                        </span>
                        <span className="text-sm text-slate-600">
                          {formatPrice(payment.amount)}{" "}
                          {payment.currency || "USD"}
                        </span>
                      </div>
                    );
                  })()}
                </div>

                {/* FOOTER */}
                <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-t pt-4 text-sm text-slate-600">
                  <span>
                    {(order.items || []).length} item
                    {(order.items || []).length === 1 ? "" : "s"}
                  </span>
                  <span>{order.phone || "No phone provided"}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrdersPage;
