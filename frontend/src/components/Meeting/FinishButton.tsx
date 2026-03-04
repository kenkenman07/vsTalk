import { StopCircle } from "lucide-react";
import { motion } from "motion/react";

type FinishButtonProps = {
  onClick: () => void;
};

const FinishButton = ({ onClick }: FinishButtonProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="flex justify-center mb-8"
    >
      <button
        onClick={onClick}
        className="group relative px-12 py-5 rounded-2xl overflow-hidden transition-all hover:scale-105 shadow-[0_0_40px_rgba(239,68,68,0.3)] hover:shadow-[0_0_60px_rgba(239,68,68,0.6)]"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-red-600 to-pink-500 animate-pulse"></div>
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
        </div>
        <span className="relative flex items-center gap-3 text-white text-xl font-bold">
          <StopCircle className="w-7 h-7" fill="currentColor" />
          会議を終了する
        </span>
      </button>
    </motion.div>
  );
};
export default FinishButton;
