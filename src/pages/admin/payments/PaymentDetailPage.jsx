import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import PaymentDetail from "../../../components/admin/payments/PaymentDetail";
import {
  getPaymentByIdService,
  updatePaymentStatusService,
} from "../../../services/paymentService";

const PaymentDetailPage = () => {
  const { id } = useParams();
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);

  const fetchPayment = async () => {
    try {
      setLoading(true);
      const data = await getPaymentByIdService(id);
      setPayment(data.body);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;

    const loadPayment = async () => {
      try {
        setLoading(true);
        const data = await getPaymentByIdService(id);

        if (active) {
          setPayment(data.body);
        }
      } catch (error) {
        console.log(error);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadPayment();

    return () => {
      active = false;
    };
  }, [id]);

  const handleStatusChange = async (paymentId, status) => {
    try {
      setUpdating(true);
      await updatePaymentStatusService(paymentId, status);
      fetchPayment();
    } catch (error) {
      console.log(error);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="min-h-screen ">
      <div className="mb-8 flex justify-between">
        <h1 className="text-4xl font-bold">Payment Detail</h1>

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

      {!loading && payment && (
        <PaymentDetail
          payment={payment}
          onStatusChange={handleStatusChange}
          updating={updating}
        />
      )}
    </div>
  );
};

export default PaymentDetailPage;
