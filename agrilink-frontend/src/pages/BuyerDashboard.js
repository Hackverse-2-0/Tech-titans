import PageWrapper from "../components/PageWrapper";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function BuyerDashboard() {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <div className="min-h-screen bg-blue-50 dark:bg-gray-800 p-8">
        <h2 className="text-3xl font-bold text-blue-800 dark:text-blue-400 mb-8">
          Buyer Dashboard 🛒
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <Card title=" Browse Crops" link="/crops" navigate={navigate} />
          <Card title=" My Orders" link="/orders" navigate={navigate} />
          <Card title=" Messages" link="/chat" navigate={navigate} />
        </div>
      </div>
    </PageWrapper>
  );
}

function Card({ title, link, navigate }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => navigate(link)}
      className="bg-white dark:bg-gray-700 p-8 rounded-2xl shadow-lg text-center cursor-pointer"
    >
      <h3 className="text-xl font-bold text-blue-700 dark:text-blue-400">
        {title}
      </h3>
    </motion.div>
  );
}

export default BuyerDashboard;