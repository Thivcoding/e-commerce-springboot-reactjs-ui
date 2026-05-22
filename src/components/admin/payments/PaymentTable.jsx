import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const paymentStatuses = [
  "PENDING",
  "PAID",
  "FAILED",
  "REFUNDED",
];

const formatPrice = (
  value,
  currency = "USD"
) =>
  `${Number(value || 0).toFixed(2)} ${
    currency || "USD"
  }`;

const formatDate = (value) => {
  if (!value) return "-";

  return new Date(value).toLocaleString();
};

const statusClass = (status) => {
  switch (status) {
    case "PAID":
      return "bg-green-100 text-green-700";

    case "FAILED":
      return "bg-red-100 text-red-700";

    case "REFUNDED":
      return "bg-purple-100 text-purple-700";

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
        <div className="h-9 w-32 rounded-xl bg-gray-300"></div>
      </td>

      <td className="p-4">
        <div className="h-4 w-32 rounded bg-gray-300"></div>
      </td>

      <td className="p-4">
        <div className="mx-auto h-8 w-16 rounded-xl bg-gray-300"></div>
      </td>
    </tr>
  );
};

const PaymentTable = ({
  payments,
  onStatusChange,
  loading,
  updatingId,
}) => {

  // =========================
  // STATE
  // =========================
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("ALL");
  const [currentPage, setCurrentPage] =
    useState(1);

  const paymentsPerPage = 5;

  // =========================
  // FILTER PAYMENTS
  // =========================
  const filteredPayments = useMemo(() => {
    return payments.filter((payment) => {

      const invoice =
        payment.invoiceNo || "";

      const orderId = String(
        payment.orderId || ""
      );

      const matchSearch =
        invoice
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        orderId.includes(search) ||
        String(payment.id).includes(search);

      const matchStatus =
        statusFilter === "ALL" ||
        payment.paymentStatus ===
          statusFilter;

      return matchSearch && matchStatus;
    });
  }, [payments, search, statusFilter]);

  // =========================
  // PAGINATION
  // =========================
  const totalPages = Math.ceil(
    filteredPayments.length /
      paymentsPerPage
  );

  const startIndex =
    (currentPage - 1) * paymentsPerPage;

  const currentPayments =
    filteredPayments.slice(
      startIndex,
      startIndex + paymentsPerPage
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
          placeholder="Search payment..."
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
          <option value="ALL">
            All Status
          </option>

          {paymentStatuses.map((status) => (
            <option
              key={status}
              value={status}
            >
              {status}
            </option>
          ))}
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
              <th className="p-4 text-left">
                ID
              </th>

              <th className="p-4 text-left">
                Invoice
              </th>

              <th className="p-4 text-left">
                Amount
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-left">
                Update Status
              </th>

              <th className="p-4 text-left">
                Created
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
            ) : currentPayments.length ===
              0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="p-8 text-center text-gray-500"
                >
                  No payments found
                </td>
              </tr>
            ) : (
              currentPayments.map(
                (payment) => (
                  <tr
                    key={payment.id}
                    className="border-t transition hover:bg-gray-50"
                  >
                    <td className="p-4">
                      {payment.id}
                    </td>

                    <td className="p-4">
                      <p className="font-medium">
                        {
                          payment.invoiceNo
                        }
                      </p>

                      <p className="text-sm text-gray-500">
                        Order #
                        {
                          payment.orderId
                        }
                      </p>
                    </td>

                    <td className="p-4 font-semibold text-gray-700">
                      {formatPrice(
                        payment.amount,
                        payment.currency
                      )}
                    </td>

                    <td className="p-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-black ${statusClass(
                          payment.paymentStatus
                        )}`}
                      >
                        {payment.paymentStatus ||
                          "PENDING"}
                      </span>
                    </td>

                    <td className="p-4">
                      <select
                        value={
                          payment.paymentStatus ||
                          "PENDING"
                        }
                        disabled={
                          updatingId ===
                          payment.id
                        }
                        onChange={(e) =>
                          onStatusChange(
                            payment.id,
                            e.target.value
                          )
                        }
                        className="rounded-xl border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        {paymentStatuses.map(
                          (status) => (
                            <option
                              key={status}
                              value={status}
                            >
                              {status}
                            </option>
                          )
                        )}
                      </select>
                    </td>

                    <td className="p-4 text-gray-600">
                      {formatDate(
                        payment.createdAt
                      )}
                    </td>

                    <td className="p-4">
                      <div className="flex justify-center">
                        <Link
                          to={`/admin/payments/${payment.id}`}
                          className="rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                        >
                          View
                        </Link>
                      </div>
                    </td>
                  </tr>
                )
              )
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

export default PaymentTable;