import { BarChart } from "lucide-react";
import { motion } from "motion/react";

type StopCountProps = {
  stopCount: number;
};

const StopCount = ({ stopCount }: StopCountProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center">
          <BarChart className="w-8 h-8 text-white" />
        </div>
        <div>
          <p className="text-gray-400 text-sm">会議停止回数</p>
          <p className="text-5xl font-bold bg-gradient-to-r from-red-300 to-pink-300 bg-clip-text text-transparent">
            {stopCount}
          </p>
        </div>
      </div>
      <p className="text-gray-500 text-sm">会議中に一時停止した回数です</p>
    </motion.div>
  );
};
export default StopCount;
