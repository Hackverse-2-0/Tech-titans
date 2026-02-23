import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [role, setRole] = useState("farmer");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
        role,
      });

      alert("Registration successful ");
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
                    bg-gradient-to-br from-green-100 to-green-300 
                    dark:from-gray-900 dark:to-gray-800 transition duration-500">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white dark:bg-gray-800 shadow-2xl 
                   rounded-3xl p-10 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center text-green-700 dark:text-green-400">
          🌾 Create Account
        </h2>

        
        <div className="mt-6">
          <label className="block text-gray-600 dark:text-gray-300">Full Name</label>
          <input
            type="text"
            placeholder="Enter full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mt-2 p-3 rounded-xl border focus:ring-2 
                       focus:ring-green-500 dark:bg-gray-700 dark:text-white"
          />
        </div>

        
        <div className="mt-4">
          <label className="block text-gray-600 dark:text-gray-300">Email</label>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-2 p-3 rounded-xl border focus:ring-2 
                       focus:ring-green-500 dark:bg-gray-700 dark:text-white"
          />
        </div>

        
        <div className="mt-4">
          <label className="block text-gray-600 dark:text-gray-300">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-2 p-3 rounded-xl border focus:ring-2 
                       focus:ring-green-500 dark:bg-gray-700 dark:text-white"
          />
        </div>

        
        <div className="mt-6 flex justify-between">
          <button
            onClick={() => setRole("farmer")}
            className={`px-4 py-2 rounded-xl ${
              role === "farmer"
                ? "bg-green-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 dark:text-white"
            }`}
          >
            Farmer
          </button>

          <button
            onClick={() => setRole("buyer")}
            className={`px-4 py-2 rounded-xl ${
              role === "buyer"
                ? "bg-green-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 dark:text-white"
            }`}
          >
            Buyer
          </button>
        </div>

        
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleRegister}
          className="w-full mt-6 bg-green-700 hover:bg-green-800 
                     text-white py-3 rounded-xl shadow-lg"
        >
          Register as {role}
        </motion.button>

        <p className="mt-4 text-sm text-center text-gray-500 dark:text-gray-400">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-green-600 cursor-pointer"
          >
            Login
          </span>
        </p>
      </motion.div>
    </div>
  );
}

export default Register;