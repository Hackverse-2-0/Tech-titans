import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import DarkModeToggle from "./DarkModeToggle";

function Navbar() {
  return (
    <nav className="bg-green-700 dark:bg-gray-900 text-white px-8 py-4 shadow-lg">
      <div className="flex justify-between items-center">

       
        <Link to="/" className="text-2xl font-bold">
          Agrilink
        </Link>

        
        <div className="flex items-center gap-6">

          <Link to="/" className="hover:text-gray-200 transition">
            Home
          </Link>

          <Link to="/farmer" className="hover:text-gray-200 transition">
            Farmer
          </Link>

          <Link to="/buyer" className="hover:text-gray-200 transition">
            Buyer
          </Link>

          
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link
              to="/login"
              className="bg-white text-green-700 px-4 py-2 rounded-xl font-semibold shadow hover:bg-gray-100 transition"
            >
              Login
            </Link>
          </motion.div>

          
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link
              to="/register"
              className="border border-white px-4 py-2 rounded-xl font-semibold hover:bg-white hover:text-green-700 transition"
            >
              Register
            </Link>
          </motion.div>

          
          <DarkModeToggle />

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
