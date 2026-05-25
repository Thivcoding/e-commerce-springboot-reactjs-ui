import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { checkBakongPaymentStatusService, getPaymentByIdService } from "../../../services/paymentService";
import BakongQR from "../../../components/users/BakongQR";

const EXPIRY_TIME = 5 * 60; // 5 minutes

const BakongQRPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [qr, setQr] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("PENDING");
  const [timeLeft, setTimeLeft] = useState(EXPIRY_TIME);

  // =========================
  // 1. LOAD PAYMENT + QR
  // =========================
  useEffect(() => {
    const fetchPayment = async () => {
      try {
        setLoading(true);

        const res = await getPaymentByIdService(id);

        console.log("PAYMENT DATA:", res.body);

        setQr(res.body?.qrString || null);
        setStatus(res.body?.status || "PENDING");
      } catch (err) {
        console.error("QR load failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPayment();
  }, [id]);

  // =========================
  // 2. TIMER
  // =========================
  useEffect(() => {
    if (timeLeft <= 0) {
      setStatus("EXPIRED");
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // =========================
  // 3. POLLING PAYMENT STATUS
  // =========================
    useEffect(() => {
    let interval;

    if (status === "PENDING") {
        interval = setInterval(async () => {
        try {
            const res = await checkBakongPaymentStatusService(id);

            const newStatus = res.body?.paymentStatus || res.body?.status;

            setStatus(newStatus);

            if (newStatus === "PAID") {
            clearInterval(interval);

            setTimeout(() => {
                navigate("/my-orders");
            }, 1000);
            }
        } catch (err) {
            console.error(err);
        }
        }, 3000);
    }

    return () => clearInterval(interval);
    }, [id, status]);
  // =========================
  // FORMAT TIME
  // =========================
  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  // =========================
  // UI STATES
  // =========================
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-10 w-10 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-3">Loading QR...</p>
        </div>
      </div>
    );
  }

  if (status === "PAID") {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-green-600 text-2xl font-bold">
            Payment Successful 🎉
          </h1>
          <p>Redirecting...</p>
        </div>
      </div>
    );
  }

  if (status === "EXPIRED") {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-red-600 text-2xl font-bold">
            QR Expired ❌
          </h1>

          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-full"
          >
            Generate New QR
          </button>
        </div>
      </div>
    );
  }

  // =========================
  // MAIN UI
  // =========================
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">

      <div className="bg-white shadow-xl rounded-2xl p-6 w-[380px] text-center">

        <h1 className="text-xl font-bold mb-2">
          Scan to Pay with Bakong
        </h1>

        <p className="text-sm text-gray-500 mb-4">
          Expires in: {formatTime(timeLeft)}
        </p>

        {/* QR */}
        <div className="flex justify-center">
          {qr ? (
            <BakongQR qrString={qr} />
          ) : (
            <p className="text-red-500">QR not available</p>
          )}
        </div>

        {/* STATUS */}
        <div className="mt-4">
          <p className="text-sm">
            Status:{" "}
            <span className="font-semibold text-indigo-600">
              {status}
            </span>
          </p>
        </div>

        <p className="mt-2 text-gray-400 text-sm">
          Waiting for payment...
        </p>

      </div>
    </div>
  );
};

export default BakongQRPage;