import { useEffect, useState } from "react";

import {
  deleteOrderService,
  getAllOrdersService,
} from "../../../services/orderService";
import OrderTable from "../../../components/admin/orders/OrderTable";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await getAllOrdersService();
      setOrders(data.body || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;

    const loadOrders = async () => {
      try {
        setLoading(true);
        const data = await getAllOrdersService();

        if (active) {
          setOrders(data.body || []);
        }
      } catch (error) {
        console.log(error);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadOrders();

    return () => {
      active = false;
    };
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this order ?")) return;

    try {
      await deleteOrderService(id);
      fetchOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Orders</h1>
          <p className="mt-2 text-gray-500">Manage all customer orders</p>
        </div>

        <OrderTable orders={orders} onDelete={handleDelete} loading={loading} />
      </div>
    </div>
  );
};

export default OrderList;
