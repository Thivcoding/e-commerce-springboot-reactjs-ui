import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import OrderDetail from "../../../components/admin/orders/OrderDetail";
import { getOrderByIdService } from "../../../services/orderService";

const OrderDetailPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;

    const fetchOrder = async () => {
      try {
        setLoading(true);
        const data = await getOrderByIdService(id);

        if (active) {
          setOrder(data.body);
        }
      } catch (error) {
        console.log(error);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchOrder();

    return () => {
      active = false;
    };
  }, [id]);

  return (
    <div className="min-h-screen ">
      <div className="mb-8 flex justify-between">
        <h1 className="text-4xl font-bold">Order Detail</h1>

        <button
          type="button"
          onClick={() => window.history.back()}
          className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-slate-200 bg-red-500 px-6 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-red-600"
        >
          <FaArrowLeft />
          Go back
        </button>
      </div>

      {loading && (
        <div className="rounded-2xl bg-white p-8 text-center font-semibold text-gray-500 shadow-xl">
          Loading...
        </div>
      )}

      {!loading && order && <OrderDetail order={order} />}
    </div>
  );
};

export default OrderDetailPage;
