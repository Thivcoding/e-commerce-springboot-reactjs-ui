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

const DetailItem = ({ label, value }) => {
  return (
    <div>
      <p className="text-sm font-bold text-gray-500">{label}</p>
      <p className="mt-1 text-base font-semibold text-gray-800">{value || "-"}</p>
    </div>
  );
};

const OrderDetail = ({ order }) => {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Order #{order.id}</h2>
            <p className="mt-1 text-gray-500">{formatDate(order.createdAt)}</p>
          </div>

          <span
            className={`inline-flex rounded-full px-4 py-2 text-sm font-black ${statusClass(
              order.status
            )}`}
          >
            {order.status || "PENDING"}
          </span>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-3">
          <DetailItem label="Customer" value={order.userName || order.fullName} />
          <DetailItem label="Phone" value={order.phone} />
          <DetailItem label="Total" value={formatPrice(order.totalPrice)} />
        </div>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-xl">
        <h3 className="mb-5 text-xl font-bold text-gray-800">Shipping</h3>

        <div className="grid gap-5 md:grid-cols-2">
          <DetailItem label="Full Name" value={order.fullName} />
          <DetailItem label="Country" value={order.country} />
          <DetailItem label="City" value={order.city} />
          <DetailItem label="Address" value={order.addressLine} />
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl bg-white shadow-xl">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Product</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Qty</th>
              <th className="p-4 text-left">Total</th>
            </tr>
          </thead>

          <tbody>
            {(order.items || []).length === 0 ? (
              <tr>
                <td colSpan="4" className="p-8 text-center text-gray-500">
                  No order items found
                </td>
              </tr>
            ) : (
              order.items.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="p-4">
                    <p className="font-medium text-gray-800">{item.productName}</p>
                    <p className="text-sm text-gray-500">Product ID: {item.productId}</p>
                  </td>

                  <td className="p-4 text-gray-600">{formatPrice(item.price)}</td>

                  <td className="p-4 text-gray-600">{item.quantity}</td>

                  <td className="p-4 font-semibold text-gray-800">
                    {formatPrice(item.totalPrice)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderDetail;
