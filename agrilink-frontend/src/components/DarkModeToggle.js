import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function DarkModeToggle() {
  const [dark, setDark] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={() => setDark(!dark)}
      className="px-4 py-2 rounded-xl bg-gray-200 dark:bg-gray-700 dark:text-white"
    >
      {dark ? "Light" : " Dark"}
    </motion.button>
  );
}

export default DarkModeToggle;
