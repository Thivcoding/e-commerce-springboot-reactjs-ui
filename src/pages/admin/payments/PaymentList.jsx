import { useEffect, useState } from "react";

import {
  getAllPaymentsService,
  updatePaymentStatusService,
} from "../../../services/paymentService";
import PaymentTable from "../../../components/admin/payments/PaymentTable";

const PaymentList = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const data = await getAllPaymentsService();
      setPayments(data.body || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;

    const loadPayments = async () => {
      try {
        setLoading(true);
        const data = await getAllPaymentsService();

        if (active) {
          setPayments(data.body || []);
        }
      } catch (error) {
        console.log(error);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadPayments();

    return () => {
      active = false;
    };
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      setUpdatingId(id);
      await updatePaymentStatusService(id, status);
      fetchPayments();
    } catch (error) {
      console.log(error);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="min-h-screen ">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Payments</h1>
          <p className="mt-2 text-gray-500">Manage payment status and invoices</p>
        </div>

        <PaymentTable
          payments={payments}
          onStatusChange={handleStatusChange}
          loading={loading}
          updatingId={updatingId}
        />
      </div>
    </div>
  );
};

export default PaymentList;
