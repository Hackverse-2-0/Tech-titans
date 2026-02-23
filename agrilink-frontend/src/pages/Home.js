import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import farmBg from "../assets/farm-bg.jpeg";
import farmerImg from "../assets/farmer.jpeg";
import vegImg from "../assets/vegetable.jpeg";

function Home() {
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <section className="relative h-screen flex items-center justify-center text-center">
        <motion.div
          style={{ y: yBg, backgroundImage: `url(${farmBg})` }}
          className="absolute inset-0 bg-cover bg-center"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-green-900/60 to-black/90" />
        <div className="relative z-10 text-white px-6">
          <motion.h1
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl font-extrabold leading-tight bg-gradient-to-r from-green-300 via-white to-green-400 bg-clip-text text-transparent"
          >
            Connecting Farmers to Buyers 🌾
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-lg max-w-2xl mx-auto text-gray-200"
          >
            Real-time mandi comparison • Direct chat • Transparent pricing
          </motion.p>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-10 flex justify-center gap-6"
          >
            <Link
              to="/register"
              className="bg-green-600 hover:bg-green-700 px-8 py-4 rounded-2xl font-semibold shadow-2xl hover:scale-110 transition"
            >
              Get Started
            </Link>
            <Link
              to="/analytics"
              className="bg-white/20 backdrop-blur-lg border border-white/30 px-8 py-4 rounded-2xl font-semibold hover:bg-white/30 transition"
            >
              Analytics
            </Link>
          </motion.div>
        </div>
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute bottom-10 text-white text-3xl"
        >
          ↓
        </motion.div>
      </section>

      <section className="py-24 px-8 max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-green-700 dark:text-green-400">
          Why Choose AgriLink?
        </h2>
        <div className="grid md:grid-cols-3 gap-12 mt-14">
          <Feature icon="📈" title="Real-Time Prices" desc="Compare mandi rates instantly" />
          <Feature icon="💬" title="Direct Chat" desc="Talk to buyers directly" />
          <Feature icon="🚜" title="Higher Profits" desc="No middlemen cuts" />
        </div>
      </section>

      <section className="py-24 bg-green-50 dark:bg-gray-800 px-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
          <HoverImage src={farmerImg} />
          <HoverImage src={vegImg} />
        </div>
      </section>

      <section className="py-24 text-center">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
          <Counter number={500} label="Farmers Connected" />
          <Counter number={1200} label="Transactions" />
          <Counter number={1000000} label="Revenue Generated ₹" />
        </div>
      </section>

      <section className="py-24 bg-gradient-to-r from-green-700 to-green-900 text-center text-white">
        <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-4xl font-bold">
          Ready to Transform Agriculture?
        </motion.h2>
        <Link
          to="/register"
          className="mt-10 inline-block bg-white text-green-700 px-10 py-4 rounded-2xl font-bold shadow-xl hover:scale-110 transition"
        >
          Join Now
        </Link>
      </section>

      <Link
        to="/register"
        className="fixed bottom-8 right-8 bg-green-600 text-white px-6 py-4 rounded-full shadow-2xl hover:scale-110 transition"
      >
        Join 🌱
      </Link>
    </div>
  );
}

function Feature({ icon, title, desc }) {
  return (
    <motion.div
      whileHover={{ scale: 1.08, rotate: 1 }}
      className="bg-white/40 backdrop-blur-lg border border-white/30 dark:bg-gray-700/50 p-10 rounded-3xl shadow-xl"
    >
      <div className="text-5xl">{icon}</div>
      <h3 className="mt-4 text-xl font-bold text-green-700 dark:text-green-400">{title}</h3>
      <p className="mt-3 text-gray-700 dark:text-gray-300">{desc}</p>
    </motion.div>
  );
}

function HoverImage({ src }) {
  return (
    <motion.img
      src={src}
      whileHover={{ scale: 1.1, rotate: 1 }}
      transition={{ type: "spring" }}
      className="rounded-3xl shadow-2xl cursor-pointer"
    />
  );
}

function Counter({ number, label }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = number;
    let duration = 1500;
    let increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      setCount(Math.floor(start));
      if (start >= end) clearInterval(timer);
    }, 16);

    return () => clearInterval(timer);
  }, [number]);

  return (
    <motion.div whileHover={{ scale: 1.1 }} className="bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-xl">
      <h3 className="text-5xl font-bold text-green-600">{count.toLocaleString()}+</h3>
      <p className="mt-4 text-gray-600 dark:text-gray-300">{label}</p>
    </motion.div>
  );
}

export default Home;