const paymentStatuses = ["PENDING", "PAID", "FAILED", "REFUNDED"];

const formatPrice = (value, currency = "USD") =>
  `${Number(value || 0).toFixed(2)} ${currency || "USD"}`;

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

const DetailItem = ({ label, value }) => {
  return (
    <div>
      <p className="text-sm font-bold text-gray-500">{label}</p>
      <p className="mt-1 break-words text-base font-semibold text-gray-800">
        {value || "-"}
      </p>
    </div>
  );
};

const PaymentDetail = ({ payment, onStatusChange, updating }) => {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Invoice {payment.invoiceNo}
            </h2>
            <p className="mt-1 text-gray-500">Payment #{payment.id}</p>
          </div>

          <span
            className={`inline-flex rounded-full px-4 py-2 text-sm font-black ${statusClass(
              payment.paymentStatus
            )}`}
          >
            {payment.paymentStatus || "PENDING"}
          </span>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-3">
          <DetailItem label="Amount" value={formatPrice(payment.amount, payment.currency)} />
          <DetailItem label="Method" value={payment.paymentMethod} />
          <DetailItem label="Order ID" value={payment.orderId ? `#${payment.orderId}` : "-"} />
          <DetailItem label="Created" value={formatDate(payment.createdAt)} />
          <DetailItem label="Paid At" value={formatDate(payment.paidAt)} />
          <DetailItem label="Bakong Txn ID" value={payment.bakongTxnId} />
        </div>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-xl">
        <h3 className="mb-5 text-xl font-bold text-gray-800">Update Payment Status</h3>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={payment.paymentStatus || "PENDING"}
            disabled={updating}
            onChange={(e) => onStatusChange(payment.id, e.target.value)}
            className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {paymentStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          <p className="text-sm font-semibold text-gray-500">
            Setting status to PAID will also mark the order as PAID in the backend.
          </p>
        </div>
      </div>

      {payment.qrString && (
        <div className="rounded-2xl bg-white p-6 shadow-xl">
          <h3 className="mb-3 text-xl font-bold text-gray-800">QR String</h3>
          <p className="break-words rounded-xl bg-gray-100 p-4 text-sm font-semibold text-gray-600">
            {payment.qrString}
          </p>
        </div>
      )}
    </div>
  );
};

export default PaymentDetail;
