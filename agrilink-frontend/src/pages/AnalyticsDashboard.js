import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";
import { useEffect, useState } from "react";
import api from "../services/api";

function AnalyticsDashboard() {

  const [earningsData, setEarningsData] = useState([]);
  const [cropData, setCropData] = useState([]);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [topCrop, setTopCrop] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));

        const res = await api.get(`/analytics/${user.id}`);

        setEarningsData(res.data.monthlyEarnings || []);
        setCropData(res.data.cropSales || []);
        setTotalEarnings(res.data.totalEarnings || 0);
        setTotalOrders(res.data.totalOrders || 0);
        setTopCrop(res.data.topCrop || "N/A");

        setLoading(false);

      } catch (err) {
        console.error("Analytics error:", err);
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl font-semibold">Loading Analytics...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8 transition">

      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-3xl font-bold text-green-700 dark:text-green-400"
      >
        📊 Farmer Analytics Dashboard
      </motion.h1>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6 mt-8">

        <StatCard title="Total Earnings" value={`₹${totalEarnings}`} />
        <StatCard title="Total Orders" value={totalOrders} />
        <StatCard title="Top Crop" value={topCrop} />

      </div>

      
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white dark:bg-gray-800 p-6 mt-10 rounded-2xl shadow-lg"
      >
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Monthly Earnings
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={earningsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="earnings" 
              stroke="#16a34a" 
              strokeWidth={3} 
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white dark:bg-gray-800 p-6 mt-10 rounded-2xl shadow-lg"
      >
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Crop Sales
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={cropData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="crop" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sales" fill="#15803d" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl"
    >
      <h3 className="text-gray-600 dark:text-gray-400">{title}</h3>
      <p className="text-2xl font-bold text-green-700 dark:text-green-400 mt-2">
        {value}
      </p>
    </motion.div>
  );
}

export default AnalyticsDashboard;