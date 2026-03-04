import { Play } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

const JoinButton = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="mt-6"
    >
      <Link
        to="/join"
        className="group relative inline-flex items-center justify-center gap-4 px-12 py-6 md:px-16 md:py-8 text-xl md:text-2xl overflow-hidden rounded-2xl transition-all hover:scale-105"
      >
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transition-all group-hover:shadow-[0_0_40px_rgba(59,130,246,0.6)]"></div>

        {/* Shine Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
        </div>

        {/* Content */}
        <Play
          className="relative w-8 h-8 md:w-10 md:h-10 text-white"
          fill="currentColor"
        />
        <span className="relative text-white font-medium">ルーム参加</span>
      </Link>
    </motion.div>
  );
};
export default JoinButton;
