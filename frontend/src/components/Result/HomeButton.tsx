import { Home } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

const HomeButton = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.9 }}
      className="flex justify-center pb-8"
    >
      <Link
        to="/"
        className="group relative px-12 py-5 rounded-2xl overflow-hidden transition-all hover:scale-105"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 group-hover:shadow-[0_0_40px_rgba(16,185,129,0.5)]"></div>
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
        </div>
        <span className="relative flex items-center gap-3 text-xl text-white font-medium">
          <Home className="w-6 h-6" />
          ホームに戻る
        </span>
      </Link>
    </motion.div>
  );
};
export default HomeButton;
