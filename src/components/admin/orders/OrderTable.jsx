import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const formatPrice = (value) =>
  `$${Number(value || 0).toFixed(2)}`;

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

const SkeletonRow = () => {
  return (
    <tr className="border-t animate-pulse">
      <td className="p-4">
        <div className="h-4 w-8 rounded bg-gray-300"></div>
      </td>

      <td className="p-4">
        <div className="h-4 w-28 rounded bg-gray-300"></div>
      </td>

      <td className="p-4">
        <div className="h-4 w-20 rounded bg-gray-300"></div>
      </td>

      <td className="p-4">
        <div className="h-6 w-24 rounded-full bg-gray-300"></div>
      </td>

      <td className="p-4">
        <div className="h-4 w-32 rounded bg-gray-300"></div>
      </td>

      <td className="p-4">
        <div className="flex justify-center gap-3">
          <div className="h-8 w-16 rounded-xl bg-gray-300"></div>
          <div className="h-8 w-16 rounded-xl bg-gray-300"></div>
        </div>
      </td>
    </tr>
  );
};

const OrderTable = ({
  orders,
  onDelete,
  loading,
}) => {

  // =========================
  // STATE
  // =========================
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("ALL");
  const [currentPage, setCurrentPage] =
    useState(1);

  const ordersPerPage = 5;

  // =========================
  // FILTER ORDERS
  // =========================
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {

      const customerName =
        order.userName || order.fullName || "";

      const phone = order.phone || "";

      const matchSearch =
        customerName
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        phone
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        String(order.id).includes(search);

      const matchStatus =
        statusFilter === "ALL" ||
        order.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [orders, search, statusFilter]);

  // =========================
  // PAGINATION
  // =========================
  const totalPages = Math.ceil(
    filteredOrders.length / ordersPerPage
  );

  const startIndex =
    (currentPage - 1) * ordersPerPage;

  const currentOrders = filteredOrders.slice(
    startIndex,
    startIndex + ordersPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="rounded-2xl bg-white shadow-xl p-5">

      {/* ========================= */}
      {/* SEARCH + FILTER */}
      {/* ========================= */}
      <div className="mb-5 flex flex-col gap-4 md:flex-row md:justify-between">

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search order..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full rounded-xl border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400 md:w-80"
        />

        {/* STATUS FILTER */}
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="rounded-xl border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="ALL">All Status</option>
          <option value="PENDING">
            PENDING
          </option>
          <option value="PAID">PAID</option>
          <option value="SHIPPED">
            SHIPPED
          </option>
          <option value="DELIVERED">
            DELIVERED
          </option>
          <option value="CANCELLED">
            CANCELLED
          </option>
        </select>
      </div>

      {/* ========================= */}
      {/* TABLE */}
      {/* ========================= */}
      <div className="overflow-x-auto">
        <table className="w-full">

          {/* HEADER */}
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">
                Customer
              </th>
              <th className="p-4 text-left">
                Total
              </th>
              <th className="p-4 text-left">
                Status
              </th>
              <th className="p-4 text-left">
                Date
              </th>
              <th className="p-4 text-center">
                Action
              </th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {loading ? (
              Array.from({ length: 5 }).map(
                (_, index) => (
                  <SkeletonRow key={index} />
                )
              )
            ) : currentOrders.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="p-8 text-center text-gray-500"
                >
                  No orders found
                </td>
              </tr>
            ) : (
              currentOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-t transition hover:bg-gray-50"
                >
                  <td className="p-4">
                    {order.id}
                  </td>

                  <td className="p-4">
                    <p className="font-medium">
                      {order.userName ||
                        order.fullName}
                    </p>

                    <p className="text-sm text-gray-500">
                      {order.phone || "-"}
                    </p>
                  </td>

                  <td className="p-4 font-semibold text-gray-700">
                    {formatPrice(
                      order.totalPrice
                    )}
                  </td>

                  <td className="p-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-black ${statusClass(
                        order.status
                      )}`}
                    >
                      {order.status ||
                        "PENDING"}
                    </span>
                  </td>

                  <td className="p-4 text-gray-600">
                    {formatDate(
                      order.createdAt
                    )}
                  </td>

                  <td className="p-4">
                    <div className="flex justify-center gap-3">
                      <Link
                        to={`/admin/orders/${order.id}`}
                        className="rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                      >
                        View
                      </Link>

                      <button
                        onClick={() =>
                          onDelete(order.id)
                        }
                        className="rounded-xl bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>

      {/* ========================= */}
      {/* PAGINATION */}
      {/* ========================= */}
      {!loading && totalPages > 1 && (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">

          {/* PREV */}
          <button
            disabled={currentPage === 1}
            onClick={() =>
              handlePageChange(currentPage - 1)
            }
            className={`rounded-xl border px-4 py-2 ${
              currentPage === 1
                ? "cursor-not-allowed bg-gray-200"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            Prev
          </button>

          {/* PAGE NUMBER */}
          {Array.from({ length: totalPages }).map(
            (_, index) => {
              const page = index + 1;

              return (
                <button
                  key={page}
                  onClick={() =>
                    handlePageChange(page)
                  }
                  className={`rounded-xl border px-4 py-2 ${
                    currentPage === page
                      ? "bg-blue-500 text-white"
                      : "bg-white hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              );
            }
          )}

          {/* NEXT */}
          <button
            disabled={
              currentPage === totalPages
            }
            onClick={() =>
              handlePageChange(currentPage + 1)
            }
            className={`rounded-xl border px-4 py-2 ${
              currentPage === totalPages
                ? "cursor-not-allowed bg-gray-200"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            Next
          </button>

        </div>
      )}
    </div>
  );
};

export default OrderTable;