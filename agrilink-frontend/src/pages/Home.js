import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import farmBg from "../assets/farm-bg.jpeg";
import farmerImg from "../assets/farmer.jpeg";
import vegImg from "../assets/vegetable.jpeg";

function Home() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 transition duration-500 overflow-hidden">

      
      <div
        className="relative min-h-screen flex items-center justify-center text-center px-6"
        style={{
          backgroundImage: `url(${farmBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-green-900/60"></div>

        <div className="relative z-10 text-white">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-extrabold leading-tight"
          >
            Connecting Farmers Directly to Buyers 🌾
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-lg max-w-2xl mx-auto"
          >
            Transparent marketplace with real-time mandi comparison,
            direct communication and fair pricing.
          </motion.p>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 flex justify-center gap-6"
          >
            <Link
              to="/register"
              className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl font-semibold shadow-lg transition"
            >
              Get Started
            </Link>

            <Link
              to="/analytics"
              className="bg-white text-green-700 hover:bg-gray-100 px-6 py-3 rounded-xl font-semibold shadow-lg transition"
            >
              View Analytics
            </Link>
          </motion.div>
        </div>
      </div>

      
      <section className="py-20 px-8 max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl font-bold text-center text-green-700 dark:text-green-400"
        >
          Why Choose AgriLink?
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-10 mt-12">
          <FeatureCard
            icon="📈"
            title="Real-Time Prices"
            desc="Compare mandi rates instantly before selling."
          />
          <FeatureCard
            icon="💬"
            title="Direct Chat"
            desc="Farmers & buyers communicate without middlemen."
          />
          <FeatureCard
            icon="🚜"
            title="Better Profits"
            desc="Transparent pricing ensures fair income."
          />
        </div>
      </section>

      
      <section className="py-20 bg-green-50 dark:bg-gray-800 px-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

          <motion.img
            src={farmerImg}
            alt="Farmer"
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl shadow-2xl hover:scale-105 transition"
          />

          <motion.img
            src={vegImg}
            alt="Vegetables"
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl shadow-2xl hover:scale-105 transition"
          />
        </div>
      </section>

      
      <section className="py-20 px-8 text-center">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
          <Stat number="500+" label="Farmers Connected" />
          <Stat number="1200+" label="Transactions Completed" />
          <Stat number="₹10L+" label="Revenue Generated" />
        </div>
      </section>

      
      <section className="py-20 bg-gradient-to-r from-green-700 to-green-900 text-white text-center">
        <h2 className="text-4xl font-bold">
          Ready to Transform Agriculture?
        </h2>

        <Link
          to="/register"
          className="mt-8 inline-block bg-white text-green-700 px-8 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition"
        >
          Join AgriLink Today
        </Link>
      </section>

    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <motion.div
      whileHover={{ scale: 1.08 }}
      className="bg-white dark:bg-gray-700 p-8 rounded-2xl shadow-xl text-center cursor-pointer"
    >
      <div className="text-4xl">{icon}</div>
      <h3 className="mt-4 text-xl font-bold text-green-700 dark:text-green-400">
        {title}
      </h3>
      <p className="mt-4 text-gray-600 dark:text-gray-300">
        {desc}
      </p>
    </motion.div>
  );
}

function Stat({ number, label }) {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg"
    >
      <h3 className="text-4xl font-bold text-green-700 dark:text-green-400">
        {number}
      </h3>
      <p className="mt-4 text-gray-600 dark:text-gray-300">
        {label}
      </p>
    </motion.div>
  );
}

export default Home;
