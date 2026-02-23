import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import PageWrapper from "../components/PageWrapper";

function FarmerOrders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/orders/farmer",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, action) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/orders/${id}/${action}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchOrders();
    } catch (error) {
      console.error(error);
    }
  };

  const statusColor = {
    PENDING: "bg-yellow-100 text-yellow-700 animate-pulse",
    ACCEPTED: "bg-green-100 text-green-700",
    REJECTED: "bg-red-100 text-red-700",
    DELIVERED: "bg-blue-100 text-blue-700",
  };

  return (
    <PageWrapper>
      <div className="min-h-screen p-8 bg-green-50 dark:bg-gray-900">
        <h2 className="text-3xl font-bold mb-8 text-green-800 dark:text-green-400">
          📦 Farmer Orders
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {orders.map((order) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.03 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl"
            >
              <h3 className="text-xl font-bold text-green-700">
                {order.product?.title}
              </h3>

              <p className="text-gray-600 mt-2">
                Quantity: {order.quantity}
              </p>

              <p className="text-gray-600">
                Buyer: {order.buyer?.name}
              </p>

              <span
                className={`inline-block mt-3 px-4 py-1 rounded-full text-sm font-semibold ${statusColor[order.status]}`}
              >
                {order.status}
              </span>

              {order.status === "PENDING" && (
                <div className="flex gap-3 mt-5">
                  <button
                    onClick={() => updateStatus(order.id, "accept")}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                  >
                    ✅ Accept
                  </button>

                  <button
                    onClick={() => updateStatus(order.id, "reject")}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                  >
                    ❌ Reject
                  </button>
                </div>
              )}

              {order.status === "ACCEPTED" && (
                <button
                  onClick={() => updateStatus(order.id, "deliver")}
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                >
                  🚚 Mark Delivered
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}

export default FarmerOrders;